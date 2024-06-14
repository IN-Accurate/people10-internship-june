package tests.SampleTests;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.testng.annotations.Test;

import com.fasterxml.jackson.core.JsonParser;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static io.restassured.RestAssured.*;
import tests.SampleTests.BookingResponse;
import tests.SampleTests.BookingResponse.Booking;
import tests.SampleTests.BookingResponse.BookingDates;

public class HTTPRequestsTests {

	public void getBookingIds() {
		String response = given().get("/booking").then().statusCode(200).extract().asPrettyString();

		System.out.println(response);
	}

	public String getAuthToken() {
		Gson gson = new Gson();
		Map<String, Object> map = new HashMap<>();
		map.put("username", "admin");
		map.put("password", "password123");
		String requestBody = gson.toJson(map);

		String authToken = given().header("content-type", "application/json").contentType(ContentType.JSON)
				.accept(ContentType.JSON).body(requestBody).when().post("/auth").then().statusCode(200).extract()
				.path("token");

		System.out.println(authToken);
		return authToken;
	}

	public int createBooking() {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter your firstname : ");
		String firstName = scanner.nextLine();
		System.out.println("Enter your lastname : ");
		String lastName = scanner.nextLine();
		System.out.println("Enter totalprice : ");
		int totalPrice = scanner.nextInt();
		scanner.nextLine();
		int flag;
		System.out.println("Enter 1 if you paid the deposit, else 0: ");
		flag = scanner.nextInt();
		scanner.nextLine();
		boolean depositPaid = flag == 1;
		System.out.println("Enter the additional needs (Eg:Breakfast) : ");
		String additionalNeeds = scanner.nextLine();
		LocalDate today = LocalDate.now();
		LocalDate oneYearLater = today.plusYears(1);
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		String checkInDate = today.format(formatter);
		String checkOutDate = oneYearLater.format(formatter);
		Map<String, Object> bookingDates = new HashMap<String, Object>();
		bookingDates.put("checkin", checkInDate);
		bookingDates.put("checkout", checkOutDate);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("firstname", firstName);
		map.put("lastname", lastName);
		map.put("totalprice", totalPrice);
		map.put("depositpaid", depositPaid);
		map.put("bookingdates", bookingDates);
		map.put("additionalneeds", additionalNeeds);

		Gson gson = new Gson();
		String requestBody = gson.toJson(map);
		System.out.println("\nRequest Body : " + requestBody);

		Response response = given().header("content-type", "application/json").contentType("application/json")
				.accept("application/json").body(requestBody).when().post("/booking");

		int statusCode = response.getStatusCode();
		String responseBody = response.getBody().asString();

		System.out.println("Response from /booking endpoint (Status " + statusCode + "):\n" + responseBody);

		if (statusCode == 200) {
			BookingResponse bookingResponse = gson.fromJson(responseBody, BookingResponse.class);
			int currentBookingId = bookingResponse.getBookingid();
			System.out.println("\nNew Booking Id : " + currentBookingId);
			return currentBookingId;
		} else {
			System.err.println("Unexpected response from /booking endpoint: " + responseBody);
			throw new IllegalStateException(
					"Unexpected response format or error from /booking endpoint. Status: " + statusCode);
		}

	}
	
	public void getBookingDetails(int bookingId) {
		String param = Integer.toString(bookingId);

		String response = given().header("Content-Type", "application/json").contentType("application/json")
				.accept("application/json").get("/booking/" + param).then()
				.statusCode(200).extract().asString();

		System.out.println("Raw Response: " + response);
		
		 Gson gson = new Gson();
	        Booking bookingDetails = gson.fromJson(response, Booking.class);
	        String firstName = bookingDetails.getFirstname();
	        String lastName = bookingDetails.getLastname();
	        int totalPrice = bookingDetails.getTotalprice();
	        boolean depositPaid = bookingDetails.isDepositpaid();
	        BookingDates bookingDates = bookingDetails.getBookingdates();
	        String checkInDate = bookingDates.getCheckin();
	        String checkOutDate = bookingDates.getCheckout();
	        String additionalNeeds = bookingDetails.getAdditionalneeds();

	        System.out.println("\n---------------Booking Details---------------\n");
	        System.out.println("First name: " + firstName);
	        System.out.println("Last name: " + lastName);
	        System.out.println("Total price: " + totalPrice);
	        System.out.println("Deposit paid: " + depositPaid);
	        System.out.println("Check-in date: " + checkInDate);
	        System.out.println("Check-out date: " + checkOutDate);
	        System.out.println("Additional needs: " + additionalNeeds);
    }


	@Test
	public void testHttpRequests() {
		baseURI = "https://restful-booker.herokuapp.com/";
		getBookingIds();
		String token = getAuthToken();
		System.out.println("Auth token generated : " + token);
		int bookingId = createBooking();

		getBookingDetails(bookingId);

	}
}
