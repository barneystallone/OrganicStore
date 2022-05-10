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
                    <a href="${root}/admin-home" data-link>
                        <span class="icon">
                            <ion-icon class="icon-outline" name="home-outline"></ion-icon>
                            <ion-icon class="icon-full" name="home"></ion-icon>
                        </span>
                        <span class="title">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="${root}/admin-customer" data-link>
                        <span class="icon">
                            <ion-icon class="icon-outline" name="person-outline"></ion-icon>
                            <ion-icon class="icon-full" name="person"></ion-icon>
                        </span>
                        <span class="title">Customers</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon class="icon-outline" name="chatbubble-outline"></ion-icon>
                            <ion-icon class="icon-full" name="chatbubble"></ion-icon>
                        </span>
                        <span class="title">Message</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon class="icon-outline" name="settings-outline"></ion-icon>
                            <ion-icon class="icon-full" name="settings-sharp"></ion-icon>
                        </span>
                        <span class="title">Help</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icon">
                            <ion-icon class="icon-outline" name="lock-closed-outline"></ion-icon>
                            <ion-icon class="icon-full" name="lock-closed"></ion-icon>
                        </span>
                        <span class="title">Password</span>
                    </a>
                </li>
                <li>
                    <a href="#">
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