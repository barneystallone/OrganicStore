package ued.OrganicWeb.dao.impl;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import java.sql.CallableStatement;

public class AbstractDAO_With_ListInsert<T> extends AbstractDAO<T> {
	
	int insertListItem(StringBuilder sql, List<List<Object>> listItemParams) {
		Connection conn = getConnection();
		CallableStatement cstmt = null;
		int index=0;
		if (conn != null) {
			try {
				conn.setAutoCommit(false);
				for(List<Object> obj : listItemParams) {
					cstmt = conn.prepareCall(sql.toString());
					setParams(cstmt, obj.toArray(new Object[0]));
					cstmt.execute();
					index++;
				}
				
				conn.commit();
				return -1;
			} catch (SQLException e) {
				try {
					conn.rollback();
				} catch (SQLException e1) {
					e1.printStackTrace();
				}
			} finally {
				try {
					conn.close();
					
					if (cstmt != null) {
						cstmt.close();
					}
					
				} catch (SQLException e2) {
					e2.printStackTrace();
				}
			}
		}
		return index;
	}
}
