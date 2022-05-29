import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import DragUploadFile from "/OrganicStore/static/admin/js/dragdrop.js"
export default class Product extends AbstractView {
    constructor(params) {
        super(params);
        this.getAsync();
        this.getHtml();
        this.DragUploadFile = new DragUploadFile();
    }

    getHtml() {
        this.mainElement.classList.add("d-none");
        this.mainElement.innerHTML = html ; 
        this.mainElement.insertAdjacentHTML("beforeend",modalHtml);
    }
    getAsync() {
        Promise.all([this.getCategory(),this,this.getProducts()])
        .then(([categories,products])=> {
            console.log({categories});
            console.log({products})
        })
    }
    getProducts() {
        return new Promise((resolve,reject)=>{
            fetch('http://localhost:8080/OrganicStore/api-product')
            .then(res=>res.json())
            .then(data=>{
                let tBody =  this.mainElement.querySelector('tbody');
                while(tBody.firstChild){
                    tBody.removeChild(tBody.firstChild);
                }
                for(const item of data) {
                    tBody.appendChild(this.elementFrom(this.getRowHTML({
                        id : item.id,
                        base64 : 'data:image/jpg;base64,'+ item.base64Images,
                        name : item.name,
                        category : item.category.name,
                        price : item.price,
                        mountInStock : item.in_stock,
                    })))
                }
                this.addListener();
                this.popupModal(document.querySelector('.modal.product'));
                this.mainElement.classList.remove("d-none");
                // console.log(data);
                resolve(data);
            }).catch(err=>reject(err)); 
        });  
    }
    getCategory() {
        return new Promise((resolve,reject)=>{
            fetch('http://localhost:8080/OrganicStore/api-category?type=child')
            .then(res=>res.json())
            .then(data=>{
                let cbCategory = document.querySelector('#category');
                while(cbCategory.firstChild){
                    cbCategory.removeChild(cbCategory.firstChild);
                }
                for(const item of data ) {
                    cbCategory.appendChild(this.elementFrom(`
                        <option value="${item.id}">${item.name}</option>
                    `))
                }
            })
        });
    }
    // Cho button Save và Add -> sau khi call api
    addListener() {
         
        let self = this,
            typeArr = ['Edit','Add','Delete'];

        document.querySelectorAll('.delete-prod').forEach(e=>{
            e.addEventListener('click',()=>{
                self.type = typeArr[2];

            })
        })
        
        document.querySelectorAll('.modal-toggle.edit').forEach(e=>{
            e.addEventListener('click',()=>{
                document.querySelector('#modal-btn').textContent = typeArr[0];
                self.type = typeArr[0];
            })
        })
        document.querySelectorAll('.modal-toggle.add').forEach(e=>{
            e.addEventListener('click',()=>{
                document.querySelector('#modal-btn').textContent = typeArr[1];
                self.type = typeArr[1];
            })
        })

        const form = document.querySelector('#form');
        form.addEventListener('submit',e=>{
            e.preventDefault();
            if(self.type =='Add') {
                if(document.querySelector('.drop-zone__input').files[0].type.startsWith('image')) {
                    self.AddProduct(form);
                }
            } else if(self.type == 'Edit') {
                self.UpdateProduct(form);
            }
        })
    }
    // Add product feature
    AddProduct(formElement) {
        const formData = new FormData(formElement);
        console.log([...formData.entries()]);
        fetch('http://localhost:8080/OrganicStore/api-product',{
            method :'POST',
            body : formData
        }).then(res=>res.json())
        .then(data=>{
            if(data.fail!=true) {
                this.mainElement.querySelector('tbody').appendChild(this.elementFrom(this.getRowHTML({
                    id : data.id,
                    base64 : 'data:image/jpg;base64,'+ data.base64Images,
                    name : data.name,
                    category : data.category.name,
                    price : data.price,
                    mountInStock : data.in_stock,
                })))
            }
            console.log(data);

        }).catch(err=>console.log(err));
    }
    getRowHTML(product) {
        let price = product.price.toLocaleString('vi-VN');
        return `
    <tr data-id="${product.id}">
        <td >
            <div class="prod-info">
                <img data-img class="prod-img" src="${product.base64}" alt="">
                <div class="prod-text">
                    <h5 data-name>${product.name}</h5>
                    <p data-category>${product.category}</p>
                </div>
            </div> 
        </td>
        <td class='prod-price'>${price}</td>
        <td class='mountInStock'>${product.mountInStock}</td>
        <td class='icon-wrapper'>
            <div class='icon-group'>
                <ion-icon class="modal-toggle edit " name="create-outline"  data-id="${product.id}"></ion-icon>
                <ion-icon class="edit delete-prod" name="close-outline" ></ion-icon>
            </div>           
            
        </td>

    </tr>
        ` ;
    }
    // End add product feature

    // Start Update Product feature
    UpdateProduct(form) {
        let hasFile =  document.querySelector('.drop-zone__input').files.length>0,
            fileIsImg = (hasFile)? document.querySelector('.drop-zone__input').files[0].type.startsWith('image') : false;
        
        if(hasFile && fileIsImg){
            const formData = new FormData(form);
            formData.append('id',form.dataset.id);
            this.callUpdateAPI(formData);
        } else {
            const payLoad = {
                id : form.dataset.id,
                name : form.querySelector('[name="name"]').value,
                description: form.querySelector('[name="description"]').value,
                in_stock: form.querySelector('[name="in_stock"]').value,
                categoryId: form.querySelector('[name="categoryId"]').value,
                price : form.querySelector('[name="price"]').value,
                saleOff: form.querySelector('[name="saleOff"]').value,
            }
            this.callUpdateAPI(JSON.stringify(payLoad));
        };
    }
    callUpdateAPI (payLoad) {
        fetch('http://localhost:8080/OrganicStore/api-product',{
            method :'PUT',
            body : payLoad
        }).then(res=>res.json())
        .then(data=>{
            if(data.fail!=true) {
                const row = this.mainElement.querySelector(`tr[data-id="${data.id}"]`);
                row.querySelector('[data-img]').setAttribute('src','data:image/jpg;base64,'+ data.base64Images);
                row.querySelector('[data-name]').textContent = data.name;
                row.querySelector('[data-category]').textContent = data.category.name;
                row.querySelector('.prod-price').textContent = data.price.toLocaleString('vi-VN');
                row.querySelector('.mountInStock').textContent = data.in_stock;
                
            }
            console.log(data);

        }).catch(err=>console.log(err));  
    }
    // End Update Product feature

    // Start Delete Product feature
    DeleteProduct() {
        
    }
    // End Delete Product feature
    
    // Start Modal Toggle Event
    popupModal(modal){
        document.querySelectorAll(".modal-toggle").forEach(elem =>{
            elem.addEventListener('click',(e)=>{
                if(e.target.matches('a.add')){
                    e.preventDefault();
                } else if(e.target.matches('.modal-toggle.edit')) {
                    document.querySelector('#form').setAttribute('data-id',e.target.dataset.id);
                    this.loadOneProduct(e.target.dataset.id);
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
    loadOneProduct(id) {
        fetch(`http://localhost:8080/OrganicStore/api-product?id=${id}`)
        .then(res=>res.json())
        .then(data=>{
            
            let productData = {
                "[name='name']" : data.name,
                "[name='categoryId']" : data.categoryId,
                "[name='price']" : data.price,
                "[name='in_stock']" : data.in_stock,
                "[name='saleOff']" : data.saleOff,
                "[name='description']" : data.description
            }
            this.updateModalContent(productData,data.base64Images);
            // console.log(data);


        }).catch(err=>console.log(err));  
    }
    updateModalContent(productData,base64Img) {
        let form = this.mainElement.querySelector('#form');
        for(const [key,value] of Object.entries(productData)) {
            form.querySelector(key).value = value;
        }
        let dropZoneElement = document.querySelector('.drop-zone'),
            thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

        if (dropZoneElement.querySelector(".drop-zone__prompt")) {
            dropZoneElement.querySelector(".drop-zone__prompt").remove();
        }
        
        if (thumbnailElement) {
            thumbnailElement.remove();
        }
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);

        thumbnailElement.style.backgroundImage = `url('data:image/jpeg;base64,${base64Img}')`;
        thumbnailElement.classList.add('unsetBg');
    }
     // end Modal Toggle Event
}

// component html
const html = `
<div class="data-table-wrapper " style="margin-top:80px;">
    <div class="data-table product">
        <div class="cardHeader">
            <h2>Bảng sản phẩm</h2>
            <a   href="#" class="btn modal-toggle add " >Add New</a>
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
<form id="form" class="modal product" >
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
                <input  id="name" type="text" class="modal-input" name="name" placeholder="Nhập tên sản phẩm">

            </div>
            
            <div class="modal-break--row"></div>
            <div class="modal-input-group modal-category">
                <label for="category" class="modal-label">
                    Thể loại
                </label>
                <select id="category" class="modal-input" name="categoryId" id="">
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
                <input  id="price" type="text" class="modal-input" name="price" placeholder="Nhập đơn giá">

            </div>
            <div class="modal-break--row"></div>
            <div class="modal-input-group ">
                <label for="tagLine" class="modal-label">
                    Giảm giá
                </label>
                <input  id="saleOff" type="text" class="modal-input" name="saleOff" placeholder="Giảm bao nhiêu phần trăm">
            </div>
            <div class="modal-input-group instock">
                <label for="instock" class="modal-label">
                    Số lượng
                </label>
                <input  id="instock" name="in_stock" type="number" class="modal-input" min="0" value="1">
            </div>
            <div class="modal-break--row"></div>

            <div class="modal-image-box ">
                <label for="" class="modal-label">
                    Ảnh sản phẩm
                </label>
                <div class="drop-zone modal-input-group">
                    <span class="drop-zone__prompt">Thả vào đây hoặc click để upload</span>
                    <input type="file" name="image" class="drop-zone__input">
                </div>
            </div>

            <div class="modal-input-group ">
                <label for="description" class="modal-label">
                    Mô tả
                </label>
                <textarea class="modal-textarea" name="description" id="description" rows="10"></textarea>
            </div>

        </div>
        <div class="modal-footer modal-toggle" >
            <button type="submit" id="modal-btn">
                Save
            </button>
        </div>
    </div>
</form>    
`;

{/* <input type="file" name="myFile " class="drop-zone__input"></input> */}