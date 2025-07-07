/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create text cell with h3 and p, if present
  function makeTextCell(card) {
    // Look for a .utility-padding-all-2rem, fall back to any h3/p if not present
    let textDiv = card.querySelector('.utility-padding-all-2rem');
    if (!textDiv) textDiv = card;
    const frags = [];
    // Use only direct children if possible
    const heading = textDiv.querySelector('h3, h2, h4, h5, h6');
    if (heading) frags.push(heading);
    // description is first <p> under textDiv, if any
    const desc = textDiv.querySelector('p');
    if (desc) frags.push(desc);
    if (!frags.length) return '';
    // If only one fragment (heading or desc), return single element
    if (frags.length === 1) return frags[0];
    // Otherwise return array (preserves order and elements)
    return frags;
  }
  // Find all immediate child divs (cards) with an img
  const cardDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));
  const rows = [['Cards (cards26)']];
  for (const card of cardDivs) {
    // Find the first image in the card
    const img = card.querySelector('img');
    // Only proceed if there's an image (per block definition)
    if (!img) continue;
    // Make the text cell by extracting heading/desc if present
    const textCell = makeTextCell(card);
    rows.push([img, textCell]);
  }
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
