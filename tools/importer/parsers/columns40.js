/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one cell, as in the example
  const headerRow = ['Columns (columns40)'];

  // Gather all column divs (direct children)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (!columnDivs.length) return;

  // Content row: one cell for each column
  const contentRow = columnDivs;

  // Structure table: header row, then columns row (only these two rows)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
