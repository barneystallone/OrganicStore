package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.model.GRNModel;

public interface IGrnDAO extends Generic2DAO<GRNModel> {
//	Phiếu tạm hoặc hoàn thành, ko list ra phiếu hủy
	List<GRNModel> listActiveGRN(Integer... params);
	int getTotalItems();
	void saveComplete(GRNModel model);
}
