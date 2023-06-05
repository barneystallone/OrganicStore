package ued.OrganicWeb.service;

import java.util.List;

import ued.OrganicWeb.model.GRNInfoModel;

public interface IGRNInfoService extends IGenericService<GRNInfoModel> {
	int saveMulti(List<GRNInfoModel> listModel);
}
