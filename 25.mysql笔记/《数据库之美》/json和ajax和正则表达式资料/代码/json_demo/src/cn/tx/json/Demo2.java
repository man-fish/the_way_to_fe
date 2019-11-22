package cn.tx.json;

import java.util.Date;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import cn.tx.model.Person;

public class Demo2 {
	
	public static void main(String[] args) {
		
		Person p = new Person("刘备",28, new Date(), "安溪县");
		
		//创建json配置对象
		/*JsonConfig jc = new JsonConfig();
		String[] attrs = {"birthday","name"};
		jc.setExcludes(attrs);
		
		//把map转换成json对象
		JSONObject obj = JSONObject.fromObject(p, jc);*/
		JSONObject obj = JSONObject.fromObject(p);
		//把json对象转换成字符串
		String result = obj.toString();
		System.out.println(result);
		
	}

}
