/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Hero (hero33)
  const headerRow = ['Hero (hero33)'];

  // Find grid container (the layout div with the image and content)
  const container = element.querySelector('.container');
  let grid;
  if (container) {
    grid = container.querySelector('.grid-layout');
  }
  if (!grid) return;

  // Extract the image (first image in the grid)
  let imageCell = [''];
  const img = grid.querySelector('img');
  if (img) imageCell = [img];

  // Extract the content column
  // Content is the div in grid that is not the image
  let contentCell = [''];
  const gridChildren = Array.from(grid.children);
  const contentDiv = gridChildren.find(child => child !== img);
  if (contentDiv) {
    // Collect all contentDiv children (this preserves headings, meta, etc)
    // We preserve all children (including eyebrow, tag, heading, meta-row)
    const contentElements = Array.from(contentDiv.children);
    contentCell = [contentElements];
  }

  // Compose final table: 1 column, 3 rows
  const cells = [
    headerRow,
    imageCell,
    contentCell
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
