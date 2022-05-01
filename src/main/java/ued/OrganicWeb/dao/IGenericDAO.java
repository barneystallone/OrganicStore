package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.mapper.MapModel;



public interface IGenericDAO<T> {
	<T> List<T> query(StringBuilder sql, MapModel<T> mapper,Object... params);

}
