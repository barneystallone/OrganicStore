package ued.OrganicWeb.service.impl;

import java.util.List;

import ued.OrganicWeb.dao.IUserDAO;
import ued.OrganicWeb.dao.impl.UserDAO;
import ued.OrganicWeb.model.UserModel;
import ued.OrganicWeb.service.IUserService;

public class UserService implements IUserService {

	private IUserDAO userDAO = UserDAO.getInstance();
	
	@Override
	public List<UserModel> list(Integer... params) {
		return userDAO.list(params);
	}

	@Override
	public int save(UserModel model) {
		return userDAO.save(model);
	}

	@Override
	public void update(UserModel model) {
		userDAO.update(model);
	}

	@Override
	public void delete(UserModel model) {
		userDAO.delete(model);
	}

	@Override
	public UserModel get(int id) {
		return userDAO.get(id);
	}

	@Override
	public UserModel getUserByLogin(UserModel userModel) {
		int id = userDAO.checkLogin(userModel);
		if(id > 0) {
			return userDAO.get(id);
		} else {
			return null;
		}
	}

	@Override
	public boolean changePassword(UserModel user) {
		user = getUserByLogin(user);
		if(user!=null) {
			return userDAO.changePassword(user);			
		} else {
			return false;
		}
	}

}
