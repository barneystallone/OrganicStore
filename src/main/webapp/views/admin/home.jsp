<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp" %>	
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="cardBox">
                <div class="card">
                    <div>
                        <div class="numbers">1,504</div>
                        <div class="cardName">Daily Views</div>
                    </div>
                    <div class="iconBx">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers">80</div>
                        <div class="cardName">Sales</div>
                    </div>
                    <div class="iconBx">
                        <ion-icon name="cart-outline"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers">244</div>
                        <div class="cardName">Comments</div>
                    </div>
                    <div class="iconBx">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <div class="numbers">$8,504</div>
                        <div class="cardName">Earning</div>
                    </div>
                    <div class="iconBx">
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>
            </div>
            
            <!-- Add chart  -->
            <div class="graphBox">
                <div class="box-wrapper">
                    <canvas id="myPolarChart"></canvas>
                </div>
                <div class="box-wrapper">
                    <canvas id="myBarChart"></canvas>
                </div>
            </div>
            
            <!-- order details list -->
            <div class="data-table-wrapper">
                <div class="data-table">
                    <div class="cardHeader">
                        <h2>Recent Orders</h2>
                        <a href="#" class="btn">View All</a>
                    </div>
                    <table class="table table-sortable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Role</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>EJohn Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>CJohn Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>VJohn Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>HJohn Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>DJohn Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>IJohn Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>John Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>GJohn Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <img src="${root}/static/admin/images/img1.jpg" alt="">
                                    <div class="people-de">
                                        <h5>NJohn Doe</h5>
                                        <p>jhon@example.com</p>
                                    </div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <!-- Badges -->
                <!-- <span class="badge badge-success ">Active</span>
                <span class="badge badge-danger ">Active</span>
                <span class="badge badge-info ">Active</span>
                <span class="badge badge-dark ">Active</span>
                <span class="badge badge-light ">Active</span> -->
            </div>
            
            
            <div class="data-table-wrapper">
                <div class="data-table">
                    <div class="cardHeader">
                        <h2>Recent Orders</h2>
                        <a href="#" class="btn">View All</a>
                    </div>
                    <table class="table table-sortable">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Title</td>
                                <td>Status</td>
                                <td>Role</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                	<div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>

                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>
                            <tr class="active-row">
                                <td class="cell-flex">
                                    <div  class="" edit_type="click" col_name="imgage">
                                		<img src="${root}/static/admin/images/img1.jpg" alt="">
                                	</div>
                                    <div  class="cell_data" edit_type="click" col_name="name">
										<h5>John Doe</h5>
                                        <p>jhon@example.com</p>
									</div>
                                </td>
                                <td class="people-des">
                                    <h5>Software Engineer</h5>
                                    <p>Web dev</p>
                                </td>
                                <td class="status">
                                    <span class="badge badge-danger ">Active</span>
                                </td>
                                <td class="role">
                                    <p>Owner</p>
                                </td>
                                <td class="edit"><a href="#">Details</a></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <!-- Badges -->
                <!-- <span class="badge badge-success ">Active</span>
                <span class="badge badge-danger ">Active</span>
                <span class="badge badge-info ">Active</span>
                <span class="badge badge-dark ">Active</span>
                <span class="badge badge-light ">Active</span> -->
            </div>
</body>
</html>