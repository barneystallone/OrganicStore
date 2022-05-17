package ued.OrganicWeb.service;

import ued.OrganicWeb.model.UserModel;

public interface IUserService extends IGenericService<UserModel>{
	UserModel getUserByLogin(UserModel userModel);
	boolean changePassword(UserModel user);
}
