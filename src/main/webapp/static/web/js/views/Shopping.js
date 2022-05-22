import AbstractView from "/OrganicStore/static/web/js/views/AbstractView.js";

 const html = `
<section class="product spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-5 sidebar-container">
                <div class="sidebar">
                    <div class="sidebar__item">
                        <h4>Department</h4>
                        <ul>
                            
                        </ul>
                    </div>
                    <div class="sidebar__item">
                        <div class="latest-product__text">
                            <h4>Khuyến mãi</h4>
                            <div class="latest-product__slider owl-carousel">
                            
                            </div>
                        </div>
                    </div>
                       
                </div>
            </div>
            <div class="col-lg-9 col-md-7 product-container">
                    <div class="section-title product__discount__title">
                        <h2>Sản phẩm</h2>
                     </div>
               
                <div class="row list__product">
                </div>
                <div class="product__pagination">
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#"><i class="fa fa-long-arrow-right"></i></a>
                </div>
            </div>
        </div>
    </div>
</section>
        `;
export default class Shopping  extends AbstractView{

    constructor(params) {
        super(params);
        this.loadData();
        this.setTitle('Shopping');
        this.getView();
        // this.addProductItem();
    }
    getDiscountProducts(){
        return new Promise((resolve,reject)=> {
            fetch('http://localhost:8080/OrganicStore/api-product-discount')
            .then(res=>res.json())
            .then(data=>{
                let saleProduct = new Array();
                for(const item of data){
                    let  sliderContent = `
                    <a href="#" class="latest-product__item">
                        <div class="latest-product__item__pic">
                            <img src="data:image/jpg;base64,${item.base64Images}" alt="">
                        </div>
                        <div class="latest-product__item__text">
                            <h6>${item.name}</h6>
                            <span>${item.price*(100-item.saleOff)*10}</span>
                            <span>$20.00</span>
                        </div>
                    </a>
                    `;
                    saleProduct.push(this.creatElementFromText(sliderContent));
                }
                let num =4;
                for(let i = 0 ; i<saleProduct.length ;i+=num) {
                    let arr = saleProduct.slice(i,i+num);
                    const wrapper = this.creatElementFromText(`<div class="latest-product__slider__item"></div>`);
                    wrapper.append(...arr);
                    this.mainElement.querySelector('.latest-product__slider.owl-carousel').appendChild(wrapper);
                }
                resolve(saleProduct);
            }).catch(err=>reject(err));
        })
    }
    getProducts(){
        return new Promise((resolve,reject)=>{
            fetch('http://localhost:8080/OrganicStore/api-product')
            .then(res=>res.json())
            .then(data=>{
                let product = new Array() ;
                let saleProduct = new Array();
                for(const item of data) {
                    let text , sliderContent;
                    if(Number(item.saleOff>0)){
                        text = `    
                        <div class="col-lg-4 col-md-6 col-sm-6">
                            <div class="product__discount__item">
                                <div class="product__discount__item__pic set-bg" data-setbg="data:image/jpg;base64,${item.base64Images}">
                                <div class="product__discount__percent">${item.saleOff*-1}%</div>
                                    <ul class="product__item__pic__hover">
                                        <!-- <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                        <li><a href="#"><i class="fa fa-retweet"></i></a></li> -->
                                        <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                                    </ul>
                                </div>
                                <div class="product__discount__item__text">
                                    <h5><a href="#">${item.name}</a></h5>
                                    <div class="product__item__price">1<span>${item.price}</span></div>
                                </div>
                            </div>
                        </div>`
                    } else {
                        text = `    
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="product__item">
                            <div class="product__item__pic set-bg" data-setbg="data:image/jpg;base64,${item.base64Images}">
                                <ul class="product__item__pic__hover">
                                    <!-- <li><a href="#"><i class="fa fa-heart"></i></a></li>
                                    <li><a href="#"><i class="fa fa-retweet"></i></a></li> -->
                                    <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
                                </ul>
                            </div>
                            <div class="product__item__text">
                                <h6><a href="#">${item.name}</a></h6>
                                <h5>${item.price}</h5>
                            </div>
                        </div>
                    </div>`;
                    }
                    product.push(this.creatElementFromText(text));
                   
                }
                this.mainElement.querySelector('.list__product').append(...product);
               
                document.querySelectorAll('[data-setbg]').forEach(e=>{
                    const bg = e.dataset.setbg;
                    e.style.backgroundImage =  `url(${bg})`;
                })
                resolve(product);
            }).catch(err => reject(err));
        })
       
        
    }
    getParentCategories(){
        return new Promise((resolve,reject)=>{
            fetch('http://localhost:8080/OrganicStore/api-category?type=parent')
            .then(res=> res.json())
            .then(data=>{
                let listCategory = new Array();
                for(const item of data) {
                    listCategory.push(this.creatElementFromText(`<li data-id=${item.id}><a href="#">${item.name}</a></li>`));
                }
                this.mainElement.querySelector('.sidebar .sidebar__item ul').append(...listCategory);
                resolve(listCategory);
            }).catch(err => reject(err));
        })
    }
    loadData() {

        Promise.all([this.getProducts(),this .getParentCategories(),this.getDiscountProducts()])
        .then(([products,categories,discountProducts])=>{
            console.log({products});
            console.log({categories});
            console.log({discountProducts});
            $(".latest-product__slider").owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: false,
                nav: true,
                navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true
            });
        })
        
    }
    getView() {
        this.mainElement.innerHTML = html;


    }

}