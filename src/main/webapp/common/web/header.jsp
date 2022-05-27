<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
	<!DOCTYPE html>
	<!-- Page Preloder -->
	<div id="preloder">
		<div class="loader"></div>
	</div>

	<!-- Humberger Begin -->
	<div class="humberger__menu__overlay"></div>
	<div class="humberger__menu__wrapper">
		<div class="humberger__menu__logo">
			<a href="#"><img src="${root}/static/web/img/logo.png" alt=""></a>
		</div>
		<div class="humberger__menu__cart">
			<ul>
				<li><a href="#"><i class="fa fa-heart"></i> <span>1</span></a></li>
				<li>
					<a href="/OrganicStore/shopping/cart" data-link><i class="fa fa-shopping-bag"></i> <span>3</span></a>
					
				</li>
			</ul>
			<div class="header__cart__price">
				item: <span>$150.00</span>
			</div>
		</div>
		<div class="humberger__menu__widget">
			<div class="header__top__right__language">
				<img src="${root}/static/web/img/language.png" alt="">
				<div>English</div>
				<span class="arrow_carrot-down"></span>
				<ul>
					<li><a href="#">Spanis</a></li>
					<li><a href="#">English</a></li>
				</ul>
			</div>
			<div class="header__top__right__auth">
				<a href="#"><i class="fa fa-user"></i> Login</a>
			</div>
		</div>
		<nav class="humberger__menu__nav mobile-menu">
			<ul>
				<li class="active"><a href="./index.html">Home</a></li>
				<li><a href="./shop-grid.html">Shop</a></li>
				<li><a href="#">Pages</a>
					<ul class="header__menu__dropdown">
						<li><a href="${root}/shopping" data-link>Shop Details</a></li>
						<li><a href="${root}/shopping" data-link>Shoping Cart</a></li>
						<li><a href="${root}/checkout" data-link>Check Out</a></li>
						<li><a href="${root}/shopping" data-link>Blog Details</a></li>
					</ul>
				</li>
				<li><a href="./blog.html">Blog</a></li>
				<li><a href="./contact.html">Contact</a></li>
			</ul>
		</nav>
		<div id="mobile-menu-wrap"></div>
		<div class="header__top__right__social">
			<a href="#"><i class="fa-brands fa-facebook-f"></i></i></a>
			<a href="#"><i class="fa-brands fa-twitter"></i></i></a>
			<a href="#"><i class="fa-brands fa-linkedin-in"></i></i></a>
			<a href="#"><i class="fa-brands fa-pinterest-p"></i></i></a>
		</div>
		<div class="humberger__menu__contact">
			<ul>
				<li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
				<li>Free Shipping for all Order of $99</li>
			</ul>
		</div>
	</div>
	<!-- Humberger End -->

	<!-- Header Section Begin -->
	<header class="header" id="header">
		<div class="header__top">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 col-md-6">
						<div class="header__top__left">
							<ul>
								<li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
								<li>Free Shipping for all Order of $99</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-6 col-md-6">
						<div class="header__top__right">
							<div class="header__top__right__social">
								<a href="#"><i class="fa-brands fa-facebook-f"></i></i></a>
								<a href="#"><i class="fa-brands fa-twitter"></i></i></a>
								<a href="#"><i class="fa-brands fa-linkedin-in"></i></i></a>
								<a href="#"><i class="fa-brands fa-pinterest-p"></i></i></a>
							</div>
							<div class="header__top__right__language">
								<img src="${root}/static/web/img/language.png" alt="">
								<div>English</div>
								<span class="arrow_carrot-down"></span>
								<ul>
									<li><a href="#">Spanis</a></li>
									<li><a href="#">English</a></li>
								</ul>
							</div>
							<div class="header__top__right__auth">
								<a href="#"><i class="fa fa-user"></i> Login</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<div class="row">
				<div class="col-lg-3">
					<div class="header__logo">
						<a href="./index.html"><img src="${root}/static/web/img/logo.png" alt=""></a>
					</div>
				</div>
				<div class="col-lg-6">
					<nav class="header__menu">
						<ul>
							<li class="active"><a href="${root}/shopping">Home</a></li>
							<li><a href="${root}/shopping">Shop</a></li>
							<li><a href="#">Pages</a>
								<ul class="header__menu__dropdown">
									<li><a href="${root}/shopping" data-link>Shop Details</a></li>
									<li><a href="${root}/shopping" data-link>Shoping Cart</a></li>
									<li><a href="${root}/checkout" data-link>Check Out</a></li>
									<li><a href="${root}/shopping" data-link>Blog Details</a></li>
								</ul>
							</li>
							<li><a href="./blog.html">Blog</a></li>
							<li><a href="./contact.html">Contact</a></li>
						</ul>
					</nav>
				</div>
				<div class="col-lg-3">
					<div class="header__cart">
						<ul>
							<li><a href="#"><i class="fa fa-heart"></i> <span>1</span></a></li>
							<li>
								<a href="/OrganicStore/shopping/cart" data-link><i class="fa fa-shopping-cart"></i><span>3</span></a>
								<ul class="cart_subs">
									<li class="first">
										<ul id="showcartresitem" class="cart_page_content">
											
										</ul>
									</li>
									<li class="last">
										<div class="viewcart">
											<div id="showcartresprice" class="price">
												<div>
													<span>Tổng cộng:</span><span class="total"> <b>0</b>
													<span class="vnd" ></span></span>
												</div>
											</div>
											<button id="show_login_cart_desktop" class="btn btn-redbold"><a class="text-white" data-link href="/OrganicStore/shopping/cart">Xem giỏ
											hàng</a></button>
										</div>
									</li>
								</ul>
							</li>
						</ul>
						<div class="header__cart__price">
							item: <span>$150.00</span>
						</div>
					</div>
				</div>
			</div>
			<div class="humberger__open">
				<i class="fa fa-bars"></i>
			</div>
		</div>
	</header>
	<!-- Header Section End -->
	<!-- Hero Section Begin -->
	<section class="hero hero-normal">
		<div class="container">
			<div class="row">
				<div class="col-lg-3">
					<div class="hero__categories">
						<div class="hero__categories__all">
							<i class="fa fa-bars"></i> <span>All departments</span>
						</div>
						<ul>
							<li><a href="#">Fresh Meat</a></li>
							<li><a href="#">Vegetables</a></li>
							<li><a href="#">Fruit & Nut Gifts</a></li>
							<li><a href="#">Fresh Berries</a></li>
							<li><a href="#">Ocean Foods</a></li>
							<li><a href="#">Butter & Eggs</a></li>
							<li><a href="#">Fastfood</a></li>
							<li><a href="#">Fresh Onion</a></li>
							<li><a href="#">Papayaya & Crisps</a></li>
							<li><a href="#">Oatmeal</a></li>
							<li><a href="#">Fresh Bananas</a></li>
						</ul>
					</div>
				</div>
				<div class="col-lg-9">
					<div class="hero__search">
						<div class="hero__search__form">
							<form action="#">
								<div class="hero__search__categories">
									All Categories <span class="arrow_carrot-down"></span>
								</div>
								<input type="text" placeholder="What do yo u need?">
								<button type="submit" class="site-btn">SEARCH</button>
							</form>
						</div>
						<div class="hero__search__phone">
							<div class="hero__search__phone__icon">
								<i class="fa fa-phone"></i>
							</div>
							<div class="hero__search__phone__text">
								<h5>+65 11.188.888</h5>
								<span>support 24/7 time</span>
							</div>
						</div>
					</div>

					<!-- 
                    <div class="hero__item set-bg" data-setbg="${root}/static/web/img/hero/banner.jpg">
                        <div class="hero__text">
                            <span>FRUIT FRESH</span>
                            <h2>Vegetable <br />100% Organic</h2>
                            <p>Free Pickup and Delivery Available</p>
                            <a href="#" class="primary-btn">SHOP NOW</a>
                        </div>
                    </div>
                     -->
				</div>
			</div>
		</div>
	</section>
	<!-- Hero Section End -->
	</body>

	</html>