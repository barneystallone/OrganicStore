/**
 * 
 */
const sortTableByColumn = (table, column, asc = true) =>{
    const typeSort = asc ? 1 : -1;
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        const tmp = aColText < bColText ? (-1 * typeSort) : 0;
        return (aColText > bColText) ? (1 * typeSort) : tmp;
    })

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    tbody.append(...sortedRows);

    // typeSort = asc -> asc , typeSort = desc -> desc 
    table.querySelectorAll(`thead th`).forEach(td => {
        td.classList.remove('th-sort-asc', 'th-sort-desc');
    })

    if (asc) {
        table.querySelector(`thead th:nth-child(${column + 1})`).classList.add('th-sort-asc');
    } else {
        table.querySelector(`thead th:nth-child(${column + 1})`).classList.add('th-sort-desc')
    }

}

export const AddSortByClickEvent = () => {
    document.querySelectorAll('.table-sortable th').forEach(headerCell => {
        headerCell.addEventListener('click', () => {
            //  th->tr->thead->table
            const tableElement = headerCell.parentElement.parentElement.parentElement;

            const index = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
            const currentIsAsc = headerCell.classList.contains('th-sort-asc');

            // asc -> desc
            sortTableByColumn(tableElement, index, !currentIsAsc);
        });
    });
}

