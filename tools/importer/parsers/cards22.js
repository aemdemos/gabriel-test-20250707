/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // Find all tab panes
  const tabPanes = element.querySelectorAll('.w-tab-pane');
  tabPanes.forEach((tabPane) => {
    // Find grid layout in each tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> in the grid
    const cards = Array.from(grid.children).filter(child => child.tagName === 'A' || child.tagName === 'a');
    cards.forEach((card) => {
      // Try to get the image, if present
      let img = null;
      const imgDiv = card.querySelector('.utility-aspect-3x2');
      if (imgDiv) {
        img = imgDiv.querySelector('img');
      }

      // Text content: heading and description
      // For cards with flex-centered layout, these are inside .utility-text-align-center
      let heading = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      let infoCell = [];
      if (heading) infoCell.push(heading);
      if (desc && desc !== heading) infoCell.push(desc);

      // For cards with only one main text container (flex), use it directly to preserve formatting
      const flexText = card.querySelector('.utility-text-align-center');
      if (!img && flexText) {
        infoCell = [flexText];
      }

      // If no infoCell at all, leave it blank (shouldn't happen in valid content)
      rows.push([
        img ? img : '',
        infoCell.length === 1 ? infoCell[0] : infoCell
      ]);
    });
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
