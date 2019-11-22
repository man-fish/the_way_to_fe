package cn.tx.json;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import cn.tx.model.Person;
import net.sf.json.JSONObject;

public class Demo1 {
	
	public static void main(String[] args) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("name", "张三");
		map.put("age", 12);
		map.put("address", "长春");
		Person p = new Person("刘备",28, new Date(), "安溪县");
		map.put("person", p);
		//把map转换成json对象
		JSONObject obj = JSONObject.fromObject(map);
		//把json对象转换成字符串
		String result = obj.toString();
		System.out.println(result);
		
	}

}
