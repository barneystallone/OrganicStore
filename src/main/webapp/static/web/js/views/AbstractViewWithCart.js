import AbstractView from "/OrganicStore/static/web/js/views/AbstractView.js";

const cartHtml =
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
const toastCheck= `
    <div class="toast__custom success">
        <div class="toast__custom-content">
            <i class="fas fa-solid fa-check check"></i>

            <div class="message">
                <span class="text text-1">Success</span>
                <span class="text text-2">Đã cập nhật giỏ hàng</span>
            </div>
        </div>
        <i class="fa-solid fa-xmark close"></i>

        <div class="progress"></div>
    </div>
`;
const toastFail = `
    <div class="toast__custom danger">
    <div class="toast__custom-content">
        <i class="fas fa-solid fa-xmark danger"></i>

        <div class="message">
            <span class="text text-1">Error</span>
            <span class="text text-2">Chưa thể thêm vào giỏ hàng</span>
        </div>
    </div>
    <i class="fa-solid fa-xmark close"></i>

    <div class="progress"></div>
    </div>
`;

export default class AbstractViewWithCart extends AbstractView {
    constructor(params) {
        super(params);
    }
    getCartInSesssion(){
        // reset
        const showCart = document.querySelector('#showcartresitem');
        while(showCart.firstChild){
            showCart.removeChild(showCart.firstChild);
        }
        document.querySelector('#showcartresprice .total b').textContent = "0";
        // end reset
        return new Promise((resolve,reject)=>{
            fetch("http://localhost:8080/OrganicStore/api-shopping-cart")
            .then(res=>res.json())
            .then(data=>{
                if(Array.isArray(data)){
                    let options;
                    data.forEach(item=>{
                        options = {
                            name : item.product.name,
                            price:  item.product.price*(100-item.product.saleOff)/100,
                            base64Img:  "data:image/jpg;base64,"+ item.product.base64Images
                        }
                        AbstractViewWithCart.AddCartPreview(
                            // this.creatElementFromText(cartHtml),
                            item.product_id,
                            item.quantity,
                            options 
                        );
                    })
                }
                resolve(data);
            }).catch(err=>reject(err));
        })
    }
    static addToCart(idSanPham,quantity,options,isUpdated=true) {
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
                if(isUpdated){
                    const item = document.querySelector(`.cart_info[id-cart="${idSanPham*1}"]`);
                    if(item) {
                        AbstractViewWithCart.UpdateCartQuantity(item,{quantity: quantity, price: options.price});
                    } else {
                        AbstractViewWithCart.AddCartPreview(
                            idSanPham,
                            quantity,
                            options 
                        );
                    }
                }
                resolve(data);
            }).catch(err=>reject(err));
        })
    }

    static AddCartPreview(idSanPham,quantity,options) {
        const template = document.createElement('template');
        template.innerHTML = cartHtml.trim();
        const cartInfo = template.content.firstElementChild;
        cartInfo.setAttribute('id-cart',`${idSanPham*1}`);
        const 
            img = cartInfo.querySelector('.left img'),
            price = cartInfo.querySelector('span.sale b'),
            subPrice = cartInfo.querySelector('.total .tongtiensp'),
            mount = cartInfo.querySelector('.choose_size_and_mount .mount input'),
            total =document.querySelector('#showcartresprice .total b'),
            name =  cartInfo.querySelector('.right span.name');

        img.setAttribute('src',`${options.base64Img}`);
        name.textContent = options.name;
        price.textContent = (options.price*1).toLocaleString('vi-VN').replace(/\./g,",");
        mount.value = quantity;
        
        let totalPrice = total.textContent.replace(/,/g,"")*1;
        subPrice.textContent = (options.price * quantity).toLocaleString('vi-VN').replace(/\./g,",");
        total.textContent = (totalPrice + options.price * quantity).toLocaleString('vi-VN').replace(/\./g,",");

        document.querySelector('#showcartresitem').insertAdjacentElement('afterbegin',cartInfo);
    } 

    static UpdateCartQuantity(item,options) {
        const 
                subPrice = item.querySelector('.total .tongtiensp'),
                mount = item.querySelector('.choose_size_and_mount .mount input'),
                total =document.querySelector('#showcartresprice .total b');
            
            mount.value = mount.value*1 + options.quantity;
            let oldSubValue = subPrice.textContent.replace(/,/g,"")*1,
                newSubValue = mount.value*options.price,
                oldTotalValue= total.textContent.replace(/,/g,"")*1;
            subPrice.textContent =newSubValue.toLocaleString('vi-VN').replace(/\./g,",");
            total.textContent = (oldTotalValue+ newSubValue-oldSubValue).toLocaleString('vi-VN').replace(/\./g,",")
    }
    
    ToggleToast(status=true){
        const 
            toast = status ? this.creatElementFromText(toastCheck) : this.creatElementFromText(toastFail),
            closeIcon = toast.querySelector(".close"),
            wrapper = document.querySelector('.toast-wrapper'),
            progress = toast.querySelector(".progress");
            toast.setAttribute('index',this.orderClick++);

        wrapper.classList.remove('display-none');  
        wrapper.innerHTML ="";
        wrapper.insertAdjacentElement('afterbegin',toast);
        
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);

        toast.classList.add("active");
        progress.classList.add("active");
        
        this.timer1 = setTimeout(() => {
            toast.classList.remove("active");
        }, 4200); //1s = 1000 milliseconds

        this.timer2 = setTimeout(() => {
            progress.classList.remove("active");
            wrapper.classList.add('display-none');
        }, 4500);
        closeIcon.addEventListener("click", () => {
            toast.classList.remove("active");
            
            setTimeout(() => {
                progress.classList.remove("active");
                wrapper.classList.add('display-none');
            }, 300);

            clearTimeout(this.timer1);
            clearTimeout(this.timer2);
        });

    }

    static DeleteCart(item,idSanPham) {
        return new Promise((resolve,reject)=>{
            fetch(' http://localhost:8080/OrganicStore/api-shopping-cart',{
                method : 'DELETE',
                body : JSON.stringify({product_id : idSanPham})
            })
            .then(res=>res.json())
            .then(message=>{
                if(message.success){
                    let subPrice = item.querySelector('.tongtiensp').textContent.replace(/,/g,""),
                        totalPriceTag = document.querySelector('#showcartresprice .total b'),
                        temp = totalPriceTag.textContent.replace(/,/g,"") - subPrice;
                    console.log({subPrice,temp});
                    totalPriceTag.textContent = ((temp>0) ? temp : 0).toLocaleString('vi-VN').replace(/\./g,",");
                    item.remove();
                }
            })
        })
    }

    AddMountButton (options=null) {
        let subTotal,total,price,delay,
            // isChangeSubTotal = options ?(options.priceQuery!=null&&options.subTotalQuery!=null) : false;
            isChangeSubTotal = options ?(options.priceQuery!=null&&options.subTotalQuery!=null&&options.tempTotalQuery) : false;
        var proQty = $('.pro-qty');
        proQty.prepend('<span class="dec qtybtn">-</span>');
        proQty.append('<span class="inc qtybtn">+</span>');
        proQty.on('click', '.qtybtn', function() {
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            if ($button.hasClass('inc')) {
                var newVal = parseFloat(oldValue) + 1;
               
            } else {
                if (oldValue > 1) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 1;
                }
            }
            $button.parent().find('input').val(newVal);
            if(isChangeSubTotal){
                total = document.querySelector(options.tempTotalQuery);
                price = $button.closest('tr').find(options.priceQuery).text().replace(/[^0-9]/g,"");
                let subTotalelem = $button.closest('tr').find(options.subTotalQuery),
                    oldSubPrice = subTotalelem.text().replace(/[^0-9]/g,""),
                    newSubPrice = price*newVal;
                total.textContent = total.textContent.replace(/[^0-9]/g,"")*1 + newSubPrice - oldSubPrice;
                total.textContent = (total.textContent*1).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
                subTotal = $button.closest('tr').find(options.subTotalQuery).text(
                    (price*newVal).toLocaleString('vi-VN')
                );
                if(options.totalQuery) {
                    document.querySelector(options.totalQuery).textContent = total.textContent;
                }
            }
        });
    };
    setTotal (tempTotalQuery,totalQuery=null) {
        if(tempTotalQuery) {
            this.delay2 = setTimeout(()=>{
                let total,
                    tempTotal = document.querySelector(tempTotalQuery);
                total = [...document.querySelectorAll('.shoping__cart__total')].reduce((acc,curr)=>{
                    return acc*1 + curr.textContent.replace(/[^0-9]/g,"")*1;
                },0)
                tempTotal.textContent = total.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
                if(totalQuery) {
                    document.querySelector(totalQuery).textContent = tempTotal.textContent;
                }
            },0)
        }
    }
    AddInputListener(options=null) {
        let subTotal,price,delay ,
            isChangeSubTotal = options ?(options.parentQuery!=null&&options.priceQuery!=null&&options.subTotalQuery!=null) : false;
        

        
        document.querySelectorAll('.pro-qty input').forEach(elem=>{
            elem.addEventListener('keydown',(e)=>{
                let key =e.key;
                if(!((key >= '0' && key <= '9')||key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace')){
                    e.preventDefault();
                } else {
                    clearTimeout(delay);
                    clearTimeout(this.delay2);
                }
            })
        })

        document.querySelectorAll('.pro-qty input').forEach(elem=>{
            elem.addEventListener('keyup',(e)=>{
                
                e.target.value = e.target.value.replace(/(^0+)(\d+)/g,"$2");
               
                if(e.target.value==""||e.target.value=="0"){
                    delay = setTimeout(()=>{
                        e.target.value = "1";
                        if(isChangeSubTotal) {
                            subTotal = e.target.closest(options.parentQuery).querySelector(options.subTotalQuery);
                            price = e.target.closest(options.parentQuery).querySelector(options.priceQuery).textContent.replace(/[^0-9]/,"");
                            subTotal.textContent = (price*1).toLocaleString('vi-VN');

                            let totalQuery  = (options.totalQuery) ? options.totalQuery : null;
                            this.setTotal(options.tempTotalQuery,totalQuery);

                        }
                    },500)
                } else {
                    if(isChangeSubTotal) {
                        subTotal = e.target.closest(options.parentQuery).querySelector(options.subTotalQuery);
                        price = e.target.closest(options.parentQuery).querySelector(options.priceQuery).textContent.replace(/[^0-9]/,"");
                        subTotal.textContent = (price*e.target.value).toLocaleString('vi-VN');

                        let totalQuery  = (options.totalQuery) ? options.totalQuery : null;
                        this.setTotal(options.tempTotalQuery,totalQuery);

                    }
                }
            })
       })
    }
}
