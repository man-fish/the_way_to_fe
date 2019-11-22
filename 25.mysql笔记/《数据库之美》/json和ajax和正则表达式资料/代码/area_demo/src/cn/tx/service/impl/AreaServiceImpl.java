package cn.tx.service.impl;

import java.util.List;

import cn.tx.dao.AreaDao;
import cn.tx.dao.impl.AreaDaoImpl;
import cn.tx.model.Area;
import cn.tx.service.AreaService;

public class AreaServiceImpl implements AreaService {

	
	private AreaDao ad = new AreaDaoImpl();
	@Override
	public List<Area> getAreasByPid(Integer pid) {
		
		return ad.getAreasByPid(pid);
	}

}
