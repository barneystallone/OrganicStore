<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<div class="modal ">
    <div class="container_login">
        <div class="modal-close modal-toggle" onclick="modalToggle()">
            <i class="uil uil-multiply"></i>
            <!-- <i class="fa-solid fa-xmark"></i> -->
        </div>
        <div class="forms">
            <div class="form login">
                <span class="title">Login</span>

                <form action="#">
                    <div class="input-field">
                        <input type="text" placeholder="Email" required>
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Password" required>
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

                    <div class="input-field button">
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

                <form action="#">
                    <div class="input-field">
                        <input type="text" placeholder="Nhập tên của bạn" required>
                        <i class="uil uil-user"></i>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Nhập email của bạn" required>
                        <i class="uil uil-envelope icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Nhập password của bạn" required>
                        <i class="uil uil-lock icon"></i>
                    </div>
                    <div class="input-field">
                        <input type="password" class="password" placeholder="Nhập lại password của bạn" required>
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

                <form action="#">
                    
                    <div class="input-field">
                        <select id="city">
                            <option value="">Chọn Thành phố</option>
                            <option value="">1ádasdasdas</option>
                            <option value="">1ádasdasd</option>
                            <option value="">ấdsaddas1</option>
                        </select>
                    </div>
                    <div class="input-field">
                        <select>
                            <option value="">Chọn Quận/Huyện</option>
                            <option value="">1</option>
                            <option value="">1</option>
                            <option value="">1</option>
                        </select>
                    </div>
                    <div class="input-field">
                        <select>
                            
                            <option value="">Chọn Phường/Xã</option>
                            <option value="">1</option>
                            <option value="">1</option>
                            <option value="">1</option>
                        </select>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Nhập số nhà, tên đường" required>
                        <i class="uil uil-home"></i>
                    </div>
                    <div class="input-field">
                        <input type="text" placeholder="Nhập số điện thoại" required>
                        <i class="uil uil-phone-alt"></i>
                    </div>

                    <div class="input-field button">
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