/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match example EXACTLY
  const headerRow = ['Hero (hero6)'];

  // Get the main content grid
  const gridLayout = element.querySelector('.w-layout-grid.grid-layout');

  // Defensive: ensure gridLayout exists
  let bgImg = '';
  let textContent = '';

  if (gridLayout) {
    // The first child (background image container)
    const imageDiv = gridLayout.children[0];
    if (imageDiv) {
      const foundImg = imageDiv.querySelector('img');
      if (foundImg) bgImg = foundImg;
    }
    // The second child (text content container)
    const contentDiv = gridLayout.children[1];
    if (contentDiv) {
      // Find the innermost card (holds text/buttons)
      const card = contentDiv.querySelector('.card');
      if (card) textContent = card;
    }
  }

  // Structure: always 3 rows, 1 col each
  const cells = [
    headerRow,
    [bgImg],
    [textContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
