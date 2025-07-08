/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name
  const headerRow = ['Hero (hero37)'];
  // Image/background row: none given in this HTML
  const imageRow = [''];

  // Get the grid container
  const grid = element.querySelector('.w-layout-grid');
  let contentElements = [];

  if (grid) {
    // Get direct children of the grid only
    const children = Array.from(grid.children);
    // First child should be the div with headings and subheading
    const contentDiv = children.find(child => child.tagName === 'DIV');
    if (contentDiv) {
      // Get the heading (h2)
      const heading = contentDiv.querySelector('h2');
      if (heading) contentElements.push(heading);
      // Get the subheading (p)
      const subheading = contentDiv.querySelector('p');
      if (subheading) contentElements.push(subheading);
    }
    // The CTA is an anchor (likely the only <a> in children)
    const cta = children.find(child => child.tagName === 'A');
    if (cta) contentElements.push(cta);
  }

  // Always provide a cell with either the elements or empty string
  const contentRow = [contentElements.length ? contentElements : ''];

  // Build the table
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}