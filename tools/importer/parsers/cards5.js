/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the block table header, matching the naming exactly
  const headerRow = ['Cards (cards5)'];
  const cells = [headerRow];

  // Get all card links (each card is a direct child <a> of the grid container)
  const cards = element.querySelectorAll(':scope > a.card-link');
  cards.forEach(card => {
    // -- IMAGE COLUMN --
    // Find the card image (first <img> under .utility-aspect-3x2)
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    let imageElem = '';
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) imageElem = img;
    }

    // -- TEXT COLUMN --
    // Find the text content area
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Prepare a container for text content elements (order: tag, heading, paragraph)
    const textContent = [];
    if (textContainer) {
      // Tag (optional)
      const tag = textContainer.querySelector('.tag');
      if (tag) textContent.push(tag);
      // Heading (h3 or .h4-heading)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) textContent.push(heading);
      // Paragraph (optional)
      const paragraph = textContainer.querySelector('p');
      if (paragraph) textContent.push(paragraph);
    }
    // Guard against no text content
    const textCell = textContent.length > 0 ? textContent : '';
    // Add card row to the table
    cells.push([imageElem, textCell]);
  });

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}