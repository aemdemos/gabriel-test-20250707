/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create an empty cell (for background image row)
  const emptyCell = '';

  // The grid contains all main content parts
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Eyebrow/author: class 'paragraph-xl', but must not be the richtext/paragraph block
  let eyebrow = null;
  const gridChildren = grid.querySelectorAll(':scope > *');
  for (const child of gridChildren) {
    if (child.classList.contains('paragraph-xl') && !child.classList.contains('w-richtext')) {
      eyebrow = child;
      break;
    }
  }

  // Tags (as additional badges)
  const tagsContainer = grid.querySelector('.flex-vertical');
  let tags = [];
  if (tagsContainer) {
    tags = Array.from(tagsContainer.querySelectorAll('.tag'));
  }

  // Headline (h2)
  const headline = grid.querySelector('h1, h2, h3');

  // Paragraphs (richtext block)
  const paragraphDiv = grid.querySelector('.rich-text, .w-richtext');

  // Compose hero content in order, only include if present
  const heroContent = [];
  if (eyebrow) heroContent.push(eyebrow);
  if (tags.length) heroContent.push(...tags);
  if (headline) heroContent.push(headline);
  if (paragraphDiv) heroContent.push(paragraphDiv);

  // Compose table data
  const cells = [
    ['Hero (hero31)'],
    [emptyCell],
    [heroContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
