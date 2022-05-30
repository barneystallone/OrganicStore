package ued.OrganicWeb.dao;

import ued.OrganicWeb.model.UserModel;


public interface IUserDAO extends GenericDAO<UserModel>{
	
	int checkLogin(UserModel userModel);
	boolean changePassword(UserModel user);
	Boolean isUniqueUsername(UserModel model);
}
