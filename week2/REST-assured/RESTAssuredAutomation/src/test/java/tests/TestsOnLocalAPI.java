package tests;

import org.testng.annotations.Test;
import static io.restassured.RestAssured.*;
import io.restassured.response.Response;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.List;
import tests.User;
public class TestsOnLocalAPI {
	
	@Test
	public void getTest() {
		
		
		baseURI = "http://localhost:3000";
		
		Response response=given().
		get("/users").
		then().
		statusCode(200).
		extract().
		response();
		
		String jsonResponse = response.asString();
		
		Gson gson = new Gson();
		Type UserListType = new TypeToken<List<User>>() {}.getType();
		List<User> users  = gson.fromJson(jsonResponse, UserListType);
		
		for(User user:users) {
			  System.out.println("First Name: " + user.getFirstName() + ", Last Name: " + user.getLastName());
		}
	}
}
