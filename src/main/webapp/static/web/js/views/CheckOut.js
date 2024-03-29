import AbstractViewWithCart from "/OrganicStore/static/web/js/views/AbstractViewWithCart.js";
import IntergrateGoogleMap from "/OrganicStore/static/web/js/utils/IntergrateGoogleMap.js";
import {AddAreaEventListener,initArea} from "/OrganicStore/static/common/AreaUtils.js";
import { convertToNumber } from "/OrganicStore/static/web/js/utils/format.js";

export default class CheckOut extends AbstractViewWithCart {
    constructor(params) {
        super(params);
        this.getCartInSesssion()
        .then(()=>{
            this.InitOrderList();
            const self = this;
            document.querySelector('.cart_container').addEventListener('mouseleave',()=>{
                if(document.querySelector('.checkout__order')){
                    self.InitOrderList();
                }
            });
        }).catch(err=>console.log(err));
        
        this.getHTML();
        
        this.SubmitListener();
        this.elements.successToggle = {
            text1: "Success",
            text2: "Thanh toán thành công. Reset giỏ hàng",
        }
    }

    getHTML() {
        let mainInner = this.creatElementFromText(html);
        initArea(mainInner.querySelector('#city'),mainInner.querySelector('#district'),mainInner.querySelector('#subDistrict'));
        AddAreaEventListener(mainInner.querySelector('#district'),mainInner.querySelector('#subDistrict'));
        this.elements.main.innerHTML = "";
        this.elements.main.appendChild(mainInner);
        
        const intergrateGoogleMap = new IntergrateGoogleMap();
    }
    InitOrderList(){
        const orderList = document.querySelector('.order-list'),
              shippingFee= document.querySelector('.checkout__shipping__total span').textContent.replace(/[^0-9]/g,""),
              total = document.querySelector('#showcartresprice .total b').textContent.replace(/[^0-9]/g,"");
        orderList.innerHTML="";
        [...document.querySelector('#showcartresitem').children].forEach(e=>{
            const   name = e.querySelector('span.name').textContent,
                    mount = e.querySelector('input.change_mount').value,
                    id = e.getAttribute('id-cart'),
                    subTotal= this.currencyFormat(e.querySelector('.tongtiensp').textContent.replace(/[^0-9]/g,""));
            orderList.insertAdjacentHTML('beforeend',`<li data-id=${id}>${name}&nbsp;&nbsp;(x${mount}) <span>${subTotal}</span></li>`)
        })
        document.querySelector('.checkout__order__subtotal span').textContent =this.currencyFormat( total);
        document.querySelector('.checkout__order__total span').textContent = this.currencyFormat(total*1 + shippingFee*1);
    }
    SubmitListener() {
        document.querySelector('[order-submit]').addEventListener('click',(e)=>{
            if(e.target.closest('[order-submit]').classList.contains('disable')){
                e.preventDefault();
                return;
            }
            let payLoad = {
                "customer": {
                    "name" : document.querySelector('#customer_name').value,
                    "email" :document.querySelector('#customer_email').value,
                    "phoneNumber": document.querySelector('#customer_phone').value,
                    "houseStreet":  document.querySelector('#customer_street').value,
                    "areaId" : document.querySelector('#subDistrict').value,
                },
                "shippingFee": convertToNumber(document.querySelector('.checkout__shipping__total span').textContent) 
            }
            fetch('http://localhost:8080/OrganicStore//api-order-cart',{
                method :'POST',
                body : JSON.stringify(payLoad),
            }).then(res=>res.json())
            .then(data=>{
                if(data.status=="0"){
                    this.elements.failToggle = {
                        text1 : data.message.split('.')[0],
                        text2 : data.message.split('.')[1]
                    }
                    new AbstractViewWithCart().ToggleToast( this.elements.failToggle,false);
                }
                else {
                    new AbstractViewWithCart().ToggleToast( this.elements.successToggle);
                }
            })
            e.preventDefault();

        })
    }
}

const html = `<div class="checkout spad">
<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <h6><span class="icon_tag_alt"></span> Have a coupon? <a href="#">Click here</a> to enter your code
            </h6>
        </div>
    </div>
    <div class="checkout__form">
        <h4>Billing Details</h4>
        <form action="#">
            <div class="row">
                <div class="col-lg-8 col-md-6">
                    <div class="row">
                        <div class="col-lg">
                            <div class="checkout__input">
                                <p>Họ và tên<span>*</span></p>
                                <input type="text" id="customer_name" required>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg">
                            <div class="checkout__input">
                                <p>Số điện thoại<span>*</span></p>
                                <input type="text" id="customer_phone" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="row">
                        
                        <div class="col-lg">
                            <div class="checkout__input">
                                <p>Email<span>*</span></p>
                                <input type="text" id="customer_email" required>
                            </div>
                        </div>
                        <div class="col-lg" style="display:none;">
                            <div class="checkout__input">
                                <p>Tỉnh/Thành phố<span>*</span></p>
                                <!-- <input type="text"> -->
                                <select id="city" class="" name="city">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="display:none;">
                        
                        <div class="col-lg"> 
                            <div class="checkout__input">
                                <p>Quận/Huyện<span>*</span></p>
                                <select district id="district" class="" name="" >
                                </select>
                            </div>
                        </div>
                        <div class="col-lg">
                            <div class="checkout__input">
                                <p>Xã/Phường<span>*</span></p>
                                <select district id="subDistrict" class="" name="areaId" >
                                </select>
                            </div>
                        </div>
                       
                    </div>
                    <div class="checkout__input">
                        <p>Địa chỉ<span>*</span></p>
                        <input type="text" id="customer_street"placeholder="Street Address" class="checkout__input__add">
                        <p class='warning d-none'></p>
                    </div>
                    <div class="checkout__input">
                        <p>Ghi chú <span></span></p>
                        <textarea name="note" id="checkout_note"  rows="5" style="width:100%; resize:none;"></textarea>
                        <p class='warning d-none'></p>
                    </div>

                    
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="checkout__order">
                        <h4>Your Order</h4>
                        <div class="checkout__order__products">Products <span>Total</span></div>
                        <ul class="order-list">
                            <li>Vegetable’s Package <span>$75.99</span></li>
                            <li>Fresh Vegetable <span>$151.99</span></li>
                            <li>Organic Bananas <span>$53.99</span></li>
                        </ul>
                        <div class="checkout__order__subtotal">Subtotal <span>$750.99</span></div>
                        <div class="checkout__shipping__total">Shipping <e></e> <span>0</span></div>
                        <div class="checkout__order__total">Total <span>$750.99</span></div>
                        
                        <button type="button" class="site-btn" order-submit>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
        <div id="google-map">
            <div id="map-panel"></div>
            <div id="map-sidebar"></div>
        </div>        
    </div>
</div>
</div>`;