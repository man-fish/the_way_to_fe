package cn.tx.dao.impl;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import cn.tx.dao.AreaDao;
import cn.tx.model.Area;

public class AreaDaoImpl implements AreaDao {

	@Override
	public List<Area> getAreasByPid(Integer pid) {
		String sql = "select * from tx_area t where t.pid = ?";
		String driver = "oracle.jdbc.OracleDriver";
		String url = "jdbc:oracle:thin:@192.168.1.100:1521:orcl";
		Connection connection = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<Area> aList = new ArrayList<Area>();
		try {
			Class.forName(driver);
			connection = DriverManager.getConnection(url, "scott", "tiger");
			pstmt = connection.prepareStatement(sql);
			pstmt.setInt(1, pid);
			rs = pstmt.executeQuery();
			while(rs.next()){
				Area a = new Area();
				int areaId = rs.getInt("area_id");
				int pId = rs.getInt("pid");
				int level = rs.getInt("area_level");
				String aname = rs.getString("area_name");
				a.setAreaId(areaId);
				a.setAreaName(aname);
				a.setLevel(level);
				a.setPid(pId);
				aList.add(a);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(rs != null)
					rs.close();
				if(pstmt != null)
					pstmt.close();
				if(connection != null)
					connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		
		
		
		return aList;
	}

}
