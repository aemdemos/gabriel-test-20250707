/* global WebImporter */
export default function parse(element, { document }) {
  // Table header (exact match with example)
  const headerRow = ['Hero (hero23)'];

  // Get the active tab pane (or fallback to first, for resilience)
  let tabPane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!tabPane) tabPane = element.querySelector('.w-tab-pane');
  if (!tabPane) return;

  // Find grid container inside the tab
  // Use the first .w-layout-grid inside tabPane or fallback to tabPane itself
  const grid = tabPane.querySelector('.w-layout-grid') || tabPane;

  // Find the image for the background row (if any)
  const img = grid.querySelector('img');

  // Gather all *direct* children of the grid except images, preserving order
  // This ensures we keep all text, headings etc. as in the source
  const contentNodes = [];
  Array.from(grid.children).forEach((child) => {
    if (child.tagName !== 'IMG') {
      contentNodes.push(child);
    }
  });

  // If there is no textual content, fallback to textContent for resilience
  let contentRow;
  if (contentNodes.length > 0) {
    contentRow = [contentNodes]; // Use array so multiple elements appear in the single cell
  } else {
    const fallbackText = grid.textContent.trim();
    contentRow = [fallbackText ? document.createTextNode(fallbackText) : ''];
  }

  // Build the table: 1 col, header (block name), image row, then content row
  const rows = [
    headerRow,
    [img ? img : ''],
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
