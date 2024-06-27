package tests;

import org.testng.annotations.Test;

import com.google.gson.Gson;

import io.restassured.http.ContentType;

import static io.restassured.RestAssured.*;
import static  org.hamcrest.Matchers.*;

import java.util.HashMap;
import java.util.Map;

public class HTTPRequestsTests {

	@Test
	public void getRequest() {
		
		baseURI = "https://reqres.in/api";
		
		String firstName = 
				given()
				.get("/users?page=2")
				.then()
				.statusCode(200)
				.body("data[3].first_name",equalTo("Byron"))
				.extract()
				.path("data[3].first_name");
		System.out.println(firstName);
		
	}
	
	public void postRequest() {

		
		baseURI = "https://reqres.in/api";
		
		Gson gson = new Gson();
		
	   Map<String,Object> map = new HashMap<String,Object>();
		
	   map.put("name","Vs");
	   map.put("job", "dev");
	   
	   String requestBody = gson.toJson(map);
	   
	   System.out.println(requestBody);
	   
	   given()
	   .header("content-type","application/json")
	   .contentType(ContentType.JSON)
	   .accept(ContentType.JSON)
	   .body(requestBody)
	   .when()
	   .post("/users")
	   .then()
	   .statusCode(201);
		
	}
	
}
