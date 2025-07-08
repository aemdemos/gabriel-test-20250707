/* global WebImporter */
export default function parse(element, { document }) {
  // The table header must exactly match the block name
  const headerRow = ['Cards (cards35)'];

  // Get all immediate card containers (should be divs)
  const cardDivs = element.querySelectorAll(':scope > div');

  // For this HTML, each card div only contains an image, so second cell is empty
  const rows = [headerRow];
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img, picture, svg');
    // Defensive: only add the row if there's an image (since image is required)
    if (img) {
      rows.push([img, '']);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
