package ued.OrganicWeb.service;

import java.util.List;

public interface IGenericService<T> {
	List<T> list(Integer... params);
	int save(T model);
	void update(T model);
	void delete(T model);
	T get(int id);
}
