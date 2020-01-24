package cn.tx.model;

import java.util.Date;

public class Person {
	
	private String name;
	
	private Integer age;
	
	private Date birthday;
	
	private String address;
	
	public Person() {
		// TODO Auto-generated constructor stub
	}

	public Person(String name, Integer age, Date birthday, String address) {
		super();
		this.name = name;
		this.age = age;
		this.birthday = birthday;
		this.address = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Person [name=" + name + ", age=" + age + ", birthday="
				+ birthday + ", address=" + address + "]";
	}
	
	

}
