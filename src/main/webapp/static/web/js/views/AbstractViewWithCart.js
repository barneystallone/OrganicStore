import AbstractView from "/OrganicStore/static/web/js/views/AbstractView.js";

const cart_info =
`
<li class="cart_info" id-cart="5991">
<div class="cart_info_left">
    <div class="summary_cart">
        <div class="cart_mobile">
            <div class="left">
                <img src="https://image.fmstyle.com.vn/images/products/761047_1635597529.jpg" alt="">
            </div>
            <div class="right">
                <div class="top">
                    <div class="title">
                        <span class="name">LEN NAM CỔ TRÒN THÊU MÀU NGỰC VAI</span>
                    </div>
                    <div class="price_and_sale">
                        <span class="sale"><b data-price-id="5991">345.000</b><span class="vnd"></span></span>
                        <span class="price"></span>
                    </div>
                </div>
                <div class="choose_size_and_mount">
                    <div class="size">
                        <span>Số lượng: </span>
                        <div class="mount">
                            <button type="" class="descr mount-btn" data-price-id="5991"><i class="fas fa-minus"></i></button>
                            <input type="text" class="change_mount" name="change_mount"  value="1">
                            <button type="" class="incr mount-btn" data-price-id="5991"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <div class="total">
                        <button value="5991" class="btn xoacart"> <i class="far fa-trash-alt trash_cart"></i></button>
                        <span> Tổng cộng: <b class="tongtiensp" data-price-id="5991">345,000</b><span class="vnd"></span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</li>
`
export default class AbstractViewWithCart extends AbstractView {

    constructor(params) {
        super(params);
        this.elements = {
            // cart_subs : document.querySelector('.cart_subs'),
            main : document.querySelector('#showcartresitem'),
            cart_info : this.creatElementFromText(cart_info),
        }
    }

    addToCart(idSanPham,quantity,options) {
        let payLoad = {
            product_id : idSanPham*1,
            quantity :quantity*1
        }
        return new Promise((resolve,reject)=>{
            fetch(" http://localhost:8080/OrganicStore/api-shopping-cart",{
                method : 'POST',
                body : JSON.stringify(payLoad)
            })
            .then(res=>res.json())
            .then(data=>{
                const item = document.querySelector(`.cart_info[id-cart="${idSanPham*1}"]`)
                if(item==null) {
                    this.elements.cart_info.setAttribute('id-cart',`${idSanPham*1}`);
                    const 
                        img = this.elements.cart_info.querySelector('.left img'),
                        price = this.elements.cart_info.querySelector('span.sale b'),
                        subPrice = this.elements.cart_info.querySelector('.total .tongtiensp'),
                        mount = this.elements.cart_info.querySelector('.choose_size_and_mount .mount input'),
                        total =document.querySelector('#showcartresprice .total b'),
                        name =  this.elements.cart_info.querySelector('.right span.name');

                    img.setAttribute('src',`${options.base64Img}`);
                    name.textContent = options.name;
                    price.textContent = options.price.toLocaleString('vi-VN').replace(/\./g,",");
                    mount.value = quantity;
                    
                    let totalPrice = total.textContent.replace(/,/g,"")*1;
                    subPrice.textContent = (options.price * quantity).toLocaleString('vi-VN').replace(/\./g,",");
                    total.textContent = (totalPrice + options.price * quantity).toLocaleString('vi-VN').replace(/\./g,",");

                    this.elements.main.insertAdjacentElement('afterbegin',this.elements.cart_info);
                } else {
                    // const item = document.querySelector(`.cart_info[id-cart="${idSanPham*1}"]`);
                    const 
                        subPrice = item.querySelector('.total .tongtiensp'),
                        mount = item.querySelector('.choose_size_and_mount .mount input'),
                        total =document.querySelector('#showcartresprice .total b');
                    
                    mount.value = mount.value*1 + quantity;
                    let oldSubValue = subPrice.textContent.replace(/,/g,"")*1,
                        newSubValue = mount.value*options.price,
                        oldTotalValue= total.textContent.replace(/,/g,"")*1;
                    subPrice.textContent =newSubValue.toLocaleString('vi-VN').replace(/\./g,",");
                    total.textContent = (oldTotalValue+ newSubValue-oldSubValue).toLocaleString('vi-VN').replace(/\./g,",")

                }
                resolve(data);
            }).catch(err=>reject(err));
        })
    }
}
