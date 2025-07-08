/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Hero (hero41)'];

  // Get grid cells (the main two columns of the hero)
  const gridCells = element.querySelectorAll(':scope > div > div');

  // --- Row 2: Background image (optional) ---
  let bgImg = null;
  if (gridCells.length > 0) {
    // Prefer the first <img> in the first column
    bgImg = gridCells[0].querySelector('img');
  }
  // Only include the image if present
  const imgRow = bgImg ? [bgImg] : [''];

  // --- Row 3: Content (headline, subheading, cta) ---
  let contentCellElements = [];
  if (gridCells.length > 1) {
    // In the second grid cell, find the content grid
    const contentGrid = gridCells[1].querySelector('.w-layout-grid');
    if (contentGrid) {
      // Heading (h1)
      const h1 = contentGrid.querySelector('h1');
      if (h1) contentCellElements.push(h1);

      // The rest (paragraph and cta) are inside a flex container
      const flexVertical = contentGrid.querySelector('.flex-vertical');
      if (flexVertical) {
        const p = flexVertical.querySelector('p');
        if (p) contentCellElements.push(p);
        // Button (cta)
        const cta = flexVertical.querySelector('a.button');
        if (cta) contentCellElements.push(cta);
      }
    }
  }
  // If no content elements found, add empty string to cell for structure
  const contentRow = contentCellElements.length > 0 ? [contentCellElements] : [''];

  // Compose the block table
  const rows = [headerRow, imgRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
