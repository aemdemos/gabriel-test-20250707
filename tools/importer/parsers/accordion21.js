/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Accordion block, exactly as required
  const headerRow = ['Accordion (accordion21)'];
  const rows = [headerRow];

  // Find all direct children dividers, each contains an accordion item
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    // In each divider, find the grid layout
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid) return;
    // The grid should have two children: title and content
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length < 2) return;
    const title = gridChildren[0];
    const content = gridChildren[1];
    rows.push([title, content]);
  });

  // Create the structured accordion block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
