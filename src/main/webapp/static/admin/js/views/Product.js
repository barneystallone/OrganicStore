import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import DragUploadFile from "/OrganicStore/static/admin/js/dragdrop.js"
export default class Product extends AbstractView {
    constructor(params) {
        super(params);
        this.getProducts();
        this.getHtml();
        this.DragUploadFile = new DragUploadFile();
    }

    popupModal(modal){
        
        document.querySelectorAll(".modal-toggle").forEach(elem =>{
            elem.addEventListener('click',(e)=>{
                if(e.target.matches('a')){
                    e.preventDefault();
                }
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

    getHtml() {
        this.mainElement.classList.add("d-none");
        this.mainElement.innerHTML = html ; 
        this.mainElement.insertAdjacentHTML("beforeend",modalHtml);
    }
    getProducts() {
        fetch('http://localhost:8080/OrganicStore/api-product')
        .then(res=>res.json())
        .then(data=>{
            let tBody =  this.mainElement.querySelector('tbody');
            while(tBody.firstChild){
                tBody.removeChild(tBody.firstChild);
            }
            for(const item of data) {
                tBody.appendChild(this.elementFrom(this.getRowHTML({
                    base64 : 'data:image/jpg;base64,'+ item.base64Images,
                    name : item.name,
                    category : item.category.name,
                    price : item.price,
                    mountInStock : item.in_stock,
                })))
            }
            this.popupModal(document.querySelector('.modal.product'));
            this.mainElement.classList.remove("d-none");
            console.log(data);
        })
    }
    getRowHTML(options) {
        let price = options.price.toLocaleString('vi-VN');
        return `
    <tr>
        <td >
            <div class="prod-info">
                <img class="prod-img" src="${options.base64}" alt="">
                <div class="prod-text">
                    <h5>${options.name}</h5>
                    <p>${options.category}</p>
                </div>
            </div> 
        </td>
        <td class='prod-price'>${price}</td>
        <td class='mountInStock'>${options.mountInStock}</td>
        <td class='icon-wrapper'>
            <div class='icon-group'>
                <ion-icon class="modal-toggle edit " name="create-outline" ></ion-icon>
                <ion-icon class="edit " name="close-outline" ></ion-icon>
            </div>           
            
        </td>

    </tr>
        ` ;
    }
}

//
{/* <div>
        <img class="prod-img"src=" alt="">
    </div> */}
let prod = `
<td >
    <div class="prod-info">
        <img class="prod-img"src=" alt="">
        <div class="prod-text">
            <h5>aaaaaaaaaaaaaaaa</h5>
            <p>aaaa</p>
        </div>
    </div>
    
</td>
<td class='prod-price'>aaaa</td>
<td class='mountInStock'>aaaaaaa</td>
<td class="edit"><ion-icon name="create-outline" ></ion-icon></td>
` ;
//
const html = `
<div class="data-table-wrapper " style="margin-top:80px;">
    <div class="data-table product">
        <div class="cardHeader">
            <h2>Bảng sản phẩm</h2>
            <a   href="#" class="btn modal-toggle">Add New</a>
        </div>
        <table id="customerTable" class=" table table-sortable ">
            <thead>
                <th class="table-id">ID</th>
                <th >Info</th>
                <th >Price</th>
                <th>In Stock</th>
                <td></td>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</div>
`;


const modalHtml = `
<div class="modal product">
    <div class="modal-container">
        <div class="modal-close modal-toggle">
            <i class="fa-solid fa-xmark"></i>
        </div>
        <header class="modal-header">
            <i class="modal-heading-icon fa-solid fa-suitcase"></i>
            Product
        </header>
        <div class="modal-body">
            <div class="modal-input-group">
                <label for="name" class="modal-label">
                    Tên sản phẩm
                </label>
                <input id="name" type="text" class="modal-input" placeholder="Nhập tên sản phẩm">

            </div>
            
            <div class="modal-break--row"></div>
            <div class="modal-input-group modal-category">
                <label for="category" class="modal-label">
                    Thể loại
                </label>
                <select id="category" class="modal-input" name="" id="">
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                    <option value="">1</option>
                </select>
            </div>
            <!-- <div class="modal-input-group">
                <label for="shelf_life" class="modal-label">
                    Hạn sử dụng
                </label>
                <input id="shelf_life" type="text" class="modal-input" placeholder="Mấy tháng??">

            </div> -->
            <div class="modal-input-group price">
                <label for="price" class="modal-label">
                    Giá cả
                </label>
                <input id="price" type="text" class="modal-input" placeholder="Nhập đơn giá">

            </div>
            <div class="modal-break--row"></div>
            <div class="modal-input-group ">
                <label for="tagLine" class="modal-label">
                    Giảm giá
                </label>
                <input id="tagLine" type="text" class="modal-input" placeholder="Giảm bao nhiêu phần trăm">
            </div>
            <div class="modal-input-group instock">
                <label for="instock" class="modal-label">
                    Số lượng
                </label>
                <input id="instock" type="number" class="modal-input" min="0" value="1">
            </div>
            <div class="modal-break--row"></div>

            <div class="modal-image-box ">
                <label for="" class="modal-label">
                    Ảnh sản phẩm
                </label>
                <div class="drop-zone modal-input-group">
                    <span class="drop-zone__prompt">Thả vào đây hoặc click để upload</span>
                    <input type="file" name="myFile" class="drop-zone__input">
                </div>
            </div>

            <div class="modal-input-group ">
                <label for="description" class="modal-label">
                    Mô tả
                </label>
                <textarea class="modal-textarea" name="" id="description" rows="10"></textarea>
            </div>

        </div>
        <div class="modal-footer modal-toggle" >
            <button id="modal-btn">
                Save
            </button>
        </div>
    </div>
</div>    
`;