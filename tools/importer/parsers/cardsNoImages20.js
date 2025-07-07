/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the example
  const headerRow = ['Cards (cardsNoImages20)'];

  // Each card is an immediate child <div> (with class flex-horizontal ...)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, extract the main text content (the <p> inside)
  // We want to reference the existing <p> elements, not clone them
  const rows = cardDivs.map(cardDiv => {
    // Find the first <p> in direct children (robust to minor variations)
    const p = cardDiv.querySelector('p');
    return [p ? p : '']; // If there's no <p>, put an empty string
  });

  // Compose the table cell array
  const tableRows = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
