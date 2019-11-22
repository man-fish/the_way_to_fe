package cn.tx.dao;

import java.util.List;

import cn.tx.model.Area;

public interface AreaDao {
	
	public List<Area> getAreasByPid(Integer pid);

}
