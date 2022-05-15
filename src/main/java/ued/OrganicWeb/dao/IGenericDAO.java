package ued.OrganicWeb.dao;

import java.util.List;

import ued.OrganicWeb.mapper.MapModel;


public interface IGenericDAO<T> {
	List<T> query(StringBuilder sql, MapModel<T> mapper,Object... params);
	int insert(StringBuilder sql, Object... params);
	void update(StringBuilder sql, Object... params);
	T get(StringBuilder sql, MapModel<T> mapper, int id);
}
