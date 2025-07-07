/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (multi-column block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct child divs of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row should be a single cell (spanning all columns visually)
  // The second row contains each column as a separate cell
  const cells = [
    ['Columns (columns32)'],
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
