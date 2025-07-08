/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure element is present
  if (!element) return;

  // Find the grid layout inside the container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all children of the grid
  const gridChildren = Array.from(grid.children);
  // Find the image (optional)
  const img = gridChildren.find(child => child.tagName === 'IMG');
  // The other child is the content block
  const contentBlock = gridChildren.find(child => child !== img);

  // Create an array to hold content elements for the third row
  const contentElements = [];
  if (contentBlock) {
    // Heading (h1-h6)
    const heading = contentBlock.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentElements.push(heading);
    // Subheading (p with subheading class)
    const subheading = contentBlock.querySelector('p.subheading');
    if (subheading) contentElements.push(subheading);
    // CTA buttons (in button-group)
    const buttonGroup = contentBlock.querySelector('.button-group');
    if (buttonGroup) {
      // Add each link directly
      Array.from(buttonGroup.querySelectorAll('a')).forEach(btn => contentElements.push(btn));
    }
  }

  const rows = [
    ['Hero (hero2)'],
    [img ? img : ''],
    [contentElements.length ? contentElements : '']
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
