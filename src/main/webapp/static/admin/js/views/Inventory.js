import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import InstantSearch from "/OrganicStore/static/web/js/utils/InstantSearch.js";
import {createPagination} from "/OrganicStore/static/common/utils.js";
export default class Inventory extends AbstractView{
    constructor(params) {
        super(params);
        this.setTitle("Inventory");
        
        
        if(this.params[":param"] == "new") {
            this.elements = {
                apiUrl: new URL("/OrganicStore/api-grn",window.location.origin),
                oldPage: 1,
                totalItem: 0,
                itemPerPage: 7,
                contentNhapHang : contentNhapHang,
                saveButtonSelector: '#btn-save',
                closeButtonSelector: '#btn-close',
                templateFunction : ({id,name}) => {
                    return `
                        <tr data-id="${id}">
                            <td>${id}</td>
                            <td>${name}</td>
                            <td>
                                <div class="input-sp amount-input">
                                <input type="text" class="prod-quantity"  value=0>
                            
                                </div>
                            </td>
                            <td>
                                <div class="input-sp amount-input">
                                    <input type="text"  class="prod-importPrice" value=0>
                            
                                </div>
                            </td>
                            <td class="thanhTien">
                                <span class="thanhTien">0</span>
                                <ion-icon class="delete-btn" name="trash-outline"></ion-icon>
                            </td>
                        </tr>
                    `
                }
            }
        }  else {
            this.elements = {
                apiUrl: new URL("/OrganicStore/api-grn",window.location.origin),
                itemPerPage: 3,
                btnDeleteSelector :'.btn-delete',
                totalItem : 0, // set lại khi có dữ liệu
                page: 1,
                table : table,
                titleArr : ["Mã phiếu nhập","Thời gian","Tổng tiền","Cần trả thêm"," Trạng thái"],
                templateHeader :  (arr) => {
                    let html = ``,
                        title;
                    while(title= arr.shift()) {
                        html += `<th>${title}</th>`
                    }
                    return html
                }     ,
                templateFunction : (result) => { // arrow func => this là dối tượng Inventory
                    let str1= ` 
    <tr class=" nhap-resume" data-id= "${result.id}">
        <td >${result.ngayGio}</td>
        <td >${this.formatDate(result.ngayGio)}</td>
        <td >${this.currencyFormat(result.totalPrice)}</td>
        <td>${this.currencyFormat(result.totalPrice-result.traTruoc)}</td>
        <td>${result.grnstatus}</td>
    </tr>
    <tr class="hide-panel " data-id= "${result.id}">
        <td colspan="5">
            <div class="panel-content">
                <ul class="tab-list">
                    <li class="active">Thông tin</li>
                </ul>
                
                <div class="tab-content">
                    <div class="form-info">
                        <div class="form-group form-group__id">
                            <span class="form-group--label">Mã nhập hàng:</span>
                            <span class="form-group--content">${result.ngayGio}</span>
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
                                <th>Giá nhập</th>
                                <th>Giá bán</th>
                            </tr>
                        </thead>
                    <tbody>
                        `
                    let str2 = ``;
                    let tmp ;
                    while (tmp = result.listInfoGRN.shift()) {
                        str2 += `
                        <tr data-id=${tmp.id}>
                            <td>${tmp.idProd}</td>
                            <td >${tmp.productName}</td>
                            <td >${tmp.quantity}</td>
                            <td>${tmp.importPrice}</td>
                            <td>${tmp.productPrice}</td>
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
                <button type="button" class="button button-phieuNhap button--danger btn-delete">
                    <span class="button__icon">
                        <ion-icon name="close-outline"></ion-icon>
                    </span>
                    <span class="button__text">Hủy bỏ</span>
                </button>
                <button type="button" class="button button-phieuNhap">
                    <span class="button__icon">
                        <ion-icon name="arrow-undo-outline"></ion-icon>
                    </span>
                    <span class="button__text">Nhập thêm hàng</span>
                </button>
                <button type="button" class="button button-phieuNhap">
                    <span class="button__icon">
                        <ion-icon name="arrow-redo-outline"></ion-icon>
                    </span>
                    <span class="button__text">Mở phiếu</span>
                </button>
                <!--    <button type="button" class="button button-phieuNhap">
               <span class="button__icon">
                <ion-icon name="copy-outline"></ion-icon>
                </span>
                <span class="button__text">Sao chép</span>
                </button> -->
                <button type="button" class="button button-phieuNhap button-check">
                    <span class="button__icon">
                        <ion-icon name="checkmark-circle-outline"></ion-icon>
                    </span>
                    <span class="button__text">Hoàn thành</span>
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
        
        if(this.params[":param"] == "khohang") {
            this.elements = {
                ...this.elements,
                titleArr : ["Mã hàng hóa","Tên hàng","Tồn kho","Giá vốn"],
                apiUrl: new URL("/OrganicStore/api-khohang",window.location.origin),
                templateFunction : (result) => { // arrow func => this là dối tượng Inventory
                    let str1= ` 
    <tr class=" nhap-resume" data-id= "${result.id}">
        <td >SP${result.id}</td>
        <td >${result.name}</td>
        <td >${result.in_stock}</td>
        <td>${result.price}</td>
    </tr>
    <tr class="hide-panel " data-id= "${result.id}">
        <td colspan="5">
            <div class="panel-content">
                <ul class="tab-list">
                    <li class="active">Thẻ kho</li>
                </ul>
                
                <div class="tab-content">
                    <div class="listProduct">
                        <table id="" class=" table table-sortable ">
                        <thead>
                            <tr>
                                <th>Chứng từ</th>
                                <th>Thời gian</th>
                                <th>Số lượng</th>
                                <th>Giá nhập</th>
                                <th>Giá bán</th>
                            </tr>
                        </thead>
                    <tbody>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </td>
</tr>
                    
                    `
                    return str1;
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

            // Set personName
            document.querySelector('.info-group--content input').value = window.getCookie("personName")
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
                            <div class="instant-search__result-price">
                                Giá: ${result.price*(100-result.saleOff)/100}đ &nbsp Tồn: ${result.in_stock} 
                            </div>
                        </div>
                    `
                }
            });
        } else {
            this.mainElement.innerHTML =  this.elements.table ;
            
            document.querySelector('#nhapkhoTable thead tr').innerHTML = this.elements.templateHeader(
                this.elements.titleArr
            )
            const searchParams = new URL(window.location.href).searchParams;
            const url = new URL(this.elements.apiUrl.toString());
            let page = searchParams.get('page')*1
            if(page) {
                this.elements.page = page;
            }
            url.searchParams.set("count","");
            this.getListDataGRN(url).then((results) => {
                this.elements.totalItem = results.totalItem;
                const pageTotals = Math.ceil(this.elements.totalItem/this.elements.itemPerPage);
                if(pageTotals>=2) {
                    createPagination(pageTotals,this.elements.page);
                }
                if(pageTotals< this.elements.page) {
                    document.querySelector(`li.number[data-page="${1}"]`).click();
                }
                let arr = (this.params[":param"] == "khohang") ? results : results.listGRN
                this.populateGRNTable(results);
            
            });

        }
            
        this.getScript();
        setTimeout(()=>{
            this.mainElement.classList.remove("d-none");
        },100)
    }

    /**
     * 
     * @param {url} url : URL 
     */
    getListDataGRN(url) {
        url.searchParams.set("offset", (this.elements.page-1)*this.elements.itemPerPage);
        url.searchParams.set("limit",this.elements.itemPerPage);
        

      
        return fetch(url,{
            method: "get"
        })
        .then(res => res.json())
        .catch(e => console.log(e))
        .finally((results) => {
            return results;
        
        })
    }
 
    /**
     * Load lại table inventory
     * 
     * @param {results} results : Mảng các GRN data
     */
    populateGRNTable(results){
        let result;
        const tbodyElem = this.mainElement.querySelector('tbody');
        tbodyElem.innerHTML = "";
        while(result = results.shift()){
            this.populateRow(result,tbodyElem);
        }
        this.showExpandRowEvent();
        this.addEvent();
        // this.saveCompleteEvent();
    }

    
    /**
     * Xổ xuống khi xem phiếu nhập: xem các mặt hàng nhập,....
     */
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
    // Cho trang /inventory
    addEvent() {
        document.querySelectorAll(this.elements.btnDeleteSelector).forEach(element => {
            element.addEventListener('click',(e) => {
                const id = e.target.closest('tr').dataset.id;
                fetch(this.elements.apiUrl,{
                    method: "DELETE",
                    body: JSON.stringify({id})
                })
                .then(res => res.json())
                .then(result => {
                    if(result.status!==200) {
                        throw new Error(result.message);
                    }
                    alert("Hủy phiếu nhập thành công");
                    document.querySelectorAll(`tr[data-id="${id}"]`).forEach(e => e.remove())
                })
                .catch(e => alert(e.message));
            })
        })
        document.querySelectorAll('.button-check').forEach(element => {
            element.addEventListener('click',(e) => {
                const id = e.target.closest('tr').dataset.id;
                fetch("http://localhost:8080/OrganicStore/api-grn-complete",{
                    method: "put",
                    body: JSON.stringify({id})
                })
                .then(res => res.json())
                .then(result => {
                   
                    alert(result);
                    document.querySelector(`li.number[data-page="${this.elements.page}"]`).click();
                })
                .catch(e => console.error(e));
            })
        })
    }
    

    /**
     * Khi click vào Instant Result => Thêm một dòng mới vào bảng phiếu nhập inventory/new
     * Phân trang nếu hơn số dòng quy định
     * 
     * @param {*} elem Instant Result khi Search
     */
    populateRow(result,tbodyElem) {
        if(this.params[":param"] == "new") {
            const   elem = result.target.closest('.instant-search__result').querySelector('.instant-search__result--left'),
                    // tbodyElem = this.mainElement.querySelector('#hangNhapTable').tBodies[0],
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
                
        
                newRow.querySelectorAll('.amount-input input').forEach(element=>{
                    this.addNumberKeydownListener(element);
                    element.addEventListener('blur', (e)=> {
                        const row = e.target.closest('tr');
    
                        row.querySelector('.thanhTien').textContent = this.currencyFormat(
                            row.querySelector('.prod-quantity').value*row.querySelector('.prod-importPrice').value
                        );
                        document.querySelector('#totalPrice').textContent = this.currencyFormat(
                            [...document.querySelectorAll('td.thanhTien')].reduce((prev,current) => {
                                return prev + this.convertToNumber(current.textContent)*1;
                            },0)
                        );

                        e.target.value =  e.target.value*1
                    })
                })
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
        const html = this.elements.templateFunction(result);
        tbodyElem.insertAdjacentHTML('beforeend',html);

    }

    createRowElement(result) {
        const elem =  this.elementFrom(this.elements.templateFunction(result))
        // add event tự động tính thành tiền cho element
        return elem;
    }

    removeRow(e) {
        const rows = [...e.target.closest('tbody').children];
        const index = rows.indexOf(e.target.closest('tr'));
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
    addListener() {
        if(this.params[":param"] == "new") {
            this.elements.searchProduct.addEventListener('click',(evt) => {
                
                if(evt.target.closest('.instant-search__result')) {
                    this.populateRow(evt,this.mainElement.querySelector('#hangNhapTable tbody'));
                }
            })

            this.addNumberKeydownListener(document.querySelector('#traTruoc'))
            this.elements
            this.addNumberKeydownListener(document.querySelector('#traTruoc'))
            

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
            
            // Save button
            document.querySelector(this.elements.saveButtonSelector).addEventListener('click',(e) => {
                e.preventDefault();
                e.stopPropagation();
                const   traTruoc = document.querySelector("#traTruoc").value;
                // const   customerId = window.getCookie("customerId"); // Lấy từ session dưới backend
                const   listInfoGRN = [...document.querySelectorAll("#hangNhapTable tbody tr")].map(e => {
                    return {
                        "idProd" : e.dataset.id,
                        "quantity": e.querySelector('.prod-quantity').value,
                        "importPrice": e.querySelector('.prod-importPrice').value
                    }         
                })
                
                this.callAPI(this.elements.apiUrl,{
                    traTruoc,
                    listInfoGRN
                });

            })
            // createPagination(20, 1);
            return;
        }
        // Sự kiện phân trang
        // chạy sau listener trong creatPagination
        document.querySelector('.pagination ul').addEventListener('click', (e)=> {
            const element = e.target.closest('li');
            if(element&&(element.classList.contains('number')||element.classList.contains('btn'))) {
                let activePage = this.mainElement.querySelector('li.number.active').dataset.page*1;
                this.elements.page = activePage;
                const usp = new URLSearchParams(window.location.search);
                usp.set('page',activePage);
                // Thay đổi params .VD  Từ page 6 Click sang page 8
                //  ?page=6 -> ?page=8
                history.replaceState(null, null, "?"+usp.toString());
                this.updateTable(activePage);
                console.log("inventory/getScript")
            }
        })

    }

    /**
     * gọi Create Update api
     * @param {url} url : api url
     */
    callAPI(url,payLoad) {
        if(this.params[":param"] == "new" ){
            fetch(url,{
                method:"Post",
                body : JSON.stringify(payLoad),
            })
            .then(
                res=>res.json()
                )
            .then(result => {
                if(result.status!==200) {
                    throw new Error(result.message);
                }
                console.log("Lưu phiếu nhập thành công");
                const url = new URL(this.elements.apiUrl.toString());
                document.querySelector(this.elements.closeButtonSelector).click()
            })
            .catch(e => alert(e.message));
        }
    }
    getScript() {
        if(this.params[":param"] == "new") {
            // document.querySelector('.pagination ').classList.add('d-none');
            
            return;
        }
        
        document.querySelector('#taoPhieuNhap .button').classList.toggle('blue',this.params[":param"] == "khohang");
        document.querySelector('#xemHangHoa .button').classList.toggle('blue',this.params[":param"] == "khohang");
        document.querySelector('.data-table').style.width = "98%";
        Object.assign(document.querySelector('.cardHeader ').style, {
            alignItems : "center",
        })
    
        document.querySelector('#taoPhieuNhap').style.backgroundColor = 'transparent' ;
        document.querySelector('#xemHangHoa').style.backgroundColor = 'transparent' ;
        

       
    }

    /**
     * Click vào thanh phân trang => các row ở trang đó remove class d-none 
     * Thêm vào các row ở active page cũ class d-none
     * 
     * @param {page} page Trang muốn chuyển qua 
     */
    updateTable(page) {
        if(this.params[":param"] == "new" ) {
            const rowsArray = Array.from(this.mainElement.querySelectorAll('#hangNhapTable tbody tr'));
            const begin = (page-1)*this.elements.itemPerPage;
            const end = Math.min(begin+ this.elements.itemPerPage, rowsArray.length);
            const newRows = rowsArray.slice(begin,end);
            
            rowsArray.forEach(e => e.classList.add('d-none'));
            newRows.forEach(e => e.classList.remove('d-none'));

            //set lại this.elements.page
            this.elements.oldPage = page;

            return;
        }
        this.elements.page = page;

        this.getListDataGRN(new URL(this.elements.apiUrl.toString())).then(results => {
            this.populateGRNTable(results);
        })
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
            <input type="text" disabled value="">
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
    <div  class="info-group ">
        <div class="info-group--label">Tổng tiền</div>
        <div id="totalPrice" class="info-group--content">200.000 đ</div>
    </div>
    <div class="info-group ">
        <div class="info-group--label">Trạng thái</div>
        <div class="info-group--content">Phiếu tạm</div>
    </div>
    <div class="info-group">
        <div class="info-group--label">
            <label for="traTruoc">Đã trả</label>
        </div>
        <div class="info-group--content">
            <input id="traTruoc"type="text" placeholder="Đã trả trước">
            <ion-icon name="pricetags-outline"></ion-icon>
        </div>
    </div>
    <div class="button-group">
        <a id="btn-close" data-link href="/OrganicStore/admin/inventory" class="btn">
            <button type="button" class="button button--danger">
                <span class="button__text">Hủy</span>
                <span class="button__icon">
                <ion-icon name="close-outline"></ion-icon>
                </span>
            </button>
        </a>
        <a id="btn-save" data-link href="/OrganicStore/admin/inventory/new" class="btn ">
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
            <div class = "inventory-btn-group">
                <a data-link id="xemHangHoa" href="/OrganicStore/admin/inventory/khohang" class="btn">
                    <button type="button" class="button">
                        <span class="button__text">Hàng hóa</span>
                        <span class="button__icon">
                            <ion-icon name="arrow-redo-outline"></ion-icon>
                        </span>
                    </button>
                </a>
                <a data-link id="taoPhieuNhap" href="/OrganicStore/admin/inventory/new" class="btn">
                    <button type="button" class="button">
                        <span class="button__text">Nhập hàng</span>
                        <span class="button__icon">
                        <ion-icon name="add-outline"></ion-icon>
                        </span>
                    </button>
                </a>
            
            
            </div>
        </div>
        <div class="table-nhapkho-wrapper">
            <table id="nhapkhoTable" class=" table table-sortable ">
                <thead>
                    <tr>
                        <th>Mã phiếu nhập</th>
                        <th >Thời gian</th>
                        <th >Tổng tiền</th>
                        <th>Cần trả thêm</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    
                    

                </tbody>
            </table>
            <div class="pagination">
                <ul>
                    <!--
                    <li class="btn prev"><span><i class="fas fa-angle-left"></i> Prev</span></li><li class="number " data-page="1"><span>1</span></li><li class="number active" data-page="2"><span>2</span></li><li class="number " data-page="3"><span>3</span></li><li class="number " data-page="4"><span>4</span></li><li class="btn next"><span>Next <i class="fas fa-angle-right"></i></span></li>
                    -->
                </ul>
            </div>
        </div>
    </div>
</div>
`;
    