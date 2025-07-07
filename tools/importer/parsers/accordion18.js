/* global WebImporter */
export default function parse(element, { document }) {
  // Compose rows for the block table
  const rows = [
    ['Accordion (accordion18)'] // Header row, exact as required
  ];

  // Select all accordion items (direct children with class w-dropdown)
  const accordionItems = element.querySelectorAll(':scope > .w-dropdown');
  accordionItems.forEach((item) => {
    // Title: .w-dropdown-toggle > .paragraph-lg
    let titleCell = '';
    const toggle = item.querySelector(':scope > .w-dropdown-toggle');
    if (toggle) {
      const paragraph = toggle.querySelector('.paragraph-lg');
      if (paragraph) {
        titleCell = paragraph;
      } else {
        // fallback to toggle if .paragraph-lg not found
        titleCell = toggle;
      }
    }

    // Content: .w-dropdown-list (may contain .w-richtext)
    let contentCell = '';
    const dropdownList = item.querySelector(':scope > .w-dropdown-list');
    if (dropdownList) {
      // Find .w-richtext inside dropdownList, if exists, use it, else use full dropdownList
      const richText = dropdownList.querySelector('.w-richtext');
      if (richText) {
        contentCell = richText;
      } else {
        contentCell = dropdownList;
      }
    }

    rows.push([titleCell, contentCell]);
  });

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
