import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import {initPagination,AddPaginationEvent} from "/OrganicStore/static/common/utils.js";

export default class Category extends AbstractView{
    constructor(params) {
        super(params);
        this.setTitle("Category");
        this.itemPerPage = 9;
        this.getAsync();
        this.getHtml();
        this.getScript();
    }
    updateTableCategory(start, end){
        const arr = this.categoryData.slice(start, end);
            let html = arr.map(row => {
                return `
                            <tr>
                                <td class="d-none" data-id="${row.id}"></td>
                                <td > 
                                    <h5>${row.name}</h5>
                                </td>
                                <td class="d-none" data-parenID="${row.parent_id}"></td>
                                <td class="edit"><ion-icon name="create-outline" ></ion-icon></td>
                            </tr>
                        `
            }).join("");
        document.querySelector("tbody").innerHTML = html;
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
            this.updateTableCategory(0, this.itemPerPage);
            this.mainElement.classList.remove("d-none");
        });

    }

    getHtml() {
        this.mainElement.classList.add("d-none");
        this.mainElement.innerHTML =`
        <div class="wrapper">
            <div class="column">
                <div class="data-table-wrapper " style="margin-top:80px;">
                    <div class="data-table"> 
                        <div class="cardHeader">
                            <h2>Customer</h2>
                            <a href="#" class="btn">View All</a>
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
        </div>
        `;
       
    }
    getScript(){
        document.querySelector(".pagination").addEventListener('click',()=>{
            const 
                page = Number(document.querySelector(".number.active").dataset.page),
                start = (page - 1) * this.itemPerPage,
                end = Math.min(start+ this.itemPerPage, this.totalItem);
            this.updateTableCategory(start, end);
        })
    }
}