/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Hero (hero3)'];

  // No background image in source, so blank row
  const imageRow = [''];

  // Extract content from the left and right grid columns
  let left, right;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridChildren = Array.from(grid.children);
    left = gridChildren[0];
    right = gridChildren[1];
  } else {
    // Fallback: get first two divs under container
    const container = element.querySelector('.container') || element;
    const directDivs = Array.from(container.querySelectorAll(':scope > div'));
    left = directDivs[0];
    right = directDivs[1];
  }

  // Get all children from left and right columns (preserving order)
  const leftContent = left ? Array.from(left.children) : [];
  const rightContent = right ? Array.from(right.children) : [];

  // Combine heading/subheading and CTAs in one cell, order: left then right
  const contentRow = [[...leftContent, ...rightContent]];

  // Create the block table
  const rows = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
