/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match example exactly
  const headerRow = ['Hero (hero29)'];

  // Find the grid layout container in the section
  const grid = element.querySelector('.w-layout-grid');
  let textCol = null, imageCol = null;
  if (grid) {
    // Get all direct children of the grid (typically 2: text and image)
    const children = Array.from(grid.children);
    // Identify which child is image and which is text
    children.forEach(child => {
      if (!textCol && (child.querySelector('h1, h2, h3, p, a'))) {
        textCol = child;
      }
      if (!imageCol && child.tagName === 'IMG') {
        imageCol = child;
      }
      if (!imageCol && child.querySelector && child.querySelector('img')) {
        imageCol = child.querySelector('img');
      }
    });
  }

  // Row 2: the image (optional)
  let imageCell = '';
  if (imageCol && imageCol.tagName === 'IMG') {
    imageCell = imageCol;
  }

  // Row 3: text & cta
  let contentCell = '';
  if (textCol) {
    // Gather: eyebrow, heading, paragraphs, and button
    const nodes = [];
    // Eyebrow (optional)
    const eyebrow = textCol.querySelector('.eyebrow');
    if (eyebrow) nodes.push(eyebrow);
    // Heading (h2, h1, etc)
    const heading = textCol.querySelector('h1, h2, h3');
    if (heading) nodes.push(heading);
    // Main paragraph(s)
    const mainP = textCol.querySelector('.paragraph-xxl');
    if (mainP) nodes.push(mainP);
    // Secondary info
    const secP = textCol.querySelector('.utility-text-secondary');
    if (secP) nodes.push(secP);
    // Call to action button
    const btn = textCol.querySelector('a.button, .w-button');
    if (btn) nodes.push(btn);
    if (nodes.length) {
      contentCell = nodes;
    } else {
      // fallback: put all content
      contentCell = textCol;
    }
  }

  // Compose the block
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
