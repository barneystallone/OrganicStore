export default class AbstractView {

    constructor(params) {
        this.params = params;
        this.mainElement = document.querySelector('.main'); 
    }

    setTitle(title) {
        document.title = title;
    }

    creatElementFromText(html) {
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    }
}