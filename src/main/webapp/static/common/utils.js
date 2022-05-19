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

export const initPagination = (totalItem, itemPerPage) => {
    const element = document.querySelector(".pagination ul");
    const totalPages = Math.ceil(totalItem / itemPerPage);
    let liTag = '';
    liTag += `<li class="btn prev"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
    for (let i = 1; i <= totalPages; i++) {
        liTag += `<li class=" number" data-page="${i}"><span>${i}</span></li>`;
    }
    liTag += `<li class="btn next" ><span>Next <i class="fas fa-angle-right"></i></span></li>`;
    console.log({element});
    console.log({liTag});
    element.innerHTML = liTag;
    document.querySelector(".number[data-page='1']").classList.add("active");
    // updateTableCategories(0, 9);
}
export const AddPaginationEvent = (totalItem, itemPerPage) => {
    const totalPages = Math.ceil(totalItem / itemPerPage);

   
    // active page
    document.querySelectorAll(".btn").forEach(e => {
        e.addEventListener('click', (evt) => {
            const
                type = (evt.target.closest("li").classList.contains("prev")) ? -1 : 1,
                activePage = document.querySelector(".number.active"),
                page = Number(activePage.dataset.page),
                newPage = page + type;

            if (!(newPage < 1 || newPage > totalPages)) {
                let newActivePage = document.querySelector(`.number[data-page="${newPage}"]`);
                newActivePage.classList.add("active");
                activePage.classList.remove("active");
            }

        })
    })
    // active page
    document.querySelectorAll(".pagination li.number").forEach(e => {
        e.addEventListener('click', evt => {

            document.querySelector(".number.active").classList.remove("active");
            evt.target.closest("li.number").classList.add("active");
        })
    })
}