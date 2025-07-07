/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid of images: direct child with class grid-layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Header row for the block (must match example exactly, single cell)
  const headerRow = ['Carousel (carousel17)'];

  // Each slide: image and (optionally) text
  const slideDivs = Array.from(grid.children);
  const rows = slideDivs.map(slide => {
    const img = slide.querySelector('img');
    // Always output 2 columns per row (first cell image, second cell text if present, else empty)
    return [img, ''];
  });

  // Compose the table
  const tableArray = [headerRow, ...rows];
  // Ensure header row has ONLY one cell, all subsequent rows have two
  // This is handled above
  const block = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element with the carousel block
  element.replaceWith(block);
}
