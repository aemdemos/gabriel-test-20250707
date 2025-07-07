/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  // Get direct children (columns) of the grid
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;
  // Reference the actual existing elements from the DOM for the table row
  const cells = [
    ['Columns (columns8)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
