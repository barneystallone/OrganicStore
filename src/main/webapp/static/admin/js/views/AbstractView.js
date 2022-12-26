/**
 * 
 */
 export default class {
	constructor(params) {
        this.params = params;
        this.mainElement = document.querySelector('.main');
    }
    
    setTitle(title) {
        document.title = title;
    }
    getAsync(){}
    getHtml(elem){
        const content="";
        elem.innerHTML= content ; 
    }
    getScript(){

    }
    elementFrom(html){
        const template = document.createElement("template");
        template.innerHTML = html;
        return template.content.firstElementChild;
    }
    formatDate(timstamp){
        const format = (number) => {
            return(number<10) ? `0${number}` : number 
        }
        const date = new Date(timstamp);
        let day = format(date.getDate());
        let month = format(date.getMonth()+1);
        let hour = format(date.getHours());
        let minute =format(date.getMinutes());
        return day  + "-" + month + "-" + date.getFullYear() + " " +
        hour + ":" + minute;
    }
    currencyFormat(price) {
        return (price*1).toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    }
    convertToNumber(strPrice) {
        return strPrice.replace(/[^0-9]/g,"")*1
    }
    addNumberKeydownListener(element) {
        element.addEventListener('keydown', (e)=> {
            const keyCode = e.keyCode;
            if(!((40>=keyCode&& keyCode>=37) || (7<keyCode&&keyCode<10)||(keyCode==13) || (57>=keyCode && keyCode>=48))) {
                e.preventDefault();
            }
            // console.log(e.keyCode);
        })
    }
}