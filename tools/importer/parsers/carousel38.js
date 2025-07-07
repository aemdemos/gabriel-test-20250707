/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the combined text cell for the first slide
  function getTextContentCell(textBlock) {
    if (!textBlock) return '';
    const items = [];
    // Heading (first heading in block)
    const heading = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) items.push(heading);
    // Paragraph(s)
    const paras = textBlock.querySelectorAll('p');
    paras.forEach(p => items.push(p));
    // CTA buttons (as links)
    const btnGroup = textBlock.querySelector('.button-group');
    if (btnGroup) {
      const links = btnGroup.querySelectorAll('a');
      links.forEach((a, i) => {
        if (i > 0) items.push(document.createElement('br'));
        items.push(a);
      });
    }
    // Only return items if present
    if (items.length === 1) return items[0];
    if (items.length > 1) return items;
    return '';
  }

  // Find the two main columns: text and images
  // The outermost grid is the main split; locate both children.
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;
  const gridChildren = Array.from(mainGrid.children);

  // Find which child is the image grid, which is the text block
  let imagesGrid = null;
  let textBlock = null;
  gridChildren.forEach(child => {
    if (child.querySelector('.grid-layout') && child.querySelectorAll('img').length > 0) {
      imagesGrid = child.querySelector('.grid-layout');
    } else if (!textBlock) {
      textBlock = child;
    }
  });

  // Get images for slides
  const imgs = imagesGrid ? Array.from(imagesGrid.querySelectorAll('img')) : [];

  // Compose table rows
  const cells = [];
  // Exact header (per requirements and example)
  cells.push(['Carousel (carousel38)']);

  imgs.forEach((img, idx) => {
    // Only the first slide gets text content (heading, paragraph, CTAs)
    let textCell = '';
    if (idx === 0) {
      textCell = getTextContentCell(textBlock);
    }
    cells.push([img, textCell]);
  });

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
