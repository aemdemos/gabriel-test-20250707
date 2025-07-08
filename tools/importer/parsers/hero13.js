/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match exactly
  const headerRow = ['Hero (hero13)'];

  // Grab background image (first img in first grid cell)
  let backgroundImg = null;
  const gridCells = element.querySelectorAll('.w-layout-grid.grid-layout > div');
  if (gridCells.length > 0) {
    backgroundImg = gridCells[0].querySelector('img');
  }

  // Find content: headline, feature list, cta, and feature image
  let contentCell = [];
  if (gridCells.length > 1) {
    const contentContainer = gridCells[1];
    // Card (has headline, bullets, CTA, feature img)
    const cardBody = contentContainer.querySelector('.card-body');
    if (cardBody) {
      const cardGrid = cardBody.querySelector('.w-layout-grid');
      if (cardGrid) {
        // Headline
        const h2 = cardGrid.querySelector('h2');
        if (h2) contentCell.push(h2);
        // Features (vertical flex container)
        const features = cardGrid.querySelector('.flex-vertical');
        if (features) contentCell.push(features);
        // CTA button(s)
        const buttonGroup = cardGrid.querySelector('.button-group');
        if (buttonGroup) contentCell.push(buttonGroup);
        // Feature image (the only child img in cardGrid not already used)
        const innerImgs = cardGrid.querySelectorAll('img');
        innerImgs.forEach((img) => {
          // Only include if not the background image
          if (!backgroundImg || img !== backgroundImg) {
            contentCell.push(img);
          }
        });
      }
    }
  }

  // The structure: 1 column, 3 rows (header, bg image, content)
  const rows = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    [contentCell.length > 0 ? contentCell : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
