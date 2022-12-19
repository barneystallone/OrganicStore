package ued.OrganicWeb.service;

public interface IGenericService<T>{
	int save(T model);
	void update(T model);
	void delete(T model);
}
