package ued.OrganicWeb.dao;

import java.util.List;

public interface GenericDAO<T> {
	List<T> list(Integer... params);
	int save(T model);
	void update(T model);
	void delete(T model);
	T get(int id);
	int getRowCount();
}
