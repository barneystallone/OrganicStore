package ued.OrganicWeb.dao.impl;

import java.util.List;

import ued.OrganicWeb.dao.IUserDAO;
import ued.OrganicWeb.mapper.impl.UserMapper;
import ued.OrganicWeb.model.CustomerModel;
import ued.OrganicWeb.model.UserModel;

public class UserDAO extends AbstractDAO<UserModel> implements IUserDAO{

	private static UserDAO instance = null;
	
	private UserDAO() {};
	
	public static UserDAO getInstance() {
		if(instance==null) {
			instance = new UserDAO();
		}
		return instance;		
	}
	@Override
	public List<UserModel> list(Integer... params) {
		StringBuilder sql = new StringBuilder("Select id, username, customer_id, "
				+ "role_id,status from User ");
		return super.query(sql, new UserMapper(),params);
	}

	@Override
	public int save(UserModel model) {
		CustomerModel customerModel = model.getCustomer();
		int id = CustomerDAO.getInstance().save(customerModel);
		if(id>0) {
			model.setCustomer_id(id);
			StringBuilder sql = new StringBuilder("Insert into user"
					+ "(username, customer_id, role_id, status)"
					+ " values(?, ?, ?, ?)");
			return super.insert(sql, model.getUsername(),model.getCustomer_id(),
					model.getRole_id(),model.isActive());
		} else {
			return 0;		
		}
	}

	@Override
	public boolean changePassword(UserModel user) {
		StringBuilder sql = new  StringBuilder("Update user set password = ? where id = ?");
		if(user.getNewPassword().length() >4) {
			super.update(sql,user.getNewPassword(), user.getId());
			return true;
		} else {
			return false;
		}

	}
	@Override
	public void update(UserModel model) {
		StringBuilder sql = new StringBuilder("Update user set username = ?, role_id = ?,"
				+ " status = ? where id = ?");
		
		super.update(sql, model.getUsername(),model.getRole_id(),model.isActive(),model.getId());
	}

	@Override
	public void delete(UserModel model) {
		StringBuilder sql = new StringBuilder("Delete from user where id = ?");
		super.update(sql, model.getId());
	}

	@Override
	public UserModel get(int id) {
		StringBuilder sql =new StringBuilder("Select id, username, customer_id, role_id,"
				+ " status from User where id = ?");
		return super.get(sql, new UserMapper(), id);
	}

	@Override
	public int getRowCount() {
		StringBuilder sql = new StringBuilder("select count(id) from user");
		return rowCount(sql);
	}

	@Override
	public int checkLogin(UserModel userModel) {
		StringBuilder sql = 
			new StringBuilder("select id from user where username = ? and password= ?");
		List<UserModel>  list = query(sql, new UserMapper(), userModel.getUsername()
				,userModel.getPassword());
		if (list.size()>0) {
			return list.get(0).getId();
		}
		else return 0;
	}



}
