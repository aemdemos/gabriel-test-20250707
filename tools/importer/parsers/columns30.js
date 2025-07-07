/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell in an array
  const headerRow = ['Columns (columns30)'];

  // Extract all column divs (direct children)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column's content: use the <img> inside if present, otherwise the column itself
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    if (img) return img;
    return col;
  });

  // Compose cells: header row is an array of length 1, second row is the content columns
  const cells = [headerRow, contentRow];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
