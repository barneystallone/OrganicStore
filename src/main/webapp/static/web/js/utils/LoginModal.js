import {AddAreaEventListener,initArea} from "/OrganicStore/static/common/AreaUtils.js";

class LoginModal {
    constructor(options){
        this.elements = {
            main : options.modal,
            loginBtn : options.loginBtn,
            signUpBtn : options.signUpBtn
        }
        this.AddListener();
        this.isLogin = false;
    }
    modalToggle ()  {
        const modal = this.elements.main;
        if(modal.classList.contains("active")){
            modal.style.opacity = 0;
            setTimeout(()=>{
                modal.classList.toggle("active");
            },500)
        }
        else{
            modal.style.opacity = 1;
            modal.classList.toggle("active");
        }
    }
    
    
    AddListener() {
        const   self = this,
                city = this.elements.main.querySelector('#city_login'),
                district = this.elements.main.querySelector('#district_login'),
                subDistrict = this.elements.main.querySelector('[name="areaId"]');
        initArea(city,district,subDistrict);
        AddAreaEventListener(district,subDistrict);

        document.querySelectorAll('.header__top__right__auth').forEach(e=>{
            e.addEventListener('click',evt=>{
                evt.preventDefault();
                if(self.isLogin) {
                    self.LogOutHandler();
                } else {
                    self.modalToggle();
                }
            })
        })
        document.querySelector('.modal-close').addEventListener('click',()=>{
            self.modalToggle();
        })
        this.elements.loginBtn.addEventListener('click', ()=> this.LoginHandler())
        this.elements.signUpBtn.addEventListener('click', ()=> this.SignUpHandler())
    }
    SignUpHandler() {
        const   pw = this.elements.main.querySelector('[name="password2"]').value,
                confirmpw = this.elements.main.querySelector('[name="confirmpw"]').value;
        if(pw!=confirmpw ){
            alert("Xác nhận lại mật khẩu bị sai");
        } else {
            let payLoad = {
                "username": this.elements.main.querySelector('[name="username2"]').value,
                "password": pw,
                "customer": {
                    "name":  this.elements.main.querySelector('[name="name"]').value,
                    "email":  this.elements.main.querySelector('[name="username2"]').value,
                    "phoneNumber": this.elements.main.querySelector('[name="phoneNumber"]').value,
                    "houseStreet":  this.elements.main.querySelector('[name="houseStreet"]').value,
                    "areaId":document.querySelector('[name="areaId"] option:checked').value
                }
            }
            console.log({payLoad});
            fetch("http://localhost:8080/OrganicStore/api-signup",{
                method : 'POST',
                body : JSON.stringify(payLoad),
            }).then(res=>res.json())
            .then(data=>{
                if(data.success) {
                    alert(data.success);
                    this.elements.main.querySelector('.modal-close').click();
                    // e.classList.add('logout');
                    this.isLogin = true;
                } else if (data.fail) {
                    alert(data.fail);
                }
            }).catch(err=>console.log(err));
        }
    }
    LoginHandler() {
        let payLoad = {
            "username": this.elements.main.querySelector('[name="username"]').value,
            "password": this.elements.main.querySelector('[name="password"]').value,
        }
        console.log({payLoad});
        fetch("http://localhost:8080/OrganicStore/api-auth-login",{
            method : 'POST',
            body : JSON.stringify(payLoad),
        }).then(res=>res.json())
        .then(data=>{
            if(data.success) {
                alert(data.success);
                this.elements.main.querySelector('.modal-close').click();
                this.isLogin = true;
            } else if (data.fail) {
                alert(data.fail);
            }
        }).catch(err=>console.log(err));

    }
    LogOutHandler() {
        fetch("http://localhost:8080/OrganicStore/api-logout")
        .then(res=>res.json())
        .then(data=>{
            if(data.success) {
                alert(data.success);
                this.isLogin = false;
            } 
        }).catch(err=>console.log(err));
    }
    
}

export default LoginModal