<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<div class="modal ">
    <div class="container_login">
        <div class="modal-close modal-toggle">
            <i class="uil uil-multiply"></i>
            <!-- <i class="fa-solid fa-xmark"></i> -->
        </div>
        <div class="forms">
            <div class="form login">
                <span class="title">Login</span>

                <form action="#">
                    <div class="input-field">
                        <input type="text" placeholder="Nhập Email hoặc tên đăng nhập" required name="username">
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Password" required name="password">
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div class="checkbox-text">
                        <div class="checkbox-content">
                            <input type="checkbox" id="logCheck">
                            <label for="logCheck" class="text">Nhớ tài khoản</label>
                        </div>
                        
                        <a href="#" class="text">Quên mật khẩu?</a>
                    </div>

                    <div class="input-field button" id="login">
                        <input type="button" value="Login">
                    </div>
                </form>

                <div class="login-signup">
                    <span class="text">Chưa có tài khoản?
                        <a href="#" class="text signup-link">Đăng ký ngay</a>
                    </span>
                </div>
            </div>

            <!-- Registration Form -->
            <div class="form signup">
                <span class="title">Đăng ký</span>

                <form id="info" action="#">
                    <div class="input-field">
                        <input type="text" placeholder="Nhập tên của bạn" required name="name">
                        <i class="uil uil-user"></i>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Nhập Email của bạn" required name="username2">
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Nhập password của bạn" required name="password2">
                        <i class="uil uil-lock icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Nhập lại password của bạn" required name="confirmpw">
                        <i class="uil uil-lock icon"></i>
                        <i class="uil uil-eye-slash showHidePw"></i>
                    </div>

                    <div class="checkbox-text">
                        <div class="checkbox-content">
                            <input type="checkbox" id="sigCheck">
                            <label for="sigCheck" class="text">Nhớ tài khoản</label>
                        </div>
                        
                        <a href="#" class="text">Quên mật khẩu?</a>
                    </div>

                    <div class="input-field button checkout-link">
                        <input type="button" value="Next">
                    </div>
                </form>

                <div class="login-signup">
                    <span class="text">Đã có tài khoản?
                        <a href="#" class="text login-link">Đăng nhập ngay</a>
                    </span>
                </div>
            </div>
            <!--  -->
            <div class="form checkout">
                <span class="title">Đăng ký</span>

                <form id="info2" action="#">
                    
                    <div class="input-field">
                        <select id="city_login" >
                        </select>
                    </div>
                    <div class="input-field">
                        <select id="district_login">
                        </select>
                    </div>
                    <div class="input-field">
                        <select name="areaId">
                        </select>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Nhập số nhà, tên đường" required name="houseStreet">
                        <i class="uil uil-home"></i>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Nhập số điện thoại" required name="phoneNumber">
                        <i class="uil uil-phone-alt"></i>
                    </div>

                    <!-- sign up và login  -->
                    <div class="input-field button" id="sign-up">
                        <input type="button" value="Login">
                    </div>
                </form>

                <div class="login-checkout">
                    <span class="text">Quay lại bước trước?
                        <a href="#" class="text checkout-link">Bấm vào đây</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>