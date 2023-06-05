import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
import {initPagination,AddPaginationEvent} from "/OrganicStore/static/common/utils.js";
import SelectCustom from "/OrganicStore/static/admin/js/customSelect.js";
export default class AddInventory extends AbstractView{
    constructor(params) {
        super(params);
        this.setTitle("Nhập hàng");

        this.elements = {
            
           
        }

        this.getHtml();
    }

    getHtml() {
        // this.mainElement.classList.add("d-none");
        this.mainElement.innerHTML = "";
        this.getScript();
    }
    getScript() {
       
    }
}


