/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const rows = [
    ['Cards (cards34)']
  ];

  // Each card is a direct <a> child
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  cards.forEach(card => {
    // Find the image in the card
    const img = card.querySelector('img');
    
    // Find the card content block (the div next to img)
    // It's the first div in the grid after the image
    let contentDiv = null;
    const grid = card.querySelector('.w-layout-grid');
    if (grid) {
      // grid's children: [img, contentDiv]
      const children = Array.from(grid.children);
      contentDiv = children.find(child => child !== img);
    }

    // Only add fully formed rows
    if (img && contentDiv) {
      rows.push([img, contentDiv]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
