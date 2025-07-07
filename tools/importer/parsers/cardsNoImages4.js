/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages4)'];
  const rows = [headerRow];

  // Find the main grid with all cards
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 1. First card (large, on left side)
  // This is the first direct child <a> of .w-layout-grid
  const primaryCard = grid.querySelector(':scope > a.utility-link-content-block');
  if (primaryCard) {
    const cardContent = document.createElement('div');
    // Tag (optional)
    const tagGroup = primaryCard.querySelector('.tag-group');
    if (tagGroup) cardContent.appendChild(tagGroup);
    // Heading
    const heading = primaryCard.querySelector('h3');
    if (heading) cardContent.appendChild(heading);
    // Description
    const desc = primaryCard.querySelector('p');
    if (desc) cardContent.appendChild(desc);
    rows.push([cardContent]);
  }

  // 2. Next two cards with images and tags (to the right of the main card)
  // They are inside the first .flex-horizontal.flex-vertical.flex-gap-sm
  const allFlexes = grid.querySelectorAll(':scope > .flex-horizontal.flex-vertical.flex-gap-sm');
  if (allFlexes.length > 0) {
    const flex1 = allFlexes[0];
    const flexCards = flex1.querySelectorAll(':scope > a.utility-link-content-block');
    flexCards.forEach(card => {
      const cardContent = document.createElement('div');
      // Tag (optional)
      const tagGroup = card.querySelector('.tag-group');
      if (tagGroup) cardContent.appendChild(tagGroup);
      // Heading
      const heading = card.querySelector('h3');
      if (heading) cardContent.appendChild(heading);
      // Description
      const desc = card.querySelector('p');
      if (desc) cardContent.appendChild(desc);
      rows.push([cardContent]);
    });
  }

  // 3. Rightmost column: only text cards, separated by dividers
  if (allFlexes.length > 1) {
    const flex2 = allFlexes[1];
    const flexCards = flex2.querySelectorAll(':scope > a.utility-link-content-block');
    flexCards.forEach(card => {
      const cardContent = document.createElement('div');
      // Only heading and description
      const heading = card.querySelector('h3');
      if (heading) cardContent.appendChild(heading);
      const desc = card.querySelector('p');
      if (desc) cardContent.appendChild(desc);
      rows.push([cardContent]);
    });
  }

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
