class CartSub {
    constructor(cartSub) {
        this.elements = {
            main : cartSub,
            footer : cartSub.querySelector('li.last'),
        };
        this.addListener();
    }
    addListener(){
        this.elements.main.addEventListener('click',(e)=>{
            
            if(e.target.closest('.mount-btn')) {
                const   input = e.target.closest('.mount').querySelector('input'),
                        oldValue = input.value*1;
                // this.addChangeEvent(input);
                let button = e.target.closest('.mount-btn');
                let newVal;
                if(button.classList.contains('incr')) {
                    newVal = oldValue+1;
                    // input.value = newVal;
                } else if (button.classList.contains('descr')) {
                    newVal = (oldValue>1) ? (oldValue - 1 ): 1;
                }
                input.value = newVal;
                this.updateSubPrice(e.target.closest('.right'));
            }
        })
        let delay;
        this.elements.main.addEventListener('keyup',(e)=>{
            const   input = e.target.closest('input.change_mount');
            if(input) {
                input.value = input.value.replace(/^0+$/g,"");
                input.value = input.value.replace(/^0+(\d+)/g,"$1")
                if(input.value==""){
                    delay = setTimeout(()=>{
                        input.value = "1";
                        this.updateSubPrice(e.target.closest('.right'));
                    },500)
                } else {
                    this.updateSubPrice(e.target.closest('.right'));
                }

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
                } else {
                    if(input.value=="" ){
                        clearTimeout(delay);
                    }
                   
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