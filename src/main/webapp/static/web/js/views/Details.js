import AbstractViewWithCart from "/OrganicStore/static/web/js/views/AbstractViewWithCart.js";
// import AbstractView from "/OrganicStore/static/web/js/views/AbstractView.js";

 const html = `
 <section class="product-details spad">
 <div class="container">
     <div class="row">
         <div class="col-lg-6 col-md-6">
             <div class="product__details__pic">
                 <div class="product__details__pic__item">
                 </div>
                 <div class="product__details__pic__slider owl-carousel">
                     
                 </div>
             </div>
         </div>
         <div class="col-lg-6 col-md-6">
             <div class="product__details__text">
                <div class="product__details__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-half-o"></i>
                    <span>(18 reviews)</span>
                </div>
                 <p>Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam
                     vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet
                     quam vehicula elementum sed sit amet dui. Proin eget tortor risus.</p>
                 <div class="product__details__quantity">
                     <div class="quantity">
                         <div class="pro-qty">
                             <input type="text" value="1">
                         </div>
                     </div>
                 </div>
                 <button type="button" class="primary-btn add-btn" style="border:none;">ADD TO CARD</button>
                 <ul>
                     <li><b>Availability</b> <span>In Stock</span></li>
                     <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                     <li><b>Weight</b> <span>0.5 kg</span></li>
                     <li><b>Share on</b>
                         <div class="share">
                             <a href="#"><i class="fa-brands fa-facebook-f"></i></i></a>
                             <a href="#"><i class="fa-brands fa-twitter"></i></i></a>
                             <a href="#"><i class="fa-brands fa-linkedin-in"></i></i></a>
                             <a href="#"><i class="fa-brands fa-pinterest-p"></i></i></a>
                         </div>
                     </li>
                 </ul>
             </div>
         </div>
         <div class="col-lg-12">
             <div class="product__details__tab">
                 <ul class="nav nav-tabs" role="tablist">
                     <li class="nav-item">
                         <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab"
                             aria-selected="true">Description</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab"
                             aria-selected="false">Information</a>
                     </li>
                     <li class="nav-item">
                         <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab"
                             aria-selected="false">Reviews <span>(1)</span></a>
                     </li>
                 </ul>
                 <div class="tab-content">
                     <div class="tab-pane active" id="tabs-1" role="tabpanel">
                         <div class="product__details__tab__desc">
                             <h6>Products Infomation</h6>
                             <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                 Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus
                                 suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam
                                 vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada.
                                 Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat,
                                 accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a
                                 pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula
                                 elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus
                                 et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam
                                 vel, ullamcorper sit amet ligula. Proin eget tortor risus.</p>
                                 <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem
                                 ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet
                                 elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum
                                 porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus
                                 nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                                 Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed
                                 porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum
                                 sed sit amet dui. Proin eget tortor risus.</p>
                         </div>
                     </div>
                     <div class="tab-pane" id="tabs-2" role="tabpanel">
                         <div class="product__details__tab__desc">
                             <h6>Products Infomation</h6>
                             <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                 Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
                                 Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam
                                 sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo
                                 eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
                                 Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent
                                 sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac
                                 diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante
                                 ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                                 Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                                 Proin eget tortor risus.</p>
                             <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem
                                 ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit aliquet
                                 elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum
                                 porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus
                                 nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.</p>
                         </div>
                     </div>
                     <div class="tab-pane" id="tabs-3" role="tabpanel">
                         <div class="product__details__tab__desc">
                             <h6>Products Infomation</h6>
                             <p>Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
                                 Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus.
                                 Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam
                                 sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo
                                 eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat.
                                 Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent
                                 sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac
                                 diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante
                                 ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;
                                 Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.
                                 Proin eget tortor risus.</p>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
</section>
`;
const toastCheck= `
    <div class="toast__custom">
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
    <div class="toast__custom">
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
export default class DetailItem  extends AbstractViewWithCart{

    constructor(params) {
        super(params);
        console.log(params[":id"].split(/[^\d]/g)[0].replace(/0+/g,"")*1);
        this.productId = params[":id"].split(/[^\d]/g)[0].replace(/0+/g,"")*1;
        this.loadProductData(this.productId);
        this.setTitle('Shopping');
        this.getView();
        this.orderClick = 1;

    }
    // ToggleToast(toast){
    //     const 
    //         closeIcon = toast.querySelector(".close"),
    //         wrapper = document.querySelector('.toast-wrapper'),
    //         progress = toast.querySelector(".progress");
    //         toast.setAttribute('index',this.orderClick++);
    //     wrapper.classList.remove('display-none');  
    //     wrapper.innerHTML ="";
    //     wrapper.insertAdjacentElement('afterbegin',toast);
        
    //     clearTimeout(this.timer1);
    //     clearTimeout(this.timer2);

    //     toast.classList.add("active");
    //     progress.classList.add("active");
        
    //     this.timer1 = setTimeout(() => {
    //         toast.classList.remove("active");
    //     }, 4200); //1s = 1000 milliseconds

    //     this.timer2 = setTimeout(() => {
    //         progress.classList.remove("active");
    //         wrapper.classList.add('display-none');
    //     }, 4500);
    //     closeIcon.addEventListener("click", () => {
    //         toast.classList.remove("active");
            
    //         setTimeout(() => {
    //             progress.classList.remove("active");
    //             wrapper.classList.add('display-none');
    //         }, 300);

    //         clearTimeout(this.timer1);
    //         clearTimeout(this.timer2);
    //     });

    // }
    addOrderEvent(){
        document.querySelector('.add-btn').addEventListener('click',()=>{
            let payLoad = {
                product_id : document.querySelector('.product-details').dataset.id*1,
                quantity : document.querySelector('.pro-qty input').value*1
            }
            const   quantity =  document.querySelector('.pro-qty input').value*1,
                    name = document.querySelector('#sanPham').innerText,
                    price = document.querySelector('.product__details__price').dataset.price,
                    base64Img = document.querySelector('.product__details__pic__item--large').getAttribute('src');
            
            let options = {
                name : name,
                price: price,
                base64Img: base64Img

            }
         
            this.addToCart(this.params[":id"],quantity,options).then(data=>{
                this.ToggleToast();
            }).catch(()=>{
                this.ToggleToast(false);
            })

               // fetch(" http://localhost:8080/OrganicStore/api-shopping-cart",{
            //     method : 'POST',
            //     body : JSON.stringify(payLoad)
            // })
            // .then(res=>res.json())
            // .then(()=>{
            //     this.ToggleToast(this.creatElementFromText(toastCheck));
            // })
        })
    }
    loadProductData(id){
        fetch(`http://localhost:8080/OrganicStore/api-product?id=${id}`)
        .then(res=>res.json())
        .then(data=>{
            let format = this.currencyFormat(data.price)
                
            console.log(data);
            document.querySelector('.product-details').setAttribute('data-id',data.id);
            let elem = document.querySelector('.product__details__pic__item');
            elem.appendChild(this.creatElementFromText(`
            <img class="product__details__pic__item--large"
            src="data:image/jpg;base64,${data.base64Images}" alt="">
            `))

            elem =  document.querySelector('.product__details__rating');
            elem.insertAdjacentHTML('beforebegin', 
                `
                    <h3 id="sanPham">${data.name}</h3>
                `
            );
            if(data.saleOff>0){
                let newPrice = data.price*(100-data.saleOff)/100,
                    newformat = this.currencyFormat(newPrice);
                elem.insertAdjacentHTML('afterend',
                    `
                    <div class="product__details__price" data-price="${newPrice}">${newformat}<span>${format}</span></div> 
                    `
                );
            } else {
                elem.insertAdjacentHTML('afterend',
                `
                <div class="product__details__price" data-price="${data.price}">${format}</div> 
                `
            );
            }
            document.querySelector('.product__details__text ul li:first-child span').innerText = `${data.in_stock} sản phẩm`;
            elem = document.querySelector('.product__details__pic__slider.owl-carousel');
            for (let i=0;i<4;i++){
                elem.appendChild(this.creatElementFromText(
                    `
                    <img data-imgbigurl="data:image/jpg;base64,${data.base64Images}"
                    src="data:image/jpg;base64,${data.base64Images}" alt="">
                    `
                ))
            }
            $('.product__details__pic__slider img').on('click', function() {

                var imgurl = $(this).data('imgbigurl');
                var bigImg = $('.product__details__pic__item--large').attr('src');
                if (imgurl != bigImg) {
                    $('.product__details__pic__item--large').attr({
                        src: imgurl
                    });
                }
            });

            $(".product__details__pic__slider").owlCarousel({
                loop: true,
                margin: 20,
                items: 4,
                dots: true,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true
            });

        })
    }
    getView() {
        this.mainElement.innerHTML = html;
        this.addOrderEvent();
        var proQty = $('.pro-qty');
        proQty.prepend('<span class="dec qtybtn">-</span>');
        proQty.append('<span class="inc qtybtn">+</span>');
        proQty.on('click', '.qtybtn', function() {
            var $button = $(this);
            var oldValue = $button.parent().find('input').val();
            if ($button.hasClass('inc')) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                if (oldValue > 0) {
                    var newVal = parseFloat(oldValue) - 1;
                } else {
                    newVal = 0;
                }
            }
            $button.parent().find('input').val(newVal);
        });
        
        document.querySelector('.pro-qty input').addEventListener('keydown',(e)=>{
            let key =e.key;
            if(!((key >= '0' && key <= '9')||key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace')){
                e.preventDefault();
            }
        })
        document.querySelector('.pro-qty input').addEventListener('keyup',(e)=>{
            e.target.value = e.target.value.replace(/(^0+)(\d+)/g,"$2")
           if(e.target.value==""){
               e.target.value = "0";
           }
       })
        let elem = document.querySelector('.product__details__pic__item');
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
        elem = document.querySelector('.product__details__pic__slider.owl-carousel');
        while(elem.firstChild){
            elem.removeChild(elem.firstChild);
        }
        
    }

}