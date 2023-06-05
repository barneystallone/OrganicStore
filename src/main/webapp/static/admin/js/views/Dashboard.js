import { myChart, config, config2 } from "/OrganicStore/static/admin/js/myChart.js";
import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
// import TableUtil from "/OrganicStore/static/admin/js/utils.js";
import {AddSortByClickEvent} from "/OrganicStore/static/common/utils.js";
export default class Dashboard extends AbstractView {
	constructor(params) {
		super(params);
		this.setTitle("Dashboard");
        // this.createTable();
        this.getHtml();
        this.getScript();
	}
    
	createTable() {
        const html =
        `
            <div class="data-table-wrapper " >
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
                            <th>Status</th>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        `;
        document.querySelector(".main").innerHTML(html);      
    }
 	loadIntoTable(url, tableElem) {
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
	getHtml() {
		let content = `
        <div class="cardBox">
            <div class="card">
                <div>
                    <div class="numbers">1,504</div>
                    <div class="cardName">Daily Views</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="eye-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="numbers">80</div>
                    <div class="cardName">Sales</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="cart-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="numbers">244</div>
                    <div class="cardName">Comments</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="chatbubbles-outline"></ion-icon>
                </div>
            </div>
            <div class="card">
                <div>
                    <div class="numbers">$8,504</div>
                    <div class="cardName">Earning</div>
                </div>
                <div class="iconBx">
                    <ion-icon name="cash-outline"></ion-icon>
                </div>
            </div>
        </div>

        <!-- Add chart  -->
        <div class="graphBox">
            <div class="box-wrapper">
                <canvas id="myPolarChart"></canvas>
            </div>
            <div class="box-wrapper">
                <canvas id="myBarChart"></canvas>
            </div>
        </div>
        <!-- End chart -->

        
        `;
        this.mainElement.innerHTML= content ; 
        // TableUtil.addClickEventToSort();
        AddSortByClickEvent();
       

	}
	getScript() {
        myChart.drawChart(config);
        myChart.drawChart(config2);	
        fetch("http://localhost:8080/OrganicStore/api-user-admin?getUser=true",{
            method:"Get"
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            window.setCookie(`personName`,data.name,1)  ;
            window.setCookie(`customerId`,data.id,1)  ;
        })
	}
}


