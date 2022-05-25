import AbstractViewWithCart from "/OrganicStore/static/web/js/views/AbstractViewWithCart.js";

// const cartClass = new AbstractViewWithCart();
class CartSub {
    constructor(cartSub) {
        this.elements = {
            main : cartSub,
            footer : cartSub.querySelector('li.last'),
        };
        this.addListener();
    }
    addListener(){
        let delay, oldInputValue;
        this.elements.main.addEventListener('click',(e)=>{
            if(e.target.closest('input')){
                oldInputValue =  e.target.closest('input').value;
            }
            if(e.target.closest('.btn.xoacart')){
                const cartDelete = e.target.closest('.cart_info');
                AbstractViewWithCart.DeleteCart(cartDelete,cartDelete.getAttribute('id-cart'));
            }
            if(e.target.closest('.mount-btn')) {
                const   input = e.target.closest('.mount').querySelector('input'),
                        oldValue = input.value*1;

                // this.addChangeEvent(input);
                let button = e.target.closest('.mount-btn');
                let quantity,
                    price = input.closest('.right').querySelector('b[data-price-id]').innerText.replace(/,/g,"");
                    

                if(button.classList.contains('incr')) {
                    quantity = 1;
                } else if (button.classList.contains('descr')) {
                    quantity = (oldValue>1) ? -1: 0;
                }
                // update 
                AbstractViewWithCart.addToCart(
                    input.closest(`[id-cart]`).getAttribute('id-cart'),quantity, {price:price}
                )

            }
        })

        this.elements.main.addEventListener('input',(e)=>{
            
            const   input = e.target.closest('input.change_mount');
            if(input) {
                clearTimeout(delay);
                let quantity,
                    price = input.closest('.right').querySelector('b[data-price-id]').innerText.replace(/,/g,"");
                // const val = input.value;

                delay = setTimeout(()=>{
                    input.value = input.value.replace(/^0+(\d*)/g,"$1");
                    if(input.value==""){ 
                        input.value = "1";
                        quantity =  input.value - oldInputValue;
                        console.log(quantity);
                        AbstractViewWithCart.addToCart(
                            input.closest(`[id-cart]`).getAttribute('id-cart'),quantity, {price:price}, false
                        )
                        this.updateSubPrice(e.target.closest('.right'));
                        oldInputValue = input.value;
                        console.log({quantity});
                    } else {
                        quantity =  input.value - oldInputValue ;
                    
                        AbstractViewWithCart.addToCart(
                            input.closest(`[id-cart]`).getAttribute('id-cart'),quantity, {price:price}, false
                        )
                        this.updateSubPrice(e.target.closest('.right'));
                        oldInputValue = input.value;
                        console.log({quantity});
                    }
                },500)                
            } else {
                e.preventDefault();
            }
        })

        
        this.elements.main.addEventListener('keydown',(e)=>{
            const   input = e.target.closest('input.change_mount');
            if(input) {
                let key = e.key;
                if(!((key >= '0' && key <= '9')||key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace')) {
                    e.preventDefault();
                } 
            } else {
                e.preventDefault();
            }
        })
    }

    updateSubPrice(cart_right){
        const   subTotalElem = cart_right.querySelector('b.tongtiensp'),
                quantity = cart_right.querySelector('.mount input').value,
                totalPriceElem = this.elements.footer.querySelector('span.total b'),
                // price = cart_right.querySelector('.sale b').innerText.replace(/,/g,""),
                price = cart_right.querySelector('.sale b').innerText.replace(/,/g,""),
                oldValue = subTotalElem.innerText.replace(/,/g,"")*1;
        let newValue =  quantity * price,
            totalPrice = totalPriceElem.innerText.replace(/,/g,"")*1;
        console.log({totalPrice});
        subTotalElem.innerText = newValue.toLocaleString('vi-VN').replace(/\./g,",");
        totalPriceElem.innerText = (totalPrice + newValue - oldValue).toLocaleString('vi-VN').replace(/\./g,",");
    }
}

export default CartSub;