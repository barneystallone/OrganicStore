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
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css"
        integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous">
    <link rel="stylesheet" href="${root}/static/admin/css/style.css">

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
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <!--  -->

    <!-- chart js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
    <!-- custom -->
    <script type="module" src="${root}/static/admin/js/main.js"></script>
  
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