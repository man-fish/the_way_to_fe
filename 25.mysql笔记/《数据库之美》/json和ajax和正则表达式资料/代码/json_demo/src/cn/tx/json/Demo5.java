package cn.tx.json;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import cn.tx.model.Person;

public class Demo5 {
	
	public static void main(String[] args) {
		
		/*List<Person> pList = new ArrayList<Person>();
		for(int i = 0; i < 5;i ++){
			Person p = new Person(\"刘备\"+i,28, new Date(), \"安溪县\");
			pList.add(p);
		}
		
		JSONArray ja = JSONArray.fromObject(pList);
		String result = ja.toString();
		System.out.println(result);*/
		
		String str = "[{\"address\":\"安溪县\",\"age\":28,\"birthday\":{\"date\":8,\"day\":6,\"hours\":16,\"minutes\":24,\"month\":9,\"seconds\":34,\"time\":1475915074368,\"timezoneOffset\":-480,\"year\":116},\"name\":\"刘备0\"},{\"address\":\"安溪县\",\"age\":28,\"birthday\":{\"date\":8,\"day\":6,\"hours\":16,\"minutes\":24,\"month\":9,\"seconds\":34,\"time\":1475915074368,\"timezoneOffset\":-480,\"year\":116},\"name\":\"刘备1\"},{\"address\":\"安溪县\",\"age\":28,\"birthday\":{\"date\":8,\"day\":6,\"hours\":16,\"minutes\":24,\"month\":9,\"seconds\":34,\"time\":1475915074368,\"timezoneOffset\":-480,\"year\":116},\"name\":\"刘备2\"},{\"address\":\"安溪县\",\"age\":28,\"birthday\":{\"date\":8,\"day\":6,\"hours\":16,\"minutes\":24,\"month\":9,\"seconds\":34,\"time\":1475915074368,\"timezoneOffset\":-480,\"year\":116},\"name\":\"刘备3\"},{\"address\":\"安溪县\",\"age\":28,\"birthday\":{\"date\":8,\"day\":6,\"hours\":16,\"minutes\":24,\"month\":9,\"seconds\":34,\"time\":1475915074368,\"timezoneOffset\":-480,\"year\":116},\"name\":\"刘备4\"}]";
		JSONArray ja = JSONArray.fromObject(str);
		//创建json配置对象
		JsonConfig jc = new JsonConfig();
		//设置json的要转换的类
		jc.setRootClass(Person.class);
		List<Person> pList = (List<Person>) JSONSerializer.toJava(ja,jc);
		/*for(int i = 0; i < pList.size(); i++){
			Person person = pList.get(i);
			System.out.println(person);
		}*/
		for(Person p : pList){
			System.out.println(p.getName());
		}
		//System.out.println(pList);
	}

}
