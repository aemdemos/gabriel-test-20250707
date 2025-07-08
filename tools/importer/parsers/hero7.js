/* global WebImporter */
export default function parse(element, { document }) {
  // BLOCK HEADER
  const headerRow = ['Hero (hero7)'];

  // BACKGROUND IMAGE ROW (none present)
  const bgRow = [''];

  // MAIN CONTENT ROW
  // Find the grid layout containing h2 and right-side content
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Extract the heading (h2) if present
  let heading = null;
  let contentBlock = null;
  if (gridChildren.length > 0 && gridChildren[0].tagName.toLowerCase().startsWith('h')) {
    heading = gridChildren[0];
  }
  // The next element should contain the paragraph and CTA
  if (gridChildren.length > 1) {
    contentBlock = gridChildren[1];
  }

  // Compose content cell
  const cellContent = [];
  if (heading) cellContent.push(heading);
  if (contentBlock) {
    // Add all children of the content block (e.g. p, a)
    for (const child of contentBlock.children) {
      cellContent.push(child);
    }
  }

  // If everything is missing, still provide a blank cell
  const contentRow = [cellContent.length ? cellContent : ['']];

  // Build table rows
  const rows = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
