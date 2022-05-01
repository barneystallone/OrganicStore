/**
 * Sort HTML Table
 * 
 * @param {table}  table The table to sort
 * @param {column} column The index of the column to sort
 * @param {asc} asc default asc sorting
 * @param {options} options Options is object  {type :"th"} or {type:"td"}
 */

function sortTableByColumn (table, column, asc = true, options = {type : 'td'}) {
    
    // thead td or thead th
    const colTag = options.type
    const typeSort = asc ? 1 : -1;
    const tbody = table.tBodies[0];
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const sortedRows = rows.sort((a,b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1})`).textContent.trim();
        
        const tmp = aColText < bColText ? (-1 * typeSort) : 0 ;
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
        td.classList.remove('th-sort-asc','th-sort-desc');
    })

    if (asc) {
        table.querySelector(`thead tr ${colTag}:nth-child(${column +1 })`).classList.add('th-sort-asc');
    } else {
        table.querySelector(`thead tr ${colTag}:nth-child(${column +1 })`).classList.add('th-sort-desc')
    }

    // table.querySelector(`thead tr td:nth-child(${column +1 })`).classList.toggle('th-sort-asc', asc);
    // table.querySelector(`thead tr td:nth-child(${column +1 })`).classList.toggle('th-sort-desc', !asc);
}

// Add Click Event
document.querySelectorAll('.table-sortable thead tr td').forEach ( headerCell => {
    headerCell.addEventListener('click',() => {
        // Lấy ra tableElement , td->tr->thead->table
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        // Lấy ra index của column
        // truyền vào hàm indexOf collections là  tr.children 
        const index = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAsc = headerCell.classList.contains('th-sort-asc');

        // asc -> desc
        sortTableByColumn(tableElement,index,!currentIsAsc)
    });
});

document.querySelectorAll('.table-sortable th').forEach ( headerCell => {
    headerCell.addEventListener('click',() => {
        // get tableElement , td->tr->thead->table
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        // get column index 
        const index = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAsc = headerCell.classList.contains('th-sort-asc');

        // asc -> desc
        sortTableByColumn(tableElement,index,!currentIsAsc,{type : 'th'});
    });
});

// MenuToggle
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');
let topbar = document.querySelector('.topbar');

toggle.onclick = function () {
    navigation.classList.toggle('active')
    main.classList.toggle('active')
    topbar.classList.toggle('active')
}
// add hovered class
let list = document.querySelectorAll('.navigation li');
function activeLink() {
    list.forEach((item) => item.classList.remove('hovered'));
    this.classList.add('hovered');
}

list.forEach((item) => 
    item.addEventListener('click', activeLink));