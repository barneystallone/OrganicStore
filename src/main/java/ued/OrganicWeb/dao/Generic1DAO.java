package ued.OrganicWeb.dao;

public interface Generic1DAO<T> {
	int save(T model);
	void update(T model);
	void delete(T model);
}
