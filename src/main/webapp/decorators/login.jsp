<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<!DOCTYPE html>
<html>
    <head>
        <title>Styled Login Form - UI/UX Tutorial</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="utf-8">
        <link rel="stylesheet" href="${root}/static/admin/css/style.css">
    </head>
    <body>
        <form  action="${root}/login" class="modal active" method="POST">
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
        <script defer type="text/javascript">
         setTimeout(()=>{
            if("${message}" != ""){
                 alert("${message}");        		
             }
            if(location.href.match(/\?\w+$/g)){
                location.href=location.href.replace(/\?\w+/g,"");
            }
         },100);
        </script>
    </body>
</html>
