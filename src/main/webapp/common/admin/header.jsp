<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- Sidebar start -->
		<div class="navigation">
            <ul>
                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon name="logo-apple"></ion-icon>
                        </span>
                        <span class="title">
                            <h2>Organic Admin</h2>
                        </span>
                    </a>
                </li>
                <li>
                    <a href="${root}/admin/" data-link>
                        <span class="icon">
                            <ion-icon class="icon-outline" name="home-outline"></ion-icon>
                            <ion-icon class="icon-full" name="home"></ion-icon>
                        </span>
                        <span class="title">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="${root}/admin/customer" data-link>
                        <span class="icon">
                            <ion-icon class="icon-outline" name="person-outline"></ion-icon>
                            <ion-icon class="icon-full" name="person"></ion-icon>
                        </span>
                        <span class="title">Customers</span>
                    </a>
                </li>
                <li>
                    <a href="${root}/admin/user" data-link>
                        <span class="icon">
                            <ion-icon class="icon-outline" name="person-outline"></ion-icon>
                            <ion-icon class="icon-full" name="person"></ion-icon>
                        </span>
                        <span class="title">User</span>
                    </a>
                </li>
                <li>
                    <a href="${root}/admin/category" data-link>
                        <span class="icon">
                            <ion-icon name="book-outline" class="icon-outline"></ion-icon>
                            <ion-icon name="book" class="icon-full"></ion-icon>
                            <!-- <ion-icon class="icon-full" name="chatbubble"></ion-icon> -->
                        </span>
                        <span class="title">Category</span>
                    </a>
                </li>
                <li>
                    <a href="${root}/admin/product" data-link>
                        <span class="icon">
                            <ion-icon class="icon-outline" name="restaurant-outline"></ion-icon>
                            <ion-icon class="icon-full" name="restaurant"></ion-icon>
                        </span>
                        <span class="title">Product</span>
                    </a>
                </li>
                
                <li>
                    <a data-link href="${root}/admin/inventory">
                        <span class="icon">
                            <ion-icon class="icon-outline" name="cube-outline"></ion-icon>
                            <ion-icon class="icon-full" name="cube"></ion-icon>
                        </span>
                        <span class="title">Inventory</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon class="icon-outline" name="stats-chart-outline"></ion-icon>
                            <ion-icon class="icon-full" name="stats-chart"></ion-icon>
                        </span>
                        <span class="title">Doanh thu</span>
                    </a>
                </li>
            
                <li>
                    <a href="${root}/logout">
                        <span class="icon">
                            <ion-icon class="icon-outline" name="log-out-outline"></ion-icon>
                            <ion-icon class="icon-full" name="log-out"></ion-icon>
                        </span>
                        <span class="title">Sign Out</span>
                    </a>
                </li>
            </ul>
        </div>
<!-- Sidebar end -->