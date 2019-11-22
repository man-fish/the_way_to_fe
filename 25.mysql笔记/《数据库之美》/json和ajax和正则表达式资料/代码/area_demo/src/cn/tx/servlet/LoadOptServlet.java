package cn.tx.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import cn.tx.model.Area;
import cn.tx.service.AreaService;
import cn.tx.service.impl.AreaServiceImpl;

public class LoadOptServlet extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		doPost(req, resp);
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		String pid = req.getParameter("pid");
		AreaService as = new AreaServiceImpl();
		//根据父节点查询子地区
		List<Area> provList = as.getAreasByPid(new Integer(pid));
		//把集合转换成json对象
		JSONArray ja = JSONArray.fromObject(provList);
		//把json对象转换成字符串
		String result = ja.toString();
		resp.setContentType("text/html;charset=UTF-8");
		resp.setCharacterEncoding("UTF-8");
		resp.getWriter().write(result);
	}
	
	

}
