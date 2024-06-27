package tests;

import static io.restassured.RestAssured.baseURI;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasItems;

import java.util.HashMap;
import java.util.Map;

import org.testng.annotations.Test;

import com.google.gson.Gson;

import io.restassured.http.ContentType;

public class PutPatchDeleteExamples {

	
	@Test
	public void testPut() {
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("name", "VS");
		map.put("job", "Dev");  
		
		Gson gson = new Gson();

        String requestBody = gson.toJson(map);
        
        System.out.println(requestBody);

		baseURI="https://reqres.in/api";
		
		given().
		header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(requestBody).
		when().
		put("/users/2").
		then().
		statusCode(200);
	}
	

	@Test
	public void testPatch() {
		
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("name", "VS");
		map.put("job", "Dev");  
		
		Gson gson = new Gson();

        String requestBody = gson.toJson(map);
        
        System.out.println(requestBody);

		baseURI="https://reqres.in/api";
		
		given().
		header("content-type","application/json").
		contentType(ContentType.JSON).
		accept(ContentType.JSON).
		body(requestBody).
		when().
		patch("/users/2").
		then().
		statusCode(200);
	}
	

	@Test
	public void testDelete() {
		

		baseURI="https://reqres.in/api";
		
		given().
		when().
		delete("/users/2").
		then().
		statusCode(204);
	}
	
}
