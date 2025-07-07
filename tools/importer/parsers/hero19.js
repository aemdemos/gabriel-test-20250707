/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside this hero section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Collect image (background image)
  let imageEl = grid.querySelector('img');

  // Collect all text content elements: headings, paragraphs, and contact list
  let contentEls = [];
  // The first div (text block)
  const textBlock = grid.querySelector('div');
  if (textBlock) {
    // Gather all children of the text block that are headings or paragraphs
    const textNodes = Array.from(textBlock.children).filter(el => (
      /^H[1-6]$/.test(el.tagName) || el.tagName === 'P')
    );
    if (textNodes.length) {
      contentEls.push(...textNodes);
    }
  }
  // Also add the ul (for contact options), if present
  const contactList = grid.querySelector('ul');
  if (contactList) {
    contentEls.push(contactList);
  }

  // If nothing was found for content, fallback to all non-image direct children
  if (contentEls.length === 0) {
    const children = Array.from(grid.children).filter(c => c !== imageEl);
    contentEls = children;
  }

  // Assemble the block table per spec:
  const headerRow = ['Hero (hero19)'];
  const imageRow = [imageEl || ''];
  const contentRow = [contentEls.length === 1 ? contentEls[0] : contentEls];
  const cells = [headerRow, imageRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
