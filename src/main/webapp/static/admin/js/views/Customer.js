import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import {AddSortByClickEvent} from "/OrganicStore/static/common/utils.js";
import {AddAreaEventListener,initArea} from "/OrganicStore/static/common/AreaUtils.js";

export default class Customer extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Customer");
        this.modal =   `
        <div data-page='customer'>
        <div class="modal">
        <div class="modal-container">
            <p class="d-none" id="cId" name="id"></p>
            <div class="modal-close modal-toggle" >
                <i class="fa-solid fa-xmark"></i>
            </div>
            <header class="modal-header">
                <i class="modal-heading-icon fa-solid fa-user"></i>
                Thông tin khách hàng <span>#12</span>
            </header>
            <div class="modal-body">
                <div class="modal-input-group">
                    <label for="name" class="modal-label">
                       Họ tên
                    </label>
                    <input id="name" name="name" type="text" class="modal-input" placeholder="Nhập họ tên">

                </div>
                <div class="modal-input-group">
                    <label for="email" class="modal-label">
                       Email
                    </label>
                    <input id="email" type="text" class="modal-input" placeholder="Nhập email" name="email">

                </div>
                <div class="modal-break--row"></div>
                <div class="modal-input-group">
                    <label for="houseStreet" class="modal-label">
                       Số nhà, tên đường
                    </label>
                    <input id="houseStreet" type="text" class="modal-input" placeholder="Nhập số nhà và tên đường" name="houseStreet">

                </div>
                <div class="modal-break--row"></div>
                <div class="modal-input-group">
                    <label for="city" class="modal-label">
                        Tỉnh / Thành phố
                    </label>
                    <select id="city" class="modal-input" name="" >
                    </select>
                </div>
                <div class="modal-input-group">
                    <label for="district" class="modal-label">
                        Quận / Huyện
                    </label>
                    <select id="district" class="modal-input" name="" >
                    </select>
                </div>
                
                <div class="modal-break--row"></div>
                <div class="modal-input-group">
                    <label for="subDistrict" class="modal-label">
                        Xã / Phường
                    </label>
                    <select id="subDistrict" class="modal-input" name="areaId" >
                    </select>
                </div>

                <div class="modal-input-group phoneNumber">
                    <label for="phoneNumber" class="modal-label">
                        Số điện thoại
                    </label>
                    <input id="phoneNumber" type="text" class="modal-input" placeholder="Nhập số điện thoại">
                </div>

            </div>
            <div class="modal-footer modal-toggle"  >
                <button id="modal-btn">
                    Save
                </button>
            </div>
        </div>
    </div>
    </div>
        `;
    }

    popupModal(modal){
        
        document.querySelectorAll(".modal-toggle").forEach(elem =>{
            elem.addEventListener('click',()=>{
                if(modal.classList.contains("active")){
                    modal.style.opacity = 0;
                    setTimeout(()=>{
                        modal.classList.toggle("active");
                    },300)
                }
                else{
                    modal.style.opacity = 1;
                    modal.classList.toggle("active");
                }
            })
        });
    }

    AddEventListener(){
        
        const subDistrictElem = document.querySelector("#subDistrict");
        const districtElem = document.querySelector("#district");
        const cityElem = document.querySelector("#city");

        initArea(cityElem,districtElem,subDistrictElem);

        const nameElem = document.querySelector("#name");
        const emailElem = document.querySelector("#email");
        const houseStreetElem = document.querySelector("#houseStreet");
        const phoneNumberElem = document.querySelector("#phoneNumber");
        const idElem = document.querySelector("#cId");
        const flatten = arr => [].concat(...arr);
        const saveELem = document.querySelector("#modal-btn");

        // fetch data -> modal
        document.querySelectorAll(".edit").forEach(elem=>{            
            elem.addEventListener('click',e=>{
                const id = Number(elem.dataset.id);
                const url = `http://localhost:8080/OrganicStore/api-customer?id=${id}`;
                fetch(url)
                    .then ( res => res.json())
                    .then (data => {
                        document.querySelector(".modal-header span").innerText = `#${data.id}`;
                        nameElem.value = data.name;
                        emailElem.value = data.email;
                        houseStreetElem.value = data.houseStreet;
                        phoneNumberElem.value = data.phoneNumber;
                        idElem.innerText = `${data.id}`;
                        const subSelected = subDistrictElem.querySelector(`option[value='${data.areaId}']`);
                        subSelected.selected = true;;
                        districtElem.querySelector(`option[value="${subSelected.getAttribute("districtIndex")}"]`).selected = true;
                    })
            })

        })

        // Edit customer , update row table
        saveELem.addEventListener('click',e => {
            e.preventDefault();     // button type default = submit
            const payLoad = {
                id : Number(idElem.innerText),
                name : nameElem.value,
                email: emailElem.value,
                phoneNumber : phoneNumberElem.value,
                houseStreet : houseStreetElem.value,
                areaId : Number(subDistrictElem.value)
            }

            fetch("http://localhost:8080/OrganicStore/api-customer",{
                method: "PUT",
                body  : JSON.stringify(payLoad)    
            })
            .then(res => res.json())
            .then(data => {
                const rowData = document.querySelector(`td[data-id='${data.id}']`).closest("tr");
                const cellSet = [...rowData.children];
                const updataSet = flatten([[...cellSet[1].children],cellSet[2],cellSet[3]]);
                const dataValues = [data.name, data.email, data.phoneNumber,
                    `${data.houseStreet}, ${data.subDistrict}, ${data.district}, ${data.city}`]
                
                updataSet.map((e,index)=>e.innerText=dataValues[index]);
            })

        })

        AddAreaEventListener(districtElem,subDistrictElem);
        this.popupModal(document.querySelector(".modal"));

    }

    getHtml(elem){
        elem.classList.add("d-none");
        const pageUrl =  new URL(window.location.href);
        const url =  new URL("http://localhost:8080/OrganicStore/api-customer?limit=3");
        url.searchParams.set("limit",pageUrl.searchParams.get("limit"));
        url.searchParams.set("offset",pageUrl.searchParams.get("offset"));
        fetch(url , {method: 'GET'})
        .then(res => res.json())
        .then(rowsData => {
            const rowHtml = rowsData
            .map(row => {
                return `
                    <tr>
                        <td class="table-id">${row.id}</td>
                        <td> 
                            <h5>${row.name}</h5>
                            <p>${row.email}</p>
                        </td>
                        <td style="width:70px;">${row.phoneNumber}</td>
                        <td>${row.houseStreet}, ${row.subDistrict}, ${row.district}, ${row.city}</td>
                        <td data-id="${row.id}" class="edit modal-toggle"><a >Details</a></td>
                    </tr>
                `
            }).join("");
            let content = ` 
            <div class="data-table-wrapper " style="margin-top:80px;">
                <div class="data-table">
                    <div class="cardHeader">
                        <h2>Customer</h2>
                        <a href="#" class="btn">View All</a>
                    </div>
                    <table id="customerTable" class=" table table-sortable ">
                        <thead>
                            <th class="table-id">ID</th>
                            <th >Name</th>
                            <th  style="width:70px;">Phone</th>
                            <th>Address</th>
                            <td>Status</td>
                        </thead>
                        <tbody>`
                            + rowHtml
                    +  `</tbody>
                    </table>
                </div>
            </div>`
            elem.firstElementChild.insertAdjacentHTML("afterbegin",content) ; 
            elem.classList.remove("d-none");
            AddSortByClickEvent();

            
            this.AddEventListener();

            
           
            
        }).catch(error => console.log(error));
    }
    
    getScript(){
        document.querySelector(".main").innerHTML=this.modal;
    }
}