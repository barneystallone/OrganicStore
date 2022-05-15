/**
 * 
 */
export default class TableUtil {
    constructor() { }
    
    static sortTableByColumn(table, column, asc = true, options = { type: 'td' }) {

        // thead td or thead th

        const colTag = options.type
        const typeSort = asc ? 1 : -1;
        const tbody = table.tBodies[0];
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // a-> current , b-> prev , -1 -> swap, 0 -> nothing
        const sortedRows = rows.sort((a, b) => {
            const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

            const tmp = aColText < bColText ? (-1 * typeSort) : 0;
            return (aColText > bColText) ? (1 * typeSort) : tmp;
        })

        // Remove all existing <tr> from table
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }

        // Append sortedRows
        tbody.append(...sortedRows);

        // Tracking dòng nào được sort
        table.querySelectorAll(`thead tr ${colTag}`).forEach(td => {
            td.classList.remove('th-sort-asc', 'th-sort-desc');
        })

        if (asc) {
            table.querySelector(`thead tr ${colTag}:nth-child(${column + 1})`).classList.add('th-sort-asc');
        } else {
            table.querySelector(`thead tr ${colTag}:nth-child(${column + 1})`).classList.add('th-sort-desc')
        }

        // table.querySelector(`thead tr td:nth-child(${column +1 })`).classList.toggle('th-sort-asc', asc);
        // table.querySelector(`thead tr td:nth-child(${column +1 })`).classList.toggle('th-sort-desc', !asc);
    }
    static addClickEventToSort() {
        document.querySelectorAll('.table-sortable th').forEach(headerCell => {
            headerCell.addEventListener('click', () => {
                // Lấy ra tableElement , td->tr->thead->table
                const tableElement = headerCell.parentElement.parentElement.parentElement;
                // Lấy ra index của column
                // truyền vào hàm indexOf collections là  tr.children 
                const index = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
                const currentIsAsc = headerCell.classList.contains('th-sort-asc');

                // asc -> desc
                TableUtil.sortTableByColumn(tableElement, index, !currentIsAsc, { type: 'th' });
            });
        });
    }
}
// TableUtil.addClickEventToSort();