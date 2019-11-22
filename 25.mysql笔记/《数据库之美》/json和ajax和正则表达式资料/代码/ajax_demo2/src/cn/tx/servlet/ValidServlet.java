package cn.tx.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ValidServlet
 */
public class ValidServlet extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username = request.getParameter("username");
		
		try {
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		/*if("zhangsan".equals(username)){
			response.getWriter().print("error");
		}else{
			response.getWriter().print("ok");
		}*/
		response.setContentType("text/xml;charset=UTF-8");
		if("zhangsan".equals(username)){
			response.getWriter().print("<result>error</result>");
		}else{
			response.getWriter().print("<result>ok</result>");
		}
		
		
	}

}
