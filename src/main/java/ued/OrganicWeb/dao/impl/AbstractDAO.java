package ued.OrganicWeb.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import ued.OrganicWeb.dao.IGenericDAO;
import ued.OrganicWeb.mapper.MapModel;

public class AbstractDAO<T> implements IGenericDAO<T> {

	public Connection getConnection() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			String url = "jdbc:mysql://localhost:3306/organicstoredb";
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
				if (param instanceof String) {
					stmt.setString(i + 1, (String) param);
				}


			}
		} catch (SQLException e) {
			e.printStackTrace();
		}

	}

	@Override
	public <T> List<T> query(StringBuilder sql, MapModel<T> mapper, Object... params) {
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
		
		if (conn != null) {
			try {
				stmt = conn.prepareStatement(sql.toString());
				setParams(stmt, params);

				ResultSet rs = stmt.executeQuery();
				if (rs.next()) {
					// getGeneratedKeys
					return rs.getInt("id");
				}
			} catch (SQLException e) {
				e.printStackTrace();
				return 0;
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
				e.printStackTrace();
			} finally {
				try {
					if (conn != null) {
						conn.close();
					}
					if (stmt != null) {
						stmt.close();
					}
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}

		}
		
	}


}
