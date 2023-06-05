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
    element.innerHTML = "";
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
    
    const defaultActivePage = document.querySelector(".number[data-page='1']");
    if(defaultActivePage) {
        defaultActivePage.classList.add("active");

    }
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
        addEventClickNumberButton(e);
    })
}

export const addEventClickNumberButton =  (e) => {
    e.addEventListener('click', evt => {

        document.querySelector(".number.active").classList.remove("active");
        evt.target.closest("li.number").classList.add("active");
    })
}




// createPagination vs addaddPaginationEvent
export const createPagination = (totalPages, page) => {
    const element = document.querySelector(".pagination ul");
    let liTag = '';
    let active;
    let beforePage = page - 1;
    let afterPage = page + 1;
    if (page > 1) {
        liTag += `<li class="btn prev"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
    }

    if (totalPages!=4) {
        if (page > 2) {
            liTag += `<li class=" number"  data-page="1"><span>1</span></li>`;
            // liTag += `<li class="first number"  data-page=" 1"><span>1</span></li>`;
            if (page > 3) {
                liTag += `<li class="dots"><span>...</span></li>`;
            }
        }
    }

    if (totalPages!=3) {
        if (page == totalPages) {
            beforePage = beforePage - 2;
        } else if (page == totalPages - 1) {
            beforePage = beforePage - 1;
        }
    }

    if (page == 1) {
        afterPage = afterPage + 2;
    } else if (page == 2) {
        afterPage = afterPage + 1;
    }
    
    if(totalPages==2) {
        beforePage = 0;
        afterPage =2;
    }
    for (var plength = beforePage; plength <= afterPage; plength++) {
        if (plength > totalPages) {
            continue;
        }
        if (plength == 0) {
            plength = plength + 1;
        }
        if (page == plength) {
            active = "active";
        } else {
            active = "";
        }
        liTag += `<li class="number ${active}" data-page= "${plength}"><span>${plength}</span></li>`;
    }


    if ((totalPages!=4)&&page < totalPages - 2){
        if (page < totalPages - 2) {
            liTag += `<li class="dots"><span>...</span></li>`;
        }
        // liTag += `<li class="last number" data-page="${totalPages}"><span>${totalPages}</span></li>`;
        liTag += `<li class=" number" data-page="${totalPages}"><span>${totalPages}</span></li>`;
    }

    if (page < totalPages) {
        liTag += `<li class="btn next" ><span>Next <i class="fas fa-angle-right"></i></span></li>`;
    }
    element.innerHTML = liTag; 
    addPaginationEvent(element,totalPages);
    // return liTag; 
}

export const addPaginationEvent = (ulElem,totalPages) => {

   
    // active page
    ulElem.querySelectorAll(".btn").forEach(e => {
        e.addEventListener('click', (evt) => {
            const
                type = (evt.target.closest("li").classList.contains("prev")) ? -1 : 1,
                activePage = ulElem.querySelector(".number.active"),
                page = Number(activePage.dataset.page),
                newPage = page + type;
                console.log("utils");
            if (!(newPage < 1 || newPage > totalPages)) {
                createPagination(totalPages,newPage)
            }

        })
    })
    // active page
    ulElem.querySelectorAll(" li.number").forEach(e => {
        addPageNumberEvent(e,totalPages);
        
    })
}

export const addPageNumberEvent  = (e,totalPages) => {
    e.addEventListener('click',(evt) => {
        const page =  evt.target.closest("li.number").dataset.page*1;
        createPagination(totalPages,page);
        console.log("utils");
    })
}