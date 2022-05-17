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
}