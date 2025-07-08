/* global WebImporter */
export default function parse(element, { document }) {
  // Get all images in the hero grid (background collage)
  const gridWrapper = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  let images = [];
  if (gridWrapper) {
    images = Array.from(gridWrapper.querySelectorAll('img'));
  }

  // Place all images in a single div (as in the original DOM)
  let imageDiv = null;
  if (images.length > 0) {
    imageDiv = document.createElement('div');
    images.forEach(img => imageDiv.appendChild(img));
  }

  // Get the content area (headline, subheading, CTA)
  // The container includes heading, subheading, and button group
  const contentColumn = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');

  // Compose the table rows: header, images (collage), then content
  const rows = [
    ['Hero (hero10)'],
    [imageDiv],
    [contentColumn],
  ];

  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
