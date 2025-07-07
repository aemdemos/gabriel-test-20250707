/* global WebImporter */
export default function parse(element, { document }) {
  // Build header row as in the example
  const rows = [['Cards (cards36)']];

  // Get all immediate child divs (each is a card container with an image)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // Each cardDiv should contain a single image
    const img = cardDiv.querySelector('img');
    // If image exists, add as first cell; second cell is empty (no text in this variant)
    if (img) {
      rows.push([img, '']);
    }
  });

  // Create the table using the extracted rows
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
