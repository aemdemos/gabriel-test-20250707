/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, exactly as in the example
  const headerRow = ['Hero (hero25)'];

  // Find the main grid container, which has an image and a text container
  // The outermost grid that's a direct child of the section
  let grid = element.querySelector(':scope > .w-layout-grid.grid-layout.tablet-1-column');
  if (!grid) grid = element;

  // Find the image (should be a direct child of the grid)
  const img = grid.querySelector('img');
  const imageRow = [img || '']; // leave blank if not found

  // Find the text content (child div that contains a heading)
  // We want the div (possibly nested) that has the heading/text/buttons
  let textContainer = null;
  const directDivs = grid.querySelectorAll(':scope > div');
  for (const div of directDivs) {
    // The relevant text div has a heading
    if (div.querySelector('h1, h2, h3')) {
      textContainer = div;
      break;
    }
    // or maybe nested one level deeper
    const possible = div.querySelector('div');
    if (possible && possible.querySelector('h1, h2, h3')) {
      textContainer = possible;
      break;
    }
  }
  // fallback: use first div
  if (!textContainer && directDivs.length) textContainer = directDivs[0];

  // Compose the content row from the textContainer children
  let contentArr = [];
  if (textContainer) {
    // Only include non-empty elements
    for (const child of Array.from(textContainer.children)) {
      // skip empty divs
      if (child.textContent.trim() || child.tagName === 'A' || child.tagName === 'BUTTON') {
        contentArr.push(child);
      }
    }
  }
  const contentRow = [contentArr.length ? contentArr : ['']];

  // Final table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
