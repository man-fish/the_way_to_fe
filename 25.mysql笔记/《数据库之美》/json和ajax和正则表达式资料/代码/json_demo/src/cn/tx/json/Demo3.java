package cn.tx.json;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import net.sf.json.JSONArray;
import cn.tx.model.Person;

public class Demo3 {
	
	public static void main(String[] args) {
		
		Person p = new Person("刘备",28, new Date(), "安溪县");
		
		//String[] names = {"大德", "长须", "姜磊"};
		
		//Object [] objs = {p, "浩宇", 23};
		
		List list = new ArrayList();
		list.add(p);
		list.add("任亮");
		list.add(53);
 		JSONArray obj = JSONArray.fromObject(list);
		String result = obj.toString();
		System.out.println(result);
		
		
	}

}
