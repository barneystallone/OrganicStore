package ued.OrganicWeb.dao.impl;


import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


import ued.OrganicWeb.dao.IAbstractDAO;
import ued.OrganicWeb.mapper.MapModel;
import ued.OrganicWeb.utils.RestUtil;
import ued.OrganicWeb.utils.SessionUtil;

public class AbstractDAO<T> implements IAbstractDAO<T> {

	public Connection getConnection() {
		try {
//			Class.forName("com.mysql.jdbc.Driver");
			Class.forName("com.mysql.cj.jdbc.Driver");
			String url = "jdbc:mysql://localhost:3306/organicshopdb";
			String user = "root";
			String password = "admin";

			return DriverManager.getConnection(url, user, password);
		} catch (SQLException | ClassNotFoundException e) {
			return null;
		}
	}

	public void setParams(PreparedStatement stmt, Object... params) {
		try {
			for (int i = 0; i < params.length; i++) {
				Object param = params[i];
				if (param instanceof Integer) {
					stmt.setInt(i + 1, (int) param);
				}
				else if (param instanceof String) {
					stmt.setString(i + 1, (String) param);
				}
				else if (param == null ) {
					stmt.setNull(i+1, java.sql.Types.NULL );
				}
				else if (param instanceof byte[]){
					 stmt.setBytes(i+1, (byte[]) param);
				}
				else if (param instanceof Date) {
					stmt.setDate(i+1, new java.sql.Date(((Date) param).getTime()));
				}
				

			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}
	public  T get(StringBuilder sql, MapModel<T> mapper, int id) {
		Connection conn = getConnection();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		if (conn != null) {
			try {
				stmt = conn.prepareStatement(sql.toString());
				setParams(stmt, id);
				rs = stmt.executeQuery();
				if (rs.next()) {
					return mapper.mapRow(rs);
				}
			} catch (SQLException e) {
				return null;
			} finally {
				try {
					if (conn != null) {
						conn.close();
					}
					if (stmt != null) {
						stmt.close();
					}
					if (rs != null) {
						rs.close();
					}
				} catch (SQLException e2) {
					return null;
				}
			}

		}
		
		
		return null;
	}

	@Override
	public  List<T> query(StringBuilder sql, MapModel<T> mapper, Object... params) {
		Connection conn = getConnection();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		List<T> results = new ArrayList<>();

		if (conn != null) {
			try {
				stmt = conn.prepareStatement(sql.toString());
				setParams(stmt, params);
				rs = stmt.executeQuery();
				while (rs.next()) {
					results.add(mapper.mapRow(rs));
				}
				return results;
			} catch (SQLException e) {
				return null;
			} finally {
				try {
					if (conn != null) {
						conn.close();
					}
					if (stmt != null) {
						stmt.close();
					}
					if (rs != null) {
						rs.close();
					}
				} catch (SQLException e2) {
					return null;
				}
			}

		}

		return null;
	}
	@Override
	public int insert(StringBuilder sql, Object... params) {
		Connection conn = getConnection();
		PreparedStatement stmt = null;
		ResultSet rs =null;
		if (conn != null) {
			try {
				stmt = conn.prepareStatement(sql.toString(),Statement.RETURN_GENERATED_KEYS);
				setParams(stmt, params);
				stmt.executeUpdate();
//				
				rs = stmt.getGeneratedKeys();
				
//				int[] a= 
				if (rs.next()) {
					// getGeneratedKeys
					return rs.getInt(1);
				}
			} catch (SQLException e) {
				if(e.getSQLState().equals("45000")) {
					StringBuilder message =RestUtil.message;
					message.delete(0,RestUtil.message.length());
					message.append("45000 ").append(e.getMessage());
				}else if (e.getErrorCode()==1648) {
					StringBuilder message =RestUtil.message;
					message.delete(0,RestUtil.message.length());
					message.append("45000 ").append("Trong kho không đủ để bán");
				}
				else {
					e.printStackTrace();					
				}
				return -1;
			} finally {
				try {
					conn.close();
					
					if (stmt != null) {
						stmt.close();
					}
					if (rs != null) {
						rs.close();
					}
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
			
		}
		return 0;
	}

	@Override
	public void update(StringBuilder sql, Object... params) {
		Connection conn = getConnection();
		PreparedStatement stmt = null;
		if (conn != null) {
			try {
				stmt = conn.prepareStatement(sql.toString());
				setParams(stmt, params );
				stmt.executeUpdate();
			} catch (SQLException e) {
				if(e.getErrorCode()==1451){
					StringBuilder message =RestUtil.message;
					message.delete(0,RestUtil.message.length());
					message.append("1451").append(e.getMessage());
				}else {
					e.printStackTrace();					
				}
			} finally {
				try {
					conn.close();
					
					if (stmt != null) {
						stmt.close();
					}
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}

		}
		
	}

	@Override
	public int rowCount(StringBuilder sql, Object... params) {
		Connection conn = getConnection();
		PreparedStatement stmt = null;
		ResultSet rs = null;
		int id=0;
		if (conn != null) {
			try {
				stmt = conn.prepareStatement(sql.toString());
				setParams(stmt, params);
				rs = stmt.executeQuery();
				
				while (rs.next()) {
					id = rs.getInt(1);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				try {
					conn.close();
					
					if (stmt != null) {
						stmt.close();
					}
					if (rs != null) {
						rs.close();
					}
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}

		}

		return id;
	}
	

}
