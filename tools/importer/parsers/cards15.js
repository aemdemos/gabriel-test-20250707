/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the markdown example
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  // Select each card (direct children anchor tags)
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // 1st cell: the image element (or empty string if not found)
    let img = null;
    // The image is within a .utility-aspect-2x3 inside the card
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    if (imgWrapper) {
      img = imgWrapper.querySelector('img');
    }
    // 2nd cell: text content (meta + heading)
    const cellContent = [];
    // Meta: label and date row
    const meta = card.querySelector('.flex-horizontal');
    if (meta) {
      // Reference the existing element
      cellContent.push(meta);
    }
    // Heading: h3 (with h4-heading or utility class)
    const heading = card.querySelector('h3, h4, .h4-heading');
    if (heading) {
      cellContent.push(heading);
    }
    rows.push([
      img || '',
      cellContent.length === 1 ? cellContent[0] : cellContent
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
