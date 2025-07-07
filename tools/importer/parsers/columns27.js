/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .container (it should be under the section)
  const container = element.querySelector('.container');
  if (!container) return;
  // Find the main grid inside
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid (which are the main content columns)
  const gridChildren = Array.from(mainGrid.children);

  // Defensive coding for at least three expected children
  const heading = gridChildren[0] || null;
  const quote = gridChildren[1] || null;
  const nestedGrid = gridChildren[2] || null;

  // Prepare left (heading + profile) and right (quote + logo) columns
  let leftColElements = [];
  let rightColElements = [];

  // Left column: heading (h2), profile (avatar + name + role)
  if (heading) leftColElements.push(heading);

  // Profile is in nestedGrid, flex-horizontal
  if (nestedGrid) {
    const profileRow = nestedGrid.querySelector('.flex-horizontal');
    if (profileRow) leftColElements.push(profileRow);
  }

  // Right column: quote (paragraph), logo (svg)
  if (quote) rightColElements.push(quote);
  if (nestedGrid) {
    // The logo is the last child of the nestedGrid that has a svg
    const logo = Array.from(nestedGrid.children).find(
      (el) => el.tagName === 'DIV' && el.querySelector('svg')
    );
    if (logo) rightColElements.push(logo);
  }

  // Compose columns cell array
  const cells = [
    ['Columns (columns27)'],
    [leftColElements, rightColElements]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
