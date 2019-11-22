package cn.tx.service;

import java.util.List;

import cn.tx.model.Area;

public interface AreaService {
	public List<Area> getAreasByPid(Integer pid);
}
