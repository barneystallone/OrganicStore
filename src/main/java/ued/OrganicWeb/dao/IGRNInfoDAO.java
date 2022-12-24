package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.model.GRNInfoModel;

public interface IGRNInfoDAO extends Generic1DAO<GRNInfoModel>{
	List<GRNInfoModel> listBy_idGRN(int id); // id, idGRN, idProduct
	int saveMulti(List<GRNInfoModel> listModel);
}
