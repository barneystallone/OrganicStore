package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.GRNModel;

public interface IGRNService extends IGeneric2Service<GRNModel>{
	List<GRNModel> listActiveGRN(Integer... params);
	int getTotalItems();
}
