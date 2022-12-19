package ued.OrganicWeb.dao;

import java.util.List;

public interface Generic2DAO<T> extends Generic1DAO<T> {
	List<T> list(Integer... params);
	T get(int id);
	int getRowCount();
}
