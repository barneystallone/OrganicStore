/**
 * 
 */
 export default class {
	constructor(params) {
        this.params = params;
    }
    
    setTitle(title) {
        document.title = title;
    }
    getHtml(elem){
        const content="";
        elem.innerHTML= content ; 
    }
    getScript(){}
    // elementFrom(html){
    //     const template = document.createElement("template");
    //     template.innerHTML = html;
    //     return template.content.firstElementChild;
    // }
}