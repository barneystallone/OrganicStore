import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import TableUtil from "/OrganicStore/static/admin/js/utils.js";
import {AddAreaEventListener,initArea} from "/OrganicStore/static/common/AreaUtils.js";
// import DragUploadFile from "/OrganicStore/static/admin/js/dragdrop.js";
export default class Customer extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Customer");
        this.modal =   `
        <div class="modal">
        <div class="modal-container">
            <div class="modal-close modal-toggle" >
                <i class="fa-solid fa-xmark"></i>
            </div>
            <header class="modal-header">
                <i class="modal-heading-icon fa-solid fa-user"></i>
                Thông tin khách hàng #12
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
                    <input id="houseStreet" type="text" class="modal-input" placeholder="Nhập số nhà và tên đường" name="email">

                </div>
                <div class="modal-break--row"></div>
                <div class="modal-input-group ">
                    <label for="city" class="modal-label">
                        Tỉnh / Thành phố
                    </label>
                    <select id="city" class="modal-input" name="" id="">
                    </select>
                </div>
                <div class="modal-input-group ">
                    <label for="district" class="modal-label">
                        Quận / Huyện
                    </label>
                    <select id="district" class="modal-input" name="" id="">
                    </select>
                </div>
                
                <div class="modal-break--row"></div>
                <div class="modal-input-group ">
                    <label for="subDistrict" class="modal-label">
                        Xã / Phường
                    </label>
                    <select id="subDistrict" class="modal-input" name="" id="">
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
        `;
    }
    popupModal(modal){
        document.querySelectorAll(".modal-toggle").forEach(elem =>{
            elem.addEventListener('click',e=>{
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
    getHtml(elem){
        const pageUrl =  new URL(window.location.href);
        const url =  new URL("http://localhost:8080/OrganicStore/api-customer-admin?limit=3");
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
                        <td style="width:80px;">${row.phoneNumber}</td>
                        <td>${row.houseStreet}, ${row.subDistrict}, ${row.district}, ${row.city}</td>
                        <td class="edit"><a  class="modal-toggle">Details</a></td>
                    </tr>
                `
            }).join("");
            let content = ` 
            <div class="data-table-wrapper " style="margin-top:70px;">
                <div class="data-table">
                    <div class="cardHeader">
                        <h2>Customer</h2>
                        <a href="#" class="btn">View All</a>
                    </div>
                    <table id="customerTable" class=" table table-sortable ">
                        <thead>
                            <th class="table-id">ID</th>
                            <th>Name</th>
                            <th  style="width:80px;">Phone</th>
                            <th>Address</th>
                            <td>Status</td>
                        </thead>
                        <tbody>`
                            + rowHtml
                    +  `</tbody>
                    </table>
                </div>
            </div>`
            elem.insertAdjacentHTML("afterbegin",content) ; 
            // elem.innerHTML= content ; 
            // elem.insertAdjacentHTML("beforeend",this.modal);
            // DragUploadFile.setUpDropZone();
            TableUtil.addClickEventToSort();
            const cityElem = document.querySelector("#city");
            const districtElem = document.querySelector("#district");
            const subDistrictElem = document.querySelector("#subDistrict");
            initArea(cityElem,districtElem,subDistrictElem);
            AddAreaEventListener(districtElem,subDistrictElem);
            this.popupModal(document.querySelector(".modal"));
            
        }).catch(error => console.log(error));
    }
    
    getScript(){
        document.querySelector(".main").innerHTML=this.modal;
        
    }
}