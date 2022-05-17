// import AbstractView from "./AbstractView";
import AbstractView from "/OrganicStore/static/admin/js/views/AbstractView.js";
export const loginHtmlModal = `
<form  class="modal">
    <div class="modal-container login-form">
        <header class="modal-header">
            <i class="modal-heading-icon fa-solid fa-user"></i>
            Login
        </header>
        <div class="modal-body login-group">
            <input id="username" name="username" type="text" class="modal-input" placeholder="Username" required>
            <input id="password" type="password" class="modal-input" placeholder="Password" name="password" required>
        </div>
        <div class="modal-footer modal-toggle"  >
            <button id="modal-btn" type="submit">
                Save
            </button>
        </div>
        <div class="login-form__links">
            <a class="login-form__link" href="#">Forgot your password?</a>
        </div>
    </div>
</form>
`;

export  class Login extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Login");
        this.getHtml();
        
    }
    getHtml() {
        document.querySelector("body").classList.add("hidden");
        setTimeout(()=>{
            this.mainElement.innerHTML = `<form  class="modal active">
            <div class="modal-container login-form">
                <div class="modal-close modal-toggle" >
                    <i class="fa-solid fa-xmark"></i>
                </div>
                <header class="modal-header">
                    <i class="modal-heading-icon fa-solid fa-user"></i>
                    Login
                </header>
                <div class="modal-body login-group">
                    <input id="username" name="username" type="text" class="modal-input" placeholder="Username" required>
                    <input id="password" type="password" class="modal-input" placeholder="Password" name="password" required>
                </div>
                <div class="modal-footer modal-toggle"  >
                    <button id="modal-btn" type="submit">
                        Save
                    </button>
                </div>
                <div class="login-form__links">
                    <a class="login-form__link" href="/OrganicStore/admin-home">Forgot your password?</a>
                </div>
            </div>
        </form>`;
        this.mainElement.style.visibility = "visible";
        },500)
       
    }
}
export const loginHtml = `
<form  class="modal">
    <div class="modal-container login-form">
        <header class="modal-header">
            <i class="modal-heading-icon fa-solid fa-user"></i>
            Login
        </header>
        <div class="modal-body login-group">
            <input id="username" name="username" type="text" class="modal-input" placeholder="Username" required>
            <input id="password" type="password" class="modal-input" placeholder="Password" name="password" required>
        </div>
        <div class="modal-footer modal-toggle"  >
            <button id="modal-btn" type="submit">
                Login
            </button>
        </div>
        <div class="login-form__links">
            <a class="login-form__link" href="#">Forgot your password?</a>
        </div>
    </div>
</form>
`;