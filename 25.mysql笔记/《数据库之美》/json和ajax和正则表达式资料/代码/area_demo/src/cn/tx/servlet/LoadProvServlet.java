package cn.tx.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.tx.model.Area;
import cn.tx.service.AreaService;
import cn.tx.service.impl.AreaServiceImpl;

public class LoadProvServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		AreaService as = new AreaServiceImpl();
		List<Area> provList = as.getAreasByPid(-1);
		req.setAttribute("pList", provList);
		req.getRequestDispatcher("/WEB-INF/area.jsp").forward(req, resp);
	}
	
	

}
