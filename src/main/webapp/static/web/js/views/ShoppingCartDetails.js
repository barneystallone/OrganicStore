import AbstractViewWithCart from "/OrganicStore/static/web/js/views/AbstractViewWithCart.js";



export default class ShoppingCartDetails extends AbstractViewWithCart {
    constructor(params) {
        super(params);
        this.loadIntoTable();
        this.getHtml();
        this.elements = {
            tempTotalQuery : '.shoping__checkout .tam-tinh',
            totalQuery : '.tong-tien',
        }
        this.editCartSubListener();
    }

    loadIntoTable() {
        this.getCartInSesssion()
        .then(data=>{
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
                let total=0;
                let rowsData = newData.map(item=>{
                    let elem = this.creatElementFromText(rowItem);
                    elem.setAttribute(arr[5],item[arr[5]]);
                    elem.querySelector(`[${arr[0]}]`).textContent = item[arr[0]];
                    elem.querySelector(`[${arr[1]}]`).textContent = item[arr[1]].toLocaleString('vi-VN');
                    elem.querySelector(`[${arr[2]}]`).textContent = item[arr[2]].toLocaleString('vi-VN');
                    elem.querySelector(`[${arr[3]}]`).setAttribute('src',item[arr[3]]) ;
                    elem.querySelector(`[${arr[4]}]`).value = item[arr[4]] ;
                    total+=  item[arr[2]];
                    return elem;
                })
                document.querySelector('.tam-tinh').textContent = this.currencyFormat(total);
                document.querySelector('.tong-tien').textContent = this.currencyFormat(total);
                this.cartTable.tBodies[0].append(...rowsData);
                this.AddMountButton({
                    subTotalQuery:'[data-subtotal]',
                    priceQuery : '.shoping__cart__price',
                    tempTotalQuery : this.elements.tempTotalQuery,
                    totalQuery : this.elements.totalQuery,
                });
                this.AddInputListener({
                    parentQuery:'tr',
                    subTotalQuery:'[data-subtotal]',
                    priceQuery : '.shoping__cart__price',
                    tempTotalQuery : this.elements.tempTotalQuery,
                    totalQuery : this.elements.totalQuery,
                })
                this.addRemoveListener();
            }
        }).catch(err=>console.log({err}));
        // fetch('http://localhost:8080/OrganicStore/api-shopping-cart')
        // .then(res=>res.json())
        // .then(data=>{
            
        //     // ,'data-img' ,'data-quantity'
        //     if(Array.isArray(data)){

        //         const arr = ['data-name','data-price','data-subTotal','data-img' ,'data-quantity','data-id'];
        //         const newData = data.map(item=>{
        //             return {
        //                 'data-name' : item.product.name,
        //                 'data-img'  : 'data:img/jpg;base64,'+ item.product.base64Images,
        //                 'data-quantity': item.quantity,
        //                 'data-price': item.product.price*(100-item.product.saleOff)/100,
        //                 'data-subTotal': item.subTotalPrice,
        //                 'data-id' : item.product_id,
        //             }
        //         })
        //         let total=0;
        //         let rowsData = newData.map(item=>{
        //             let elem = this.creatElementFromText(rowItem);
        //             elem.setAttribute(arr[5],item[arr[5]]);
        //             elem.querySelector(`[${arr[0]}]`).textContent = item[arr[0]];
        //             elem.querySelector(`[${arr[1]}]`).textContent = item[arr[1]].toLocaleString('vi-VN');
        //             elem.querySelector(`[${arr[2]}]`).textContent = item[arr[2]].toLocaleString('vi-VN');
        //             elem.querySelector(`[${arr[3]}]`).setAttribute('src',item[arr[3]]) ;
        //             elem.querySelector(`[${arr[4]}]`).value = item[arr[4]] ;
        //             total+=  item[arr[2]];
        //             return elem;
        //         })
        //         document.querySelector('.tam-tinh').textContent = this.currencyFormat(total);
        //         document.querySelector('.tong-tien').textContent = this.currencyFormat(total);
        //         this.cartTable.tBodies[0].append(...rowsData);
        //         this.AddMountButton({
        //             subTotalQuery:'[data-subtotal]',
        //             priceQuery : '.shoping__cart__price',
        //         });
        //         this.AddInputListener({
        //             parentQuery:'tr',
        //             subTotalQuery:'[data-subtotal]',
        //             priceQuery : '.shoping__cart__price',
        //         })
        //     }
        // })
    }
    UpdateCartListener(){
        document.querySelector('[update-cart]').addEventListener('click',(e)=>{
            e.preventDefault();
            let tBody = document.querySelector('.shoping__cart__table tbody'),
                payLoad = [...tBody.children].map(item=>{
                    return {
                        "product_id" :item.getAttribute('data-id'),
                        "quantity" : item.querySelector('[data-quantity]').value,
                    }
                });
                // console.log([...payLoad])
            fetch('http://localhost:8080/OrganicStore/api-shopping-cart',{
                method : 'PUT',
                body : JSON.stringify(payLoad) 
            })
            .then(res=>res.json())
            .then(message=>{
                console.log(message)
                this.getCartInSesssion();
            })
            .catch(err=> console.log(err));

        })

    }
    getHtml() {
        this.elements.main.innerHTML = html;
        this.cartTable = this.elements.main.querySelector('.shoping__cart__table table');
        this.UpdateCartListener();
    }
    editCartSubListener() {
        const self = this;
        document.querySelector('.cart_container').addEventListener('mouseleave',(e)=>{
            if(document.querySelector('.shoping-cart.spad')){
                let ulElement = e.target.closest('.cart_container').querySelector('#showcartresitem');
                [...ulElement.children].forEach(e=>{
                    let row = document.querySelector(`tr[data-id="${e.getAttribute('id-cart')}"`);
                    row.querySelector('[data-quantity]').value = e.querySelector('.change_mount').value;
                    row.querySelector('[data-subtotal]').textContent = e.querySelector('.tongtiensp').textContent.replace(/,/g,".");
                })
                let total = document.querySelector('#showcartresprice .total b').textContent.replace(/[^0-9]/g,"");
                document.querySelector('.tam-tinh').textContent = self.currencyFormat(total);
                document.querySelector('.tong-tien').textContent = self.currencyFormat(total);
            }
        })
    }
    addRemoveListener() {
        

        document.querySelectorAll('.icon_close').forEach(e=>{
            e.closest('.shoping__cart__item__close').addEventListener('click',evt=>{
                let cartDelete = document.querySelector(`[id-cart='${evt.target.closest('tr').getAttribute('data-id')}']`);
                cartDelete.querySelector('.xoacart').click();
                evt.target.closest('tr').remove();
                this.setTotal(this.elements.tempTotalQuery,this.elements.totalQuery);
            })
        })
        document.querySelector('.cart_subs').addEventListener('click',e=>{
            if(e.target.closest('.xoacart')) {
                let trDelete = document.querySelector(`.shoping__cart__table tr[data-id="${e.target.closest('[id-cart]').getAttribute('id-cart')}"]`);
                if (trDelete) {
                    trDelete.remove();
                    this.setTotal(this.elements.tempTotalQuery,this.elements.totalQuery);
                }
            }
        }) 
    }
}

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
                    <a href="/OrganicStore/shopping" data-link class="primary-btn cart-btn">CONTINUE SHOPPING</a>
                    <a href="#" class="primary-btn cart-btn cart-btn-right" update-cart><span class="icon_loading"></span>
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
                        <li>Subtotal <span class="tam-tinh"></span></li>
                        <li>Total <span class="tong-tien"></span></li>
                    </ul>
                    <a href="/OrganicStore/checkout"  data-link class="primary-btn">PROCEED TO CHECKOUT</a>
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