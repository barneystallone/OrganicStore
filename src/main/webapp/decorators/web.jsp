<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="description" content="Ogani Template">
<meta name="keywords" content="Ogani, unica, creative, html">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Oganic | ${root}</title>


<!-- Js Plugins -->
<script type="module" src="${root}/static/web/js/index.js"></script>
<script defer src="${root}/static/web/js/jquery-3.3.1.min.js"></script>
<script defer src="${root}/static/web/js/bootstrap.min.js"></script>
<!-- <script defer src="${root}/static/web/js/jquery.nice-select.min.js"></script> -->
<script defer src="${root}/static/web/js/jquery-ui.min.js"></script>
<script defer src="${root}/static/web/js/jquery.slicknav.js"></script>
<script defer src="${root}/static/web/js/mixitup.min.js"></script>
<script defer src="${root}/static/web/js/owl.carousel.min.js"></script>
<script defer src="${root}/static/web/js/main.js"></script>

<!-- Google Font -->
<link
	href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;600;900&display=swap"
	rel="stylesheet">

<!-- Css Styles -->
<link rel="stylesheet"
	href="${root}/static/web/css/bootstrap.min.css"
	type="text/css">
<!-- <link rel="stylesheet"
	href="${root}/static/web/css/font-awesome.min.css"
	type="text/css"> -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
<link rel="stylesheet"
	href="${root}/static/web/css/elegant-icons.css"
	type="text/css">
<link rel="stylesheet"
	href="${root}/static/web/css/nice-select.css" type="text/css">
<link rel="stylesheet"
	href="${root}/static/web/css/jquery-ui.min.css"
	type="text/css">
<link rel="stylesheet"
	href="${root}/static/web/css/owl.carousel.min.css"
	type="text/css">
<link rel="stylesheet"
	href="${root}/static/web/css/slicknav.min.css"
	type="text/css">
	<link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
<link rel="stylesheet" href="${root}/static/web/css/style.css"
	type="text/css">
</head>
<body>
	<!-- header  -->
	<%@ include file="/common/web/header.jsp"%>
	<!-- header -->
	<div class="main">

	</div>
	<!-- loginModal  -->
	<%@ include file="/common/web/loginModal.jsp"%>
	<!-- loginModal -->
	<div class="toast-wrapper">
		<!-- <div class="toast__custom">
			<div class="toast__custom-content">
				<i class="fas fa-solid fa-check check"></i>
	
				<div class="message">
					<span class="text text-1">Success</span>
					<span class="text text-2">aaaaaaaaaaaaaaaaaaaa</span>
				</div>
			</div>
			<i class="fa-solid fa-xmark close"></i>
	
			<div class="progress"></div>
		</div> -->
	</div>
	<!-- footer  -->
	<%@ include file="/common/web/footer.jsp"%>
	<!-- footer -->

	<!-- custom js -->

	<script>
     /*
        document.querySelectorAll('.mount').forEach(elem=>{
            elem.addEventListener('click',e=>{
                const   input = e.target.closest('.mount').querySelector('input'),
                        oldValue = input.value*1;
                
                const isIncrease = e.target.closest('button').classList.contains('incr') ;
                const isDecrease = e.target.closest('button').classList.contains('descr') ;
                let newVal;
                if(isIncrease) {
                    newVal = oldValue+1;
                    input.value = newVal;
                } else if (isDecrease) {
                    newVal = (oldValue>1) ? (oldValue - 1 ): 1;
                    input.value = newVal;
                }
            })
        })
        */
    </script>
	

</body>

</html>