<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
	<script type="module" src="${root}/static/admin/js/main.js"></script>
	<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@400;500;700&family=Baloo+2:wght@400;500;600;700&family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css"
        integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous"> -->
    <link rel="stylesheet" href="${root}/static/admin/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
    integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
    crossorigin="anonymous" referrerpolicy="no-referrer" />
	

</head>
<body id="page-top">

	<!-- page wrapper -->
	<div id="container">
		<!-- header  -->
		<%@ include file="/common/admin/header.jsp"%>
		<!-- header -->
		<!-- Topbar  -->
		<%@ include file="/common/admin/topbar.jsp"%>
		<!-- Topbar -->
		
		<!-- Content-Wrapper Start -->
		<div class="main">

		</div>
		
	</div>
	<!-- footer  -->
	<%@ include file="/common/admin/footer.jsp"%>
	<!-- footer -->

	<!-- Custom scripts for all pages-->
	<!-- ionicons -->
    <!-- <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script> -->
    <!-- <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script> -->
    <!--  -->

    <!-- chart js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <!-- custom -->
    
	<script type="text/javascript">
	// MenuToggle
	let toggle = document.querySelector('.toggle');
	let navigation = document.querySelector('.navigation');
	let main = document.querySelector('.main');
	let topbar = document.querySelector('.topbar');

	toggle.onclick = function() {
		navigation.classList.toggle('active')
		main.classList.toggle('active')
		topbar.classList.toggle('active')
	}
	// add hovered class
	let list = document.querySelectorAll('.navigation li');
	function activeLink() {
		list.forEach((item) => item.classList.remove('hovered'));
		this.classList.add('hovered');
	}

	list.forEach((item) =>
		item.addEventListener('mouseover', activeLink));

	
	</script>


</body>
</html>