/* global WebImporter */
export default function parse(element, { document }) {
  // The correct header must be a single cell: ['Tabs']
  const headerRow = ['Tabs'];
  const rows = [headerRow];

  // For each tab (direct child <a>), create a row with label and empty content
  const tabs = Array.from(element.querySelectorAll(':scope > a'));
  tabs.forEach(tab => {
    let labelDiv = tab.querySelector('.paragraph-lg');
    let label = labelDiv ? labelDiv.textContent.trim() : tab.textContent.trim();
    rows.push([label, '']);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
