/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  // Get all direct children (columns)
  const columns = Array.from(grid.children);
  // Build the cells array for the columns block
  // Header: a single cell spanning all columns
  const headerRow = ['Columns (columns11)'];
  // Content: one cell per column
  const contentRow = columns;
  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  // Replace the original element
  element.replaceWith(table);
}
