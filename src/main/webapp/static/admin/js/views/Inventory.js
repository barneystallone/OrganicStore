import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import InstantSearch from "/OrganicStore/static/web/js/utils/InstantSearch.js";
import {createPagination,addPageNumberEvent} from "/OrganicStore/static/common/utils.js";
export default class Inventory extends AbstractView{
    constructor(params) {
        super(params);
        this.setTitle("Inventory");
        
        
        if(this.params[":param"] == "new") {
            this.elements = {
                // postUrl: new URL(""),
                oldPage: 1,
                totalItem: 0,
                itemPerPage: 7,
                contentNhapHang : contentNhapHang,
                templateFunction : ({id,name}) => {
                    return `
                        <tr data-id="${id}">
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>
                                <div class="input-sp amount-input">
                                <input type="text" >
                            
                                </div>
                            </td>
                            <td>
                                <div class="input-sp amount-input">
                                    <input type="text" >
                            
                                </div>
                            </td>
                            <td class="thanhTien">
                                Thành tiền
                                <ion-icon class="delete-btn" name="trash-outline"></ion-icon>
                            </td>
                        </tr>
                    `
                }
            }
        }  else  {
            this.elements = {
                getListUrl: new URL("/OrganicStore/api-grn",window.location.origin),
                itemPerPage: 7,
                totalItem : 0, // set lại khi có dữ liệu
                table : table,
                templateFunction : (result) => { // arrow func => this là dối tượng Inventory
                    let str1= ` 
    <tr class=" nhap-resume" data-id= "${result.id}">
        <td >${result.id}</td>
        <td >${this.formatDate(result.ngayGio)}</td>
        <td >${this.currencyFormat(result.totalPrice)}</td>
        <td>${this.currencyFormat(result.totalPrice-result.traTruoc)}</td>
        <td>${result.grnstatus}</td>
    </tr>
    <tr class="hide-panel ">
        <td colspan="5">
            <div class="panel-content">
                <ul class="tab-list">
                    <li class="active">Thông tin</li>
                </ul>
                
                <div class="tab-content">
                    <div class="form-info">
                        <div class="form-group form-group__id">
                            <span class="form-group--label">Mã nhập hàng:</span>
                            <span class="form-group--content">${result.id}</span>
                        </div>
                        <div class="form-group form-group__time ">
                            <span class="form-group--label">Thời gian:</span>
                            <span class="form-group--content">${this.formatDate(result.ngayGio)}</span>
                        </div>
                        <div class="form-group form-group__status">
                            <span class="form-group--label">Tổng tiền:</span>
                            <span class="form-group--content">${this.currencyFormat(result.totalPrice)}</span>
                        </div>
                        <div class="form-group form-group__ncc">
                            <span class="form-group--label">Nhà cung cấp:</span>
                            <span class="form-group--content">NCC NCC</span>
                        </div>
                        <div class="form-group form-group__person--create">
                            <span class="form-group--label">Người tạo:</span>
                            <span class="form-group--content">${result.customer.name}</span>
                        </div>
                        <div class="form-group form-group__status">
                            <span class="form-group--label">Trạng thái:</span>
                            <span class="form-group--content">${result.grnstatus}</span>
                        </div>
                    </div>
                    <div class="note">
                        <textarea  id="note-area" maxlength="80" placeholder="Ghi chú..."></textarea>
                        <ion-icon name="pencil-outline"></ion-icon>
                    </div>
                    <div class="listProduct">
                        <table id="" class=" table table-sortable ">
                        <thead>
                            <tr>
                                <th>Mã hàng hóa</th>
                                <th>Tên hàng</th>
                                <th>Số lượng</th>
                                <th>Giá bán</th>
                                <th>Giá nhập</th>
                            </tr>
                        </thead>
                    <tbody>
                        `
                    let str2 = ``;
                    let tmp ;
                    while (tmp = result.listInfoGRN.shift()) {
                        str2 += `
                        <tr data-id=${tmp.id}>
                            <td>${tmp.id}</td>
                            <td >${tmp.productName}</td>
                            <td >${tmp.quantity}</td>
                            <td>${tmp.productPrice}</td>
                            <td>${tmp.priceNhap}</td>
                        </tr>  
                        
                        
                        `
                    }
                    let str3 = `
                    </tbody>
                    </table>
                    <div class="tratruoc">
                        <span>Tiền đã trả NCC:</span>
                        <span>${this.currencyFormat(result.traTruoc)}</span>
                    </div>
                </div>

            </div>
            <div class="button-group__phieuNhap">
                <button type="button" class="button button-phieuNhap button--danger">
                    <span class="button__icon">
                        <ion-icon name="close-outline"></ion-icon>
                    </span>
                    <span class="button__text">Hủy bỏ</span>
                </button>
                <button type="button" class="button button-phieuNhap">
                    <span class="button__icon">
                        <ion-icon name="arrow-redo-outline"></ion-icon>
                    </span>
                    <span class="button__text">Mở phiếu</span>
                </button>
                <button type="button" class="button button-phieuNhap">
                    <span class="button__icon">
                        <ion-icon name="copy-outline"></ion-icon>
                    </span>
                    <span class="button__text">Sao chép</span>
                </button>
            </div>
        </div>
    </td>
</tr>
                    
                    `
                    return str1.concat(str2).concat(str3);
                }
            }
        }

        this.getHtml();
        this.addListener();
    }

   
    getHtml() {
        this.mainElement.classList.add("d-none");
        if(this.params[":param"] == "new"){
            console.log("hello2")
            this.mainElement.innerHTML = this.elements.contentNhapHang;
            document.querySelector('.info-group__date input').value = this.formatDate(new Date());   
            this.elements.searchProduct = this.mainElement.querySelector('.instant-search') ;
            const instantSearchProducuts = new InstantSearch(this.elements.searchProduct,{
                inputSelector : ".instant-search__input",
                searchURL : new URL("/OrganicStore/api-search-product",window.location.origin),
                queryParam : "q",
                templateFunction : (result) =>{
                    return `
                        <div class="instant-search__result--left" 
                            data-id="${result.id}"
                            data-name="${result.name}"
                        >
                            <img src="data:image/jpg;base64,${result.base64Images}" alt="${result.name}">
                        </div>
                        <div class="instant-search__result--right">
                            <div class="instant-search__result-title"> 
                                <span> ${result.name} </span>
                            </div>
                            <div class="instant-search__result-price">Giá: ${result.price*(100-result.saleOff)/100}đ &nbsp Tồn: ${result.in_stock} </div>
                            
                        </div>
                    `
                }
            });
        } else {
            this.mainElement.innerHTML =  this.elements.table ;
            const url = new URL(this.elements.getListUrl.toString());
            url.searchParams.set("offset",0);
            url.searchParams.set("limit",this.elements.itemPerPage);
            url.searchParams.set("count","");
            this.getListDataGRN(url).then(results=> {
                this.elements.totalItem = results.totalItem;
                const pageTotals = Math.ceil(this.elements.totalItem/this.elements.itemPerPage);
                if(pageTotals>=2) {
                    createPagination(pageTotals,1);
                }
                let result;
                while(result = results.listGRN.shift()){
                    this.populateRow(result);
                }
                this.showExpandRowEvent();
            })
            console.log("hello")
        }
            
        this.getScript();
        setTimeout(()=>{
            this.mainElement.classList.remove("d-none");
        },100)
    }


    getListDataGRN(url) {

        return fetch(url,{
            method: "get"
        })
        .then(res => res.json())
        .catch(e => console.log("e"))
        .finally((results) => {
            return results;
        })
    }

    addListener() {
        if(this.params[":param"] == "new") {
            this.elements.searchProduct.addEventListener('click',(evt) => {
                
                if(evt.target.closest('.instant-search__result')) {
                    this.populateRow(evt);
                }
            })

            // Load lại table khi click vào phân trang
            // chạy sau listener trong createPagination
            document.querySelector('.pagination ul').addEventListener('click', (e)=> {
                const element = e.target.closest('li');
                if(element&&(element.classList.contains('number')||element.classList.contains('btn'))) {
                    // updateTable
                    this.updateTable(this.mainElement.querySelector('li.number.active').dataset.page*1);
                    console.log("inventory/getScript")
                }
            })
            
            // createPagination(20, 1);
            return;
        }
        // Xổ xuống khi xem chi tiết
        

    }
    showExpandRowEvent() {
        document.querySelectorAll('.nhap-resume').forEach((elem) => {
            let delay,delay2;
            elem.addEventListener('click',(e) => {
                const hidePanel = elem.nextElementSibling;
                const panel = hidePanel.querySelector('.panel-content');
                const isActive = (hidePanel.classList.contains('active')==true);
                clearTimeout(delay);
                clearTimeout(delay2);
                if(isActive) {
                    delay = setTimeout(()=>{
                        elem.classList.toggle('active');
                        hidePanel.classList.toggle('active');
                    },400)
                    
                   panel.style.height =  "0";
                } else {
                    
                    elem.classList.toggle('active');
                    hidePanel.classList.toggle('active');
                    // panel.style.height =   "450px" ;
                    panel.style.height =  panel.scrollHeight +"px" ;
                    delay2=setTimeout(() => {
                        window.scrollTo(
                            window.scrollX+elem.getBoundingClientRect().left,
                            window.scrollY+elem.getBoundingClientRect().top-63
                            )

                    },400)                    
                }
                // hidePanel.querySelector('.panel-content').style.height =  (!hidePanel.classList.contains('active')) ?  "450px" : "0";
               

            })
        });
    }
    /**
     * Khi click vào Instant Result => Thêm một dòng mới vào bảng phiếu nhập inventory/new
     * Phân trang nếu hơn số dòng quy định
     * 
     * @param {*} elem Instant Result khi Search
     */
    populateRow(e) {
        if(this.params[":param"] == "new") {
            const   elem = e.target.closest('.instant-search__result').querySelector('.instant-search__result--left'),
                    tbodyElem = this.mainElement.querySelector('#hangNhapTable').tBodies[0],
                    id = elem.dataset.id,
                    name = elem.dataset.name;
            const row = this.mainElement.querySelector(`tbody tr[data-id="${id}"]`);
            const length = [...this.mainElement.querySelectorAll(`tbody tr`)].length ;
            
            if(!row){
                if(length&&(length % this.elements.itemPerPage ==0)) {
                    createPagination(Math.ceil((length+1)/this.elements.itemPerPage), 1);
                }
                const newRow = this.createRowElement({id,name});
                
                tbodyElem.insertAdjacentElement('afterbegin',newRow);
                
                // Xóa row nếu click vào button xóa
                newRow.querySelector('.delete-btn').addEventListener('click',(e) => this.removeRow(e));
            
                if(length>=this.elements.itemPerPage) {
                    this.mainElement.querySelector(`li.number[data-page="1"]`).click();
                }
            } else {
                const index = [...row.closest('tbody').children].indexOf(row) + 1;
                if(length>this.elements.itemPerPage) { // Phải 2 trang mới phân trang
                    this.mainElement.querySelector(`.pagination li[data-page= "${ Math.ceil(index/this.elements.itemPerPage)}"]`).click();
                }
            }
            
            this.elements.searchProduct.querySelector('input').blur();
            return;
        } 
        const html = this.elements.templateFunction(e);
        const tbodyElem = this.mainElement.querySelector('#nhapkhoTable tbody');
        tbodyElem.insertAdjacentHTML('afterbegin',html);
        // const newRow = this.createRowElement(e);
        // const tbodyElem = this.mainElement.querySelector('#nhapkhoTable tbody');
        // tbodyElem.insertAdjacentElement('afterbegin',newRow);

    }

    createRowElement(result) {
        const elem =  this.elementFrom(this.elements.templateFunction(result))
        // add event tự động tính thành tiền cho element
        return elem;
    }

    removeRow(e) {
        const delRow =  e.target.closest('tr');
        const rows = [...e.target.closest('tbody').children];
        const index = rows.indexOf(delRow);
        const newTotalPages =  Math.ceil((rows.length-1)/this.elements.itemPerPage);
        let activePage =  Math.ceil((index+1)/this.elements.itemPerPage);
        activePage = (activePage>newTotalPages) ? newTotalPages : activePage; // activePage mới khi xóa 
        // // Chèn row đầu tiên trang kế nếu có
        const insertRow = Math.ceil((index+1)/this.elements.itemPerPage)*this.elements.itemPerPage
       
        if(newTotalPages<=1) {
            if(this.mainElement.querySelector('.pagination li.number[data-page="1"]')) {
                this.mainElement.querySelector('.pagination li.number[data-page="1"]').click()
            }
            if(rows[insertRow]) {
                rows[insertRow].classList.remove('d-none');
            }
            this.mainElement.querySelector('.pagination ul').innerHTML = "";
            e.target.closest('tr').remove();
        } else {
            e.target.closest('tr').remove();
            this.mainElement.querySelector(`.pagination li.number[data-page="${activePage}"]`).click()
            if( activePage&&(rows.length%this.elements.itemPerPage==1)) {
                createPagination(newTotalPages,activePage);
            }
        }
    }

    getScript() {
        if(this.params[":param"] == "new") {
            // document.querySelector('.pagination ').classList.add('d-none');
            
            return;
        }
        document.querySelector('.data-table').style.width = "98%";
        Object.assign(document.querySelector('.cardHeader ').style, {
            alignItems : "center",
        })
        Object.assign(document.querySelector('.cardHeader a.btn').style, {
            backgroundColor : 'transparent',
        })
       
    }

    /**
     * Click vào thanh phân trang => các row ở trang đó remove class d-none 
     * Thêm vào các row ở active page cũ class d-none
     * 
     * @param {page} page Trang muốn chuyển qua 
     */
    updateTable(page) {
        if(this.params[":param"] == "new") {
            const rowsArray = Array.from(this.mainElement.querySelectorAll('#hangNhapTable tbody tr'));
            // const oldBegin = (this.elements.oldPage-1)*this.elements.itemPerPage
            // const oldEnd = Math.min(oldBegin+ this.elements.itemPerPage, rowsArray.length);
            // const oldRows = rowsArray.slice(oldBegin,oldEnd);
            const begin = (page-1)*this.elements.itemPerPage;
            const end = Math.min(begin+ this.elements.itemPerPage, rowsArray.length);
            const newRows = rowsArray.slice(begin,end);
            
            rowsArray.forEach(e => e.classList.add('d-none'));
            newRows.forEach(e => e.classList.remove('d-none'));

            //set lại this.elements.page
            this.elements.oldPage = page;

            return;
        }
    }

   
}


const contentNhapHang = `
<div class="nhaphang-wrapper">
<div class="nhaphang-left">
    <div class="nhaphang-left__header search  instant-search">
        <label>
            <input type="text" placeholder="Tìm kiếm sản phẩm để nhập" class="instant-search__input">
            <ion-icon name="search-outline" role="img" class="md hydrated" aria-label="search outline"></ion-icon>
        </label>
    </div>
    <div class="nhaphang-left__content">
        <table id="hangNhapTable" class=" table table-sortable ">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên hàng</th>
                    <th>Số lượng</th>
                    <td>Đơn giá</td>
                    <th class="thanhTien">Thành tiền</th>
                </tr>
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
<div class="nhaphang-right">
    <div class="info-group">
        <div class="info-group__person info-group--content">
            <input type="text" disabled value="Nguyễn Hữu H">
            <ion-icon name="person"></ion-icon>
        </div>
        <div class="info-group__date info-group--content">
             <input type="text" disabled value="">
             <ion-icon name="calendar-outline"></ion-icon>
        </div>
    </div>
    <div class="info-group">
        <div class="info-group--content">
            <input id="NhaCungCap"type="text"  placeholder="Nhập tên nhà cung cấp">
            <ion-icon name="person"></ion-icon>
        </div>
    </div>
    <div class="info-group">
        <div class="info-group--label">
            <label for="MaPhieuNhap" style="user-select:none;">Phiếu nhập</label>
        </div>
        <div class="info-group--content">
            <input id="MaPhieuNhap"type="text"  class="active" disabled value="" placeholder="Điền mã tự động" >
            <ion-icon name="qr-code-outline"></ion-icon>
        </div>
    </div>
    <div class="info-group ">
        <div class="info-group--label">Tổng tiền</div>
        <div class="info-group--content">200.000 đ</div>
    </div>
    <div class="info-group ">
        <div class="info-group--label">Trạng thái</div>
        <div class="info-group--content">Phiếu tạm</div>
    </div>
    <div class="info-group">
        <div class="info-group--label">
            <label for="debt">Đã trả</label>
        </div>
        <div class="info-group--content">
            <input id="debt"type="text" placeholder="Đã trả trước">
            <ion-icon name="pricetags-outline"></ion-icon>
        </div>
    </div>
    <div class="button-group">
        <a data-link href="/OrganicStore/admin/inventory" class="btn">
            <button type="button" class="button button--danger">
                <span class="button__text">Hủy</span>
                <span class="button__icon">
                <ion-icon name="close-outline"></ion-icon>
                </span>
            </button>
        </a>
        <a data-link href="/OrganicStore/admin/inventory/new" class="btn">
            <button type="button" class="button">
                <span class="button__text">Lưu</span>
                <span class="button__icon">
                <ion-icon name="save-outline"></ion-icon>
                </span>
            </button>
        </a>
    </div>                    
</div>
</div>
`
const table = `
<div class="data-table-wrapper " style="margin-top:80px;">
    <div class="data-table">
        <div class="cardHeader">
            <h2>Phiếu nhập hàng</h2>
            <a data-link href="/OrganicStore/admin/inventory/new" class="btn">
                <button type="button" class="button">
                    <span class="button__text">Nhập hàng</span>
                    <span class="button__icon">
                    <ion-icon name="add-outline"></ion-icon>
                     </span>
                </button>
            </a>
        </div>
        <div class="table-nhapkho-wrapper">
            <table id="nhapkhoTable" class=" table table-sortable ">
                <thead>
                    <tr>
                        <th>Mã nhập hàng</th>
                        <th >Thời gian</th>
                        <th >Tổng tiền</th>
                        <th>Cần trả thêm</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class=" nhap-resume">
                        <td>Mã nhập hàng</td>
                        <td >Thời gian</td>
                        <td >Tổng tiền</td>
                        <td>Cần trả thêm</td>
                        <td>Trạng thái</td>
                    </tr>
                    <tr class="hide-panel ">
                        <td colspan="5">
                            <div class="panel-content">
                                <ul class="tab-list">
                                    <li class="active">Thông tin</li>
                                    <li>Thẻ kho</li>
                                    <li>Thẻ kho</li>
                                </ul>
                                
                                <div class="tab-content">
                                    <div class="form-info">
                                        <div class="form-group form-group__id">
                                            <span class="form-group--label">Mã nhập hàng:</span>
                                            <span class="form-group--content">123123</span>
                                        </div>
                                        <div class="form-group form-group__time ">
                                            <span class="form-group--label">Thời gian:</span>
                                            <span class="form-group--content">30/10/2022 18:30</span>
                                        </div>
                                        <div class="form-group form-group__status">
                                            <span class="form-group--label">Tổng tiền:</span>
                                            <span class="form-group--content">200.000đ</span>
                                        </div>
                                        <div class="form-group form-group__ncc">
                                            <span class="form-group--label">Nhà cung cấp:</span>
                                            <span class="form-group--content">NCC NCC</span>
                                        </div>
                                        <div class="form-group form-group__person--create">
                                            <span class="form-group--label">Người tạo:</span>
                                            <span class="form-group--content">Nguyễn Văn A</span>
                                        </div>
                                        <div class="form-group form-group__status">
                                            <span class="form-group--label">Trạng thái:</span>
                                            <span class="form-group--content">Phiếu tạm</span>
                                        </div>
                                    </div>
                                    <div class="note">
                                        <textarea  id="note-area" maxlength="80" placeholder="Ghi chú..."></textarea>
                                        <ion-icon name="pencil-outline"></ion-icon>
                                    </div>
                                    <div class="listProduct">
                                        <table id="" class=" table table-sortable ">
                                        <thead>
                                            <tr>
                                                <th>Mã hàng hóa</th>
                                                <th>Tên hàng</th>
                                                <th>Số lượng</th>
                                                <th>Giá bán</th>
                                                <th>Giá nhập</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                        </tbody>
                                        </table>
                                        <div class="tratruoc">
                                            <span>Tiền đã trả NCC:</span>
                                            <span>0</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="button-group__phieuNhap">
                                    <button type="button" class="button button-phieuNhap button--danger">
                                        <span class="button__icon">
                                            <ion-icon name="close-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Hủy bỏ</span>
                                    </button>
                                    <button type="button" class="button button-phieuNhap">
                                        <span class="button__icon">
                                            <ion-icon name="arrow-redo-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Mở phiếu</span>
                                    </button>
                                    <button type="button" class="button button-phieuNhap">
                                        <span class="button__icon">
                                            <ion-icon name="copy-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Sao chép</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="nhap-resume">
                        <td>Mã nhập hàng</td>
                        <td >Thời gian</td>
                        <td >Tổng tiền</td>
                        <td>Cần trả thêm</td>
                        <td>Trạng thái</td>
                    </tr>
                    <tr class="hide-panel ">
                        <td colspan="5">
                            <div class="panel-content">
                                <ul class="tab-list">
                                    <li class="active">Thông tin</li>
                                    <li>Thẻ kho</li>
                                    <li>Thẻ kho</li>
                                </ul>
                                
                                <div class="tab-content">
                                    <div class="form-info">
                                        <div class="form-group form-group__id">
                                            <span class="form-group--label">Mã nhập hàng:</span>
                                            <span class="form-group--content">123123</span>
                                        </div>
                                        <div class="form-group form-group__time ">
                                            <span class="form-group--label">Thời gian:</span>
                                            <span class="form-group--content">30/10/2022 18:30</span>
                                        </div>
                                        <div class="form-group form-group__status">
                                            <span class="form-group--label">Tổng tiền:</span>
                                            <span class="form-group--content">200.000đ</span>
                                        </div>
                                        <div class="form-group form-group__ncc">
                                            <span class="form-group--label">Nhà cung cấp:</span>
                                            <span class="form-group--content">NCC NCC</span>
                                        </div>
                                        <div class="form-group form-group__person--create">
                                            <span class="form-group--label">Người tạo:</span>
                                            <span class="form-group--content">Nguyễn Văn A</span>
                                        </div>
                                        <div class="form-group form-group__status">
                                            <span class="form-group--label">Trạng thái:</span>
                                            <span class="form-group--content">Phiếu tạm</span>
                                        </div>
                                    </div>
                                    <div class="note">
                                        <textarea  id="note-area" maxlength="80" placeholder="Ghi chú..."></textarea>
                                        <ion-icon name="pencil-outline"></ion-icon>
                                    </div>
                                    <div class="listProduct">
                                        <table id="" class=" table table-sortable ">
                                        <thead>
                                            <tr>
                                                <th>Mã hàng hóa</th>
                                                <th>Tên hàng</th>
                                                <th>Số lượng</th>
                                                <th>Giá bán</th>
                                                <th>Giá nhập</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                        </tbody>
                                        </table>
                                        <div class="tratruoc">
                                            <span>Tiền đã trả NCC:</span>
                                            <span>0</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="button-group__phieuNhap">
                                    <button type="button" class="button button-phieuNhap button--danger">
                                        <span class="button__icon">
                                            <ion-icon name="close-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Hủy bỏ</span>
                                    </button>
                                    <button type="button" class="button button-phieuNhap">
                                        <span class="button__icon">
                                            <ion-icon name="arrow-redo-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Mở phiếu</span>
                                    </button>
                                    <button type="button" class="button button-phieuNhap">
                                        <span class="button__icon">
                                            <ion-icon name="copy-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Sao chép</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="nhap-resume" >
                        <td>Mã nhập hàng</td>
                        <td >Thời gian</td>
                        <td >Tổng tiền</td>
                        <td>Cần trả thêm</td>
                        <td>Trạng thái</td>
                    </tr>
                    <tr class="hide-panel ">
                        <td colspan="5">
                            <div class="panel-content">
                                <ul class="tab-list">
                                    <li class="active">Thông tin</li>
                                    <li>Thẻ kho</li>
                                    <li>Thẻ kho</li>
                                </ul>
                                
                                <div class="tab-content">
                                    <div class="form-info">
                                        <div class="form-group form-group__id">
                                            <span class="form-group--label">Mã nhập hàng:</span>
                                            <span class="form-group--content">123123</span>
                                        </div>
                                        <div class="form-group form-group__time ">
                                            <span class="form-group--label">Thời gian:</span>
                                            <span class="form-group--content">30/10/2022 18:30</span>
                                        </div>
                                        <div class="form-group form-group__status">
                                            <span class="form-group--label">Tổng tiền:</span>
                                            <span class="form-group--content">200.000đ</span>
                                        </div>
                                        <div class="form-group form-group__ncc">
                                            <span class="form-group--label">Nhà cung cấp:</span>
                                            <span class="form-group--content">NCC NCC</span>
                                        </div>
                                        <div class="form-group form-group__person--create">
                                            <span class="form-group--label">Người tạo:</span>
                                            <span class="form-group--content">Nguyễn Văn A</span>
                                        </div>
                                        <div class="form-group form-group__status">
                                            <span class="form-group--label">Trạng thái:</span>
                                            <span class="form-group--content">Phiếu tạm</span>
                                        </div>
                                    </div>
                                    <div class="note">
                                        <textarea  id="note-area" maxlength="80" placeholder="Ghi chú..."></textarea>
                                        <ion-icon name="pencil-outline"></ion-icon>
                                    </div>
                                    <div class="listProduct">
                                        <table id="" class=" table table-sortable ">
                                        <thead>
                                            <tr>
                                                <th>Mã hàng hóa</th>
                                                <th>Tên hàng</th>
                                                <th>Số lượng</th>
                                                <th>Giá bán</th>
                                                <th>Giá nhập</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                            <tr>
                                                <td>123123213</td>
                                                <td >Chuối</td>
                                                <td >500</td>
                                                <td>20.000đ</td>
                                                <td>15.000đ</td>
                                            </tr>    
                                        </tbody>
                                        </table>
                                        <div class="tratruoc">
                                            <span>Tiền đã trả NCC:</span>
                                            <span>0</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div class="button-group__phieuNhap">
                                    <button type="button" class="button button-phieuNhap button--danger">
                                        <span class="button__icon">
                                            <ion-icon name="close-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Hủy bỏ</span>
                                    </button>
                                    <button type="button" class="button button-phieuNhap">
                                        <span class="button__icon">
                                            <ion-icon name="arrow-redo-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Mở phiếu</span>
                                    </button>
                                    <button type="button" class="button button-phieuNhap">
                                        <span class="button__icon">
                                            <ion-icon name="copy-outline"></ion-icon>
                                        </span>
                                        <span class="button__text">Sao chép</span>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div class="pagination">
                <ul>
                    <li class="btn prev"><span><i class="fas fa-angle-left"></i> Prev</span></li><li class="number " data-page="1"><span>1</span></li><li class="number active" data-page="2"><span>2</span></li><li class="number " data-page="3"><span>3</span></li><li class="number " data-page="4"><span>4</span></li><li class="btn next"><span>Next <i class="fas fa-angle-right"></i></span></li>
                </ul>
            </div>
        </div>
    </div>
</div>
`;

// 
/* 
<form action="#" id="searchProd" class="instant-search">
    <div class="hero__search__categories">
        All Categories <span class="arrow_carrot-down"></span>
    </div>
    <input type="text" placeholder="What do yo u need?" class="instant-search__input" >
    <!-- <button type="submit" class="instant-search__btn site-btn">SEARCH</button> -->
    <a type="submit" data-link class="instant-search__btn site-btn disable">SEARCH</a>
</form>
 */

//

{/* <div class="pagination">
    <ul>
        <li class="btn prev"><span><i class="fas fa-angle-left"></i> Prev</span></li>
        <li class="number active" data-page="1"><span>1</span></li>
        <li class="number" data-page="2"><span>2</span></li>
        <li class="number" data-page="3"><span>3</span></li>
        <li class="number" data-page="4"><span>4</span></li>
        <li class="btn next"><span>Next <i class="fas fa-angle-right"></i></span></li>
    </ul>
</div> */}


{/* <tr>
                    <td>Mã hàng hóa</td>
                    <td>Tên hàng</td>
                    <td>
                        <div class="input-sp amount-input">
                            <input type="text" >
                    
                        </div>
                    </td>
                    <td>
                         <div class="input-sp amount-input">
                            <input type="text" >
                    
                        </div>
                    </td>
                    <td>Thành tiền</td>
                </tr>
                <tr>
                    <td>Mã hàng hóa</td>
                    <td>Tên hàng</td>
                    <td>
                        <div class="input-sp amount-input">
                            <input type="text" >
                    
                        </div>
                    </td>
                    <td>
                        <div class="input-sp amount-input">
                            <input type="text" >
                    
                        </div>
                    </td>
                    <td>Thành tiền</td>
                </tr>
                <tr>
                    <td>Mã hàng hóa</td>
                    <td>Tên hàng</td>
                    <td>
                        <div class="input-sp amount-input">
                        <input type="text" >
                    
                        </div>
                    </td>
                    <td>
                         <div class="input-sp amount-input">
                            <input type="text" >
                    
                        </div>
                    </td>
                    <td>Thành tiền</td>
                </tr>
                <tr>
                    <td>Mã hàng hóa</td>
                    <td>Tên hàng</td>
                    
                    <td>
                        <div class="input-sp amount-input">
                        <input type="text" >
                    
                        </div>
                    </td>
                    <td>
                        <div class="input-sp amount-input">
                        <input type="text" >
                    
                        </div>
                    </td>
                    <td>Thành tiền</td>
                </tr> */}