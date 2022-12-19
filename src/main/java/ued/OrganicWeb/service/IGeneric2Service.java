package ued.OrganicWeb.service;

import java.util.List;

public interface IGeneric2Service<T> extends IGenericService<T> {
	List<T> list(Integer... params);
	T get(int id);
}
