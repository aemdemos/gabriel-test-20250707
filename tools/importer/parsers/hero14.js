/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: must match the provided block name exactly
  const headerRow = ['Hero (hero14)'];

  // Extract (reference) the background image
  let bgImg = null;
  // Search for an <img> in the element, prioritizing cover-image class
  bgImg = element.querySelector('img.cover-image');

  // Extract (reference) the text content block
  // There is a grid: the second grid item contains the heading, etc.
  let textContent = null;
  const gridLayout = element.querySelector('.w-layout-grid');
  if (gridLayout) {
    const gridChildren = gridLayout.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      const contentContainer = gridChildren[1];
      // Only reference the actual container inside this div with the heading (if present)
      // The heading is inside a .container > div
      const mainContent = contentContainer.querySelector(':scope > .utility-margin-bottom-6rem');
      textContent = mainContent || contentContainer;
    }
  }
  // Edge case: fallback if above did not find text content
  if (!textContent) {
    textContent = document.createElement('div');
    textContent.textContent = '';
  }

  // Build rows for the block table
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
