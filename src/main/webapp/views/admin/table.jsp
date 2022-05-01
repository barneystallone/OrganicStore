<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/taglib.jsp"%>
<!DOCTYPE html>
<!-- Custom styles for this page -->
<link href="${root}/static/admin/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
<html>
<!-- Begin Page Content -->
<div class="container-fluid">
	<!-- Page Heading -->
	<!-- DataTable -->
	<div class="card shadow mb-4">
		<div class="card-header py-3">
			<h6 class="m-0 font-weight-bold text-primary">DataTables Example</h6>
		</div>
		<div class="card-body">
			<div class="table-responsive">
				<table class="table table-bordered" id="table3" width="100%"
					cellspacing="0">
					<thead>
						<tr>
							<th>Name</th>
							<th>Position</th>
							<th>Office</th>
							<th>Age</th>
							<th>Start date</th>
							<th>Salary</th>
						</tr>
					</thead>
					<tfoot>
						<tr>
							<th>Name</th>
							<th>Position</th>
							<th>Office</th>
							<th>Age</th>
							<th>Start date</th>
							<th>Salary</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</div>
	<!-- Page level plugins -->
	<script src="${root}/static/admin/vendor/datatables/jquery.dataTables.min.js"></script>
	<script src="${root}/static/admin/vendor/datatables/dataTables.bootstrap4.min.js"></script>

	<script>
		var json = [ {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		},

		{
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		},

		{
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "2 Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, {
			"Name" : "Tiger Nixon",
			"Position" : "System Architect",
			"Office" : "Edinburgh",
			"Age" : "61",
			"Start" : "2011/04/25",
			"Salary" : "$320,800",
		}, ];
		$('#table3').DataTable({
			data : json,
			columns : [ {
				data : 'Name'
			}, {
				data : 'Position'
			}, {
				data : 'Office'
			}, {
				data : 'Age'
			}, {
				data : 'Start'
			}, {
				data : 'Salary'
			}, ],
		//"pageLength": 3
		});
	</script>
</div>