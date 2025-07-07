/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column, block name
  const headerRow = ['Columns (columns16)'];

  // Get the main grid with two columns (headline, right content)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  let leftCell = '';
  let rightCell = '';
  if (mainGrid) {
    const columns = Array.from(mainGrid.children);
    leftCell = columns[0] || '';
    rightCell = columns[1] || '';
  }

  // Find the two images for the lower row
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let imageCells = [];
  if (imagesGrid) {
    imageCells = Array.from(imagesGrid.children).map(cell => {
      const img = cell.querySelector('img');
      return img || '';
    });
  }

  // Compose the rows
  // Header row: single column
  // Second row: as many columns as mainGrid columns (usually 2)
  // Third row: as many columns as images (usually 2)
  const rows = [];
  rows.push(headerRow); // single column
  rows.push([leftCell, rightCell]); // content columns
  if (imageCells.length) rows.push(imageCells);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
