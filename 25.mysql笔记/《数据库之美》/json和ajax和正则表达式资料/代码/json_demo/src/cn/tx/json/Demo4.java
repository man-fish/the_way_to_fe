package cn.tx.json;

import java.util.Map;

import net.sf.json.JSONObject;
import cn.tx.model.Person;

public class Demo4 {
	
	public static void main(String[] args) {
		
		String str = "{\"address\":\"安溪县\",\"age\":28,\"birthday\":{\"date\":8,\"day\":6,\"hours\":16,\"minutes\":14,\"month\":9,\"seconds\":11,\"time\":1475914451915,\"timezoneOffset\":-480,\"year\":116},\"name\":\"刘备\"}";
		/*//创建jsonConfig
		JsonConfig jc = new JsonConfig();
		//设置要转换的类
		jc.setRootClass(Person.class);*/
		JSONObject obj = JSONObject.fromObject(str);
		Person p = (Person) JSONObject.toBean(obj, Person.class);
		System.out.println(p);
		
		Map m = (Map) JSONObject.toBean(obj, Map.class);
		System.out.println(m);
	}

}
