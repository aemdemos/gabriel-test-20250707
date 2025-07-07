/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image and heading as before
  const cardRotate = element.querySelector('.ix-card-rotate-2');
  let imageEl = null;
  let headingEl = null;
  if (cardRotate) {
    const cardBody = cardRotate.querySelector('.card-body');
    if (cardBody) {
      imageEl = cardBody.querySelector('img');
      const h4 = cardBody.querySelector('.h4-heading');
      if (h4) {
        headingEl = document.createElement('h2');
        headingEl.textContent = h4.textContent.trim();
      }
    }
  }
  // Table structure: header row is a single cell spanning two cols, content row is two columns
  const headerRow = ['Carousel (carousel24)'];
  const slideRow = [imageEl || '', headingEl || ''];
  // Build the table with correct structure
  const cells = [
    headerRow,
    slideRow
  ];
  // Create table and set proper colspan on header row
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Set colspan on header cell to span both columns
  const th = table.querySelector('th');
  if (th && slideRow.length > 1) {
    th.setAttribute('colspan', slideRow.length);
  }
  element.replaceWith(table);
}
