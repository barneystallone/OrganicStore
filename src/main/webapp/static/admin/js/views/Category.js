import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import {initPagination,AddPaginationEvent} from "/OrganicStore/static/common/utils.js";
import SelectCustom from "/OrganicStore/static/admin/js/customSelect.js";
export default class Category extends AbstractView{
    constructor(params) {
        super(params);
        this.SelectCustom = new SelectCustom();
        this.setTitle("Category");
        this.itemPerPage = 7;
        this.getAsync();
        this.getHtml();
        this.getScript();
    }

    addRowListener(row,modal){
        let editBtn = row.querySelector('[name="create-outline"]');
        editBtn.addEventListener('click',()=>{
            if(modal.classList.contains("active")==false){
                modal.style.opacity = 1;
                modal.classList.toggle("active");
            }
            modal.setAttribute('data-id',row.dataset.id);
            modal.setAttribute('data-old_parent_id',row.dataset.parentid);
            modal.querySelector('#editCateName').value = row.dataset.name;
            modal.querySelector('.modal-header span').textContent = `#${row.dataset.id}`;
            modal.querySelector('#superCate').value = row.dataset.parentid;
        })
        row.querySelector('.delete-prod').addEventListener('click',(e)=>{
            this.DeleteCategory(e.target.closest('tr'));
        })
    }

    addModalListener(modal){
        modal.querySelectorAll('.modal-toggle').forEach(elem=>{
            elem.addEventListener('click',(e)=>{
                if (e.target.closest('#modal-btn')) {
                    const newParentID = modal.querySelector('#superCate').value;
                    if(modal.dataset.old_parent_id==0 &&newParentID!=0) {
                        alert("Không thể sửa danh mục lớn");
                    } else {
                        let payLoad = {
                            id: modal.dataset.id,
                            name: document.querySelector('#editCateName').value,
                            parent_id:  newParentID
                        }
                        this.updateCategory(payLoad);
                    }
                }
                if(modal.classList.contains("active")){
                    modal.style.opacity = 0;
                    setTimeout(()=>{
                        modal.classList.toggle("active");
                    },300)
                }
            })
        })
    }

    updateCategory(payLoad) { 
        fetch(`http://localhost:8080/OrganicStore/api-category`,{
            method : "PUT",
            body : JSON.stringify(payLoad)
        }).then(res=>res.json())
        .then(data=>{
            const rowEdit = document.querySelector(`tr[data-id="${payLoad.id}"]`);
            rowEdit.dataset.name = data.name;
            rowEdit.dataset.parent_id = data.parent_id;
            rowEdit.querySelector('h5').textContent = data.name;
            
            let tBody = rowEdit.closest('tbody');
            let offset = Array.prototype.indexOf.call(tBody.children,rowEdit),
                index = offset + (document.querySelector('li.number.active').dataset.page -1 )*this.itemPerPage;
            
            this.categoryData[index] = data;
        })
    }

    updateTable(start, end){
        const arr = this.categoryData.slice(start, end);
            let html = arr.map(row => {
                return `
                    <tr data-parentID="${row.parent_id}" data-id="${row.id}" data-name="${row.name}">
                        <td class="d-none" ></td>
                        <td > 
                            <h5>${row.name}</h5>
                        </td>
                        <td class="d-none" ></td>
                        <td class='icon-wrapper'>
                            <div class='icon-group'>
                                <ion-icon class="edit " name="create-outline" ></ion-icon>
                                <ion-icon class="edit delete-prod" name="close-outline" ></ion-icon>
                            </div>           
                        </td>
                       <!-- <td class="edit"><ion-icon name="create-outline" ></ion-icon></td> -->
                    </tr>
                `
            }).join("");
        document.querySelector("tbody").innerHTML = html;
        let modal = document.querySelector('.modal');
        [...document.querySelector('tbody').children].forEach(e=> this.addRowListener(e,modal));
    }
    loadSelectCustom(selectTag) {
        let optionContainer = document.querySelector('.options-container');
        let superCategory  = this.categoryData.filter(e=>e.parent_id==0); 
        // let selectTag = document.querySelector('#selectCat');
        selectTag.appendChild(this.elementFrom(`
            <option value="0">--- Danh mục lớn</option>
        `))
        // select add category
        const select_add = (e) => {
            selectTag.appendChild(this.elementFrom(`
                <option value="${e.id}">${e.name}</option>
            `))
        }
        // select filter table
        if(optionContainer.childElementCount==1){
            superCategory.forEach(e=>{
                let config = {
                    id : 'id'+e.id,
                    name : 'category',
                    "data-id" : e.id,
                    "data-value" : e.name, 
                }
                optionContainer.appendChild(this.SelectCustom.creatOptionTag(config));
                select_add(e);
            })
           this.SelectCustom.AddListener(); 
        } else {
            superCategory.forEach(e=>select_add(e));
        }
    }

    getTotalItem(){ 
        return new Promise((resolve,reject)=>{
            console.time('t');
            const url = "http://localhost:8080/OrganicStore/api-category?count";
            fetch(url,{method: 'GET'})
            .then(res=>res.json())
            .then(data=>resolve(data.count))
            .catch(err=>reject(err));
        })
    }
    // refactor async
    getCategories(){
        return new Promise((resolve,reject)=>{
            const url = "http://localhost:8080/OrganicStore/api-category";
            fetch(url,{method:'GET'})
            .then(res=>res.json())
            .then(data=>resolve(data))
            .catch(err => reject(err));
        })
    }
    getAsync () {
        const loadCategory = fetch("http://localhost:8080/OrganicStore/api-category");
        const loadTotalItem = fetch("http://localhost:8080/OrganicStore/api-category?count");
        Promise.all([loadCategory, loadTotalItem])
        .then(values=>{
            return Promise.all(values.map(value=>value.json()));
        })
        .then(([data,dataCount])=> {
            this.totalItem = dataCount.count;
            this.categoryData = data
            
            initPagination(this.totalItem,this.itemPerPage);
            AddPaginationEvent(this.totalItem,this.itemPerPage);
            this.updateTable(0, this.itemPerPage);
            
            [document.querySelector('#selectCat'),document.querySelector('#superCate')].forEach(e=>this.loadSelectCustom(e));
            this.mainElement.classList.remove("d-none");
        });

    }

    getHtml() {
        this.mainElement.classList.add("d-none");
        this.mainElement.innerHTML =`
        <div class="wrapper category">
            <div  class="form category">
                <div class="form-container ">
                    
                    <header class="form-header">
                        <i class="form-heading-icon fa-solid fa-face-laugh"></i>
                        Thêm mới danh mục
                    </header>
                    <div class="form-body ">
                        <label for="cateName">Tên danh mục</label>
                        <input id="cateName" name="name" type="text" class="form-input" placeholder="Nhập tên danh mục" required>
                    </div>
                    <div class="form-body ">
                        <label for="selectCat">Thuộc danh mục </label>
                        <select id="selectCat"  class="form-input" name="superCategory" >

                        </select>
                    </div>
                    
                    
                    <div class="form-footer"  >
                        <button id="form-btn" type="submit">
                            Thêm mới 
                        </button>
                    </div>
                </div>
            </div>
            <div class="data-table-wrapper " style="margin-top:80px;">
                <div class="data-table"> 
                    <div class="cardHeader">
                        <h2>Category</h2>
                    </div>
                    
                    <table class=" table table-sortable " >
                        <thead>
                            <td class="d-none">ID</td>
                            <td>Name</td>
                            <td class="d-none" >Parent ID</td>
                            <td class="edit">Status</td>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div class="pagination">
                        <ul>
                        </ul>
                    </div>
                </div>
            </div>
        
        </div>
        `;
        this.mainElement.insertAdjacentHTML("beforeend",modalCategory);
        this.addModalListener(this.mainElement.querySelector('.modal'));
        document.querySelector('.cardHeader').insertAdjacentHTML('beforeend',this.SelectCustom.elements.selectHtml);
        this.addCreateButtonEvent();
    }
    getScript(){
        document.querySelector(".pagination").addEventListener('click',()=>{
            const 
                page = Number(document.querySelector(".number.active").dataset.page),
                start = (page - 1) * this.itemPerPage,
                end = Math.min(start+ this.itemPerPage, this.totalItem);
            this.updateTable(start, end);
        })
           
    }
    addCreateButtonEvent() {
        let self = this;
        document.querySelector('#form-btn').addEventListener('click',e=>{
            const name = e.target.closest('.form-container').querySelector('#cateName').value;
            if(name=="") {
                alert('Chưa nhập tên danh mục');
            } else {
                let payLoad = {
                    name :  name,
                    parent_id : e.target.closest('.form-container').querySelector('#selectCat').value
                }
                self.addCategory(payLoad)
            }
        })
    }
    addCategory(payLoad) {
        fetch('http://localhost:8080/OrganicStore/api-category',{
            method : 'POST',
            body : JSON.stringify(payLoad)
        }).then(res=>res.json())
        .then(data=>{
            if(data.id> 0) {
                // location.pathname = location.pathname;
                document.querySelector('a[href="/OrganicStore/admin/category"]').click();
                
            } else {
                alert("Thêm sản phẩm thất bại");
            }
        })
    }
    //
    DeleteCategory(row) {
        let payLoad = {
            id : row.dataset.id,
        }
        fetch('http://localhost:8080/OrganicStore/api-category',{
            method : 'DELETE',
            body : JSON.stringify(payLoad)
        }).then(res=>res.json())
        .then(data=>{
            if(data.success!=null) {
                let tBody = row.closest('tbody');
                let offset = Array.prototype.indexOf.call(tBody.children,row),
                    activePage = document.querySelector('li.number.active'),
                    index = offset + (activePage.dataset.page -1 )*this.itemPerPage;
                this.categoryData.splice(index,1);
                activePage.click();
            } else if (data.message!=null) {
                alert(data.message);
            } 
        })
    }

}

const modalCategory = `
<div  class="modal ">
    <div class="modal-container  category-modal ">
        <div class="modal-close modal-toggle" >
            <i class="fa-solid fa-xmark"></i>
        </div>
        <header class="modal-header">
            <i class="modal-heading-icon fa-solid fa-face-laugh"></i>
            Sửa danh mục <span></span>
        </header>
        
        <div class="modal-body ">
            <label for="editCateName">Tên danh mục</label>
            <input id="editCateName" name="name" type="text" class="modal-input" placeholder="Nhập tên danh mục" required>
        </div>
        <div class="modal-body ">
            <label for="superCate">Chọn danh mục cha (Tùy chọn)</label>
            <select id="superCate"  class="modal-input" ></select>
        </div>

        <div class="modal-footer" >
            <button id="modal-btn" type="button" class="modal-toggle">
                Lưu
            </button>
        </div>
    </div>
</div>
`;
// 

