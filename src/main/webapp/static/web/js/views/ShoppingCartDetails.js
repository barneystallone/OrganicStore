import AbstractViewWithCart from "/OrganicStore/static/web/js/views/AbstractViewWithCart.js";

const html = `
<div class="shoping-cart spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="shoping__cart__table">
                    <table>
                        <thead>
                            <tr>
                                <th class="shoping__product">Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="shoping__cart__btns">
                    <a href="#" class="primary-btn cart-btn">CONTINUE SHOPPING</a>
                    <a href="#" class="primary-btn cart-btn cart-btn-right"><span class="icon_loading"></span>
                        Upadate Cart</a>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="shoping__continue">
                    <div class="shoping__discount">
                        <h5>Discount Codes</h5>
                        <form action="#">
                            <input type="text" placeholder="Enter your coupon code">
                            <button type="submit" class="site-btn">APPLY COUPON</button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="shoping__checkout">
                    <h5>Cart Total</h5>
                    <ul>
                        <li>Subtotal <span>$454.98</span></li>
                        <li>Total <span>$454.98</span></li>
                    </ul>
                    <a href="#" class="primary-btn">PROCEED TO CHECKOUT</a>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const rowItem = `
<tr>
    <td class="shoping__cart__item">
        <img data-img src="" alt="" style="width:100px;height:100px;">
        <h5 data-name></h5>
    </td>
    <td class="shoping__cart__price" data-price>
        
    </td>
    <td class="shoping__cart__quantity">
        <div class="quantity">
            <div class="pro-qty">
                <input data-quantity type="text" value="1">
            </div>
        </div>
    </td>
    <td class="shoping__cart__total" data-subTotal>
        
    </td>
    <td class="shoping__cart__item__close">
        <span class="icon_close"></span>
    </td>
</tr>
`

export default class ShoppingCartDetails extends AbstractViewWithCart {
    constructor(params) {
        super(params);
        this.loadIntoTable();
        this.getHtml();
    }

    loadIntoTable() {
        fetch('http://localhost:8080/OrganicStore/api-shopping-cart')
        .then(res=>res.json())
        .then(data=>{
            // ,'data-img' ,'data-quantity'
            if(Array.isArray(data)){

                const arr = ['data-name','data-price','data-subTotal','data-img' ,'data-quantity','data-id'];
                const newData = data.map(item=>{
                    return {
                        'data-name' : item.product.name,
                        'data-img'  : 'data:img/jpg;base64,'+ item.product.base64Images,
                        'data-quantity': item.quantity,
                        'data-price': item.product.price*(100-item.product.saleOff)/100,
                        'data-subTotal': item.subTotalPrice,
                        'data-id' : item.product_id,
                    }
                })
                let rowsData = newData.map(item=>{
                    let elem = this.creatElementFromText(rowItem);
                    arr.forEach(a=>elem.setAttribute(a,item[a]));
                    elem.querySelector(`[${arr[0]}]`).textContent = item[arr[0]];
                    elem.querySelector(`[${arr[1]}]`).textContent = item[arr[1]].toLocaleString('vi-VN');
                    elem.querySelector(`[${arr[2]}]`).textContent = item[arr[2]].toLocaleString('vi-VN');
                    elem.querySelector(`[${arr[3]}]`).setAttribute('src',item[arr[3]]) ;
                    elem.querySelector(`[${arr[4]}]`).value = item[arr[4]] ;
                    
                    return elem;
                })
                this.cartTable.tBodies[0].append(...rowsData);
                this.AddMountButton();
            }
        })
    }

    getHtml() {
        this.elements.main.innerHTML = html;
        this.cartTable = this.elements.main.querySelector('.shoping__cart__table table');
    }
}