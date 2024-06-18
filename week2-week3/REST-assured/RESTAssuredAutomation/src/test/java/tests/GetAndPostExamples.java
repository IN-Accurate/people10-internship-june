package tests;

import org.testng.Assert;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import java.util.HashMap;
import java.util.Map;
import com.google.gson.Gson;

//import static io.restassured.matcher.RestAssuredMatchers.*;
import static  org.hamcrest.Matchers.*;

public class GetAndPostExamples {
	
	@Test
	public void testGet() {
		
		baseURI="https://reqres.in/api";
		String first_name= 
				given().
				get("/users?page=2").
				then().
				statusCode(200).
				body("data[3].first_name",equalTo("Byron")).
				extract().
				path("data[3].first_name");
	
		System.out.println(first_name);
		

		given().
		get("/users?page=2").
		then().
		statusCode(200).
		body("data[4].first_name",equalTo("George")).
		body("data.first_name",hasItems("George","Rachel"));

	}
	
	@Test
	public void testPost() {
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("name", "VS");
		map.put("job", "Dev");  
		
		Gson gson = new Gson();

        String requestBody = gson.toJson(map);
        
        System.out.println(requestBody);

		baseURI="https://reqres.in";
		
		given().
		header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(requestBody).
		when().
		post("/api/users").
		then().
		statusCode(201);
	}
}
