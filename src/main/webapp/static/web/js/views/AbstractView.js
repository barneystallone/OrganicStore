export default class AbstractView {

    constructor(params) {
        this.params = params;
        this.elements = {
            main : document.querySelector('.main'),
            successToggle : {
                text1:"Success",
                text2:"Cập nhật giỏ hàng thành công"
            },
            failToggle : {
                text1:"Error",
                text2:"Chưa thể thêm vào giỏ hàng"
            },
        }
        // this.mainElement = document.querySelector('.main'); 
    }

    setTitle(title) {
        document.title = title;
    }

    creatElementFromText(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    }
    currencyFormat(price) {
        return (price*1).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    }

    
}