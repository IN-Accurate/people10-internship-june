package tests;

import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;

import io.restassured.http.ContentType;
import io.restassured.path.json.JsonPath;
import io.restassured.response.Response;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import tests.User;

public class TestsOnLocalAPI {

    @Test
    public void LocalApiTests() {
        getTest();
        postTest();
        putTest();
        patchTest();
        deleteTest();
    }

    public void getTest() {
        baseURI = "http://localhost:3000";

        System.out.println("------- GET USERS REQUEST -------");

        Response response = given()
                .get("/users")
                .then()
                .statusCode(200)
                .extract()
                .response();

        String jsonResponse = response.asString();

        Gson gson = new Gson();
        Type UserListType = new TypeToken<List<User>>() {}.getType();
        List<User> users = gson.fromJson(jsonResponse, UserListType);

        for (User user : users) {
            System.out.println("First Name: " + user.getFirstName() + ", Last Name: " + user.getLastName());
        }
    }

    public void postRequest(int numberOfUsers, int i) {
        Scanner scanner = new Scanner(System.in);
        Map<String, Object> map = new HashMap<>();

        System.out.println("Enter first name: ");
        String first_name = scanner.nextLine();
        System.out.println("Enter last name: ");
        String last_name = scanner.nextLine();
        System.out.println("Enter subject id: ");
        String subject_id = scanner.nextLine();

        scanner.nextLine();

        map.put("firstName", first_name);
        map.put("lastName", last_name);
        map.put("subjectId", subject_id);
        map.put("id", numberOfUsers + i + 1);

        Gson gson = new Gson();
        String requestBody = gson.toJson(map);

        System.out.println(requestBody);

        given()
                .header("content-type", "application/json")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(requestBody)
                .when()
                .post("/users")
                .then()
                .statusCode(201);
    }
    public void postTest() {
        baseURI = "http://localhost:3000";

        System.out.println("------- POST TEST -------");

        Response response = given()
                .get("/users")
                .then()
                .statusCode(200)
                .extract()
                .response();

        String jsonResponse = response.asString();
        JsonPath jsonPath = new JsonPath(jsonResponse);
        int numberOfUsers = jsonPath.getList("$").size();

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the number of users to be added: ");
        int numberOfInputs = scanner.nextInt();


        int i = 0;
        while (i < numberOfInputs) {
            postRequest(numberOfUsers, i);
            i++;
        }
    }

    public void putTest() {
        baseURI = "http://localhost:3000";

        System.out.println("------- PUT TEST -------");

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the id of user whose details are to be updated: ");
        int userId = scanner.nextInt();
        String user = Integer.toString(userId);
        scanner.nextLine(); 

        Map<String, Object> map = new HashMap<>();
        System.out.println("Enter the new first name: ");
        String first_name = scanner.nextLine();
        System.out.println("Enter the new last name: ");
        String last_name = scanner.nextLine();
        System.out.println("Enter the new subject id: ");
        String subject_id = scanner.nextLine();

        map.put("firstName", first_name);
        map.put("lastName", last_name);
        map.put("subjectId", subject_id);
        map.put("id", user);

        Gson gson = new Gson();
        String requestBody = gson.toJson(map);

        System.out.println(requestBody);

        given()
                .header("content-type", "application/json")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(requestBody)
                .when()
                .put("/users/" + userId)
                .then()
                .statusCode(200);
    }

    public void patchTest() {
        baseURI = "http://localhost:3000";

        System.out.println("------- PATCH TEST -------");

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the id of user whose details are to be partially updated: ");
        int userId = scanner.nextInt();
        String user = Integer.toString(userId);
        scanner.nextLine(); 

        Map<String, Object> map = new HashMap<>();
        System.out.println("Enter the new last name: ");
        String last_name = scanner.nextLine();
        map.put("lastName", last_name);
        map.put("id", user);

        Gson gson = new Gson();
        String requestBody = gson.toJson(map);

        System.out.println(requestBody);

        given()
                .header("content-type", "application/json")
                .contentType(ContentType.JSON)
                .accept(ContentType.JSON)
                .body(requestBody)
                .when()
                .patch("/users/" + userId)
                .then()
                .statusCode(200);
    }

    public void deleteTest() {
        baseURI = "http://localhost:3000";

        System.out.println("------- DELETE TEST -------");

        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the id of user whose details are to be deleted: ");
        int userId = scanner.nextInt();
        scanner.nextLine(); 

        when()
                .delete("/users/" + userId)
                .then()
                .statusCode(200);
    }

}
