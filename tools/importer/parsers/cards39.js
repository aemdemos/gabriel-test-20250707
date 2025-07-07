/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main grid containing the cards
  const outerGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!outerGrid) return;

  // 2. Get top-level children: first is feature card, second is nested grid of cards
  const topLevelChildren = Array.from(outerGrid.children);
  if (topLevelChildren.length < 2) return;

  const featureCard = topLevelChildren[0];
  const nestedGrid = topLevelChildren[1];

  // Helper to build text cell: heading, description, CTA button if present
  function buildTextCell(cardEl) {
    const cellContent = [];
    // Find heading (prefer h2, then h3, h4, etc.)
    let heading = cardEl.querySelector('h2, h3, h4, h5, h6');
    if (heading) cellContent.push(heading);
    // Find description (first <p>)
    let desc = cardEl.querySelector('p');
    if (desc) cellContent.push(desc);
    // Find CTA (button-like) if present
    let cta = cardEl.querySelector('.button, a.button, button');
    // Only push if it's not already pushed as description
    if (cta && cta !== desc) cellContent.push(cta);
    return cellContent;
  }

  // Helper to get image from .utility-aspect-* wrappers
  function getImage(cardEl) {
    let imgWrap = cardEl.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (imgWrap) {
      let img = imgWrap.querySelector('img');
      if (img) return img;
    }
    // fallback: just find first img
    let fallbackImg = cardEl.querySelector('img');
    return fallbackImg || null;
  }

  // 3. Start building the table rows
  const tableRows = [];
  tableRows.push(['Cards (cards39)']); // header

  // 4. Feature card row
  const featureImg = getImage(featureCard);
  const featureText = buildTextCell(featureCard);
  tableRows.push([
    featureImg,
    featureText
  ]);

  // 5. Nested grid card rows: direct children that are <a>
  const cardEls = Array.from(nestedGrid.children).filter(el => el.tagName === 'A');
  for (const cardEl of cardEls) {
    const img = getImage(cardEl);
    const text = buildTextCell(cardEl);
    tableRows.push([
      img,
      text
    ]);
  }

  // 6. Create table and replace
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
