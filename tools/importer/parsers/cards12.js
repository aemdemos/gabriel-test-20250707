/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards12)'];
  const rows = [];

  // Find all direct child divs (each is a card container with a single image)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(cardDiv => {
    // Each cardDiv should contain a single image
    const img = cardDiv.querySelector('img');
    // First cell: the image element itself (reference, not clone)
    const imageCell = img;
    // Second cell: No text info present in this markup, so use empty string
    const textCell = '';
    rows.push([imageCell, textCell]);
  });

  // Compose table cells array
  const cells = [headerRow, ...rows];
  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
