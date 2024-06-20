package tests;

import org.testng.annotations.Test;
import static io.restassured.RestAssured.*;
import io.restassured.response.Response;

public class GetAndPostExamples {

    @Test
    public void testValidGet() {

        baseURI = "https://reqres.in/api";
        
        for (int userId = 1; userId <= 10; userId++) {
            Response response = 
                given()
                    .get("/users/" + userId)
                .then()
                    .extract()
                    .response();
            
            int statusCode = response.getStatusCode();
            if (statusCode == 200) {
                System.out.println("User ID " + userId + " is valid.");
            } else if (statusCode == 404) {
                System.out.println("User ID " + userId + " is invalid.");
            } else {
                System.out.println("User ID " + userId + " returned status code: " + statusCode);
            }
        }
    }
    @Test
    
    public void testInValidGet() {

        baseURI = "https://reqres.in/api";
        
        for (int userId = 10; userId <= 20; userId++) {
            Response response = 
                given()
                    .get("/users/" + userId)
                .then()
                    .extract()
                    .response();
            
            int statusCode = response.getStatusCode();
            if (statusCode == 200) {
                System.out.println("User ID " + userId + " is valid.");
            } else if (statusCode == 404) {
                System.out.println("User ID " + userId + " is invalid.");
            } else {
                System.out.println("User ID " + userId + " returned status code: " + statusCode);
            }
        }
    }


    @Test
    public void testParameters() {

        testGoogleSearch("Web Driver IO");

        testGitHubSearchUser("IN-Accurate");

        testGitHubSearchInvalidType("IN-Accurate");

        testYouTubeSearch("REST Assured tutorial for beginners");
    }

    private void testGoogleSearch(String query) {
        Response response = 
            given()
                .queryParam("q", query)
            .when()
                .get("https://www.google.com/search")
            .then()
                .extract()
                .response();

        System.out.println("Google Search for query: " + query);
        System.out.println("Status Code: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody().asString().substring(0, 200)); 
    }

    private void testGitHubSearchUser(String query) {
        Response response = 
            given()
                .queryParam("q", query)
                .queryParam("type", "users")
            .when()
                .get("https://api.github.com/search/users")
            .then()
                .extract()
                .response();

        System.out.println("GitHub Search for query: " + query);
        System.out.println("Status Code: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody().asString().substring(0,50));
    }

    private void testGitHubSearchInvalidType(String query) {
        Response response = 
            given()
                .queryParam("q", query)
                .queryParam("type", "invalidType")
            .when()
                .get("https://api.github.com/search/users")
            .then()
                .extract()
                .response();

        System.out.println("GitHub Search with invalid type for query: " + query);
        System.out.println("Status Code: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody().asString().substring(0,50)); 
    }

    private void testYouTubeSearch(String query) {
        Response response = 
            given()
                .queryParam("search_query", query)
            .when()
                .get("https://www.youtube.com/results")
            .then()
                .extract()
                .response();

        System.out.println("YouTube Search for query: " + query);
        System.out.println("Status Code: " + response.getStatusCode());
        System.out.println("Response Body: " + response.getBody().asString().substring(0,50));
    }
}
