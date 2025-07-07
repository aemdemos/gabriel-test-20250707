/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs that represent the grid items
  const gridItems = Array.from(element.querySelectorAll(':scope > div'));

  // Get all <img> elements from these grid items
  const images = gridItems
    .map(div => div.querySelector('img'))
    .filter(Boolean);

  // The block expects: 1 column, 3 rows: header, background image(s), content (none in this HTML)
  const cells = [
    ['Hero (hero1)'],
    [images],
    [''], // No heading, subheading, or CTA present in this HTML
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
