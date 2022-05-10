import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import TableUtil from "/OrganicStore/static/admin/js/utils.js";
export default class Customer extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Customer");
    }
    createTable() {
        const html = `
            <div class="data-table-wrapper ">
                <div class="data-table">
                    <div class="cardHeader">
                        <h2>Customer</h2>
                        <a href="#" class="btn">View All</a>
                    </div>
                    <table id="customerTable" class=" table table-sortable ">
                        <thead>
                            <td>ID</td>
                            <td>Name</td>
                            <td>PhoneNumber</td>
                            <td>Address</td>
                            <td>Status</td>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        `;
        document.querySelector(".main").innerHTML(html);      
    }
 	static loadIntoTable(url, tableElem) {
        const tBody = tableElem.querySelector("tbody");  
        fetch(url , {method: 'GET'})
        .then(res => res.json())
        .then(rowsData => {
            const rowHtml = rowsData
            .map(row => {
                return `
                    <tr>
                        <td>${row.id}</td>
                        <td> 
                            <h5>${row.name}</h5>
                            <p>${row.email}</p>
                        </td>
                        <td>${row.phoneNumber}</td>
                        <td>${row.houseStreet}, ${row.subDistrict}, ${row.district}, ${row.city}</td>
                        <td class="edit"><a href="#">Details</a></td>
                    </tr>
                `
            }).join("");

            tBody.insertAdjacentHTML("afterbegin",rowHtml) ; 
        }).catch(error => console.log(error));
	}
    getHtml(){
        return `
        	<div class="data-table-wrapper ">
                <div class="data-table">
                    <div class="cardHeader">
                        <h2>Customer</h2>
                        <a href="#" class="btn">View All</a>
                    </div>
                    <table id="customerTable" class=" table table-sortable ">
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>PhoneNumber</th>
                            <th>Address</th>
                            <td>Status</td>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        `
    }

    getScript(){
        const pageUrl =  new URL(window.location.href);
        const apiUrl =  new URL("http://localhost:8080/OrganicStore/api-customer-admin?limit=3");
        apiUrl.searchParams.set("limit",pageUrl.searchParams.get("limit"));
        apiUrl.searchParams.set("offset",pageUrl.searchParams.get("offset"));
		Customer.loadIntoTable(apiUrl , document.querySelector("#customerTable"));
		TableUtil.addClickEventToSort();
    }
}