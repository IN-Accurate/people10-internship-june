package tests.SampleTests;

import java.time.LocalDate;
import com.google.gson.JsonParser;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

import org.testng.annotations.Test;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static io.restassured.RestAssured.*;
import tests.SampleTests.BookingResponse;
import tests.SampleTests.BookingResponse.Booking;
import tests.SampleTests.BookingResponse.BookingDates;

public class HTTPRequestsTests {

	public List<Integer> getBookingIds() {
		String response = given().get("/booking").then().statusCode(200).extract().asPrettyString();

		System.out.println(response);
		JsonArray jsonArray = JsonParser.parseString(response).getAsJsonArray();
		List<Integer> bookingIdList = new ArrayList<>();

		for (JsonElement jsonElement : jsonArray) {
			JsonObject jsonObject = jsonElement.getAsJsonObject();
			int bookingId = jsonObject.get("bookingid").getAsInt();
			bookingIdList.add(bookingId);
		}
		return bookingIdList;
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
			System.out.println("\nNew Booking Id : " + currentBookingId + "\n\n");
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
				.accept("application/json").get("/booking/" + param).then().statusCode(200).extract().asString();

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

	public void updateBookingDetails(int bookingId, String authToken) {
		String param = Integer.toString(bookingId);
		System.out.println(bookingId);
		System.out.println("\n-----------Update Booking------------\n");
		System.out.println("Enter the new details : \n");
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

		Map<String, String> headerMap = new HashMap<>();
		headerMap.put("content-type", "application/json");
		headerMap.put("Cookie", "token=" + authToken);

		System.out.println("\nRequest Body : " + requestBody);
		System.out.println(param);
		Response response = given().headers(headerMap).contentType("application/json").accept("application/json")
				.body(requestBody).when().put("/booking/" + param);

		int statusCode = response.getStatusCode();
		System.out.println(response.body().asPrettyString());
		if (statusCode == 200) {
			System.out.println("Updated Successfully!");
			System.out.println("--------------New Details----------\n");
			getBookingDetails(bookingId);
		}

	}

	public void partialUpdateBookingDetails(int bookingId, String authToken) {
		String param = Integer.toString(bookingId);
		System.out.println(bookingId);
		System.out.println("\n-----------Partial Update Booking------------\n");
		System.out.println(
				"Enter the fields you want to update (firstname, lastname, totalprice, depositpaid, additionalneeds, bookingdates). Enter 'finish' when finished:");

		Scanner scanner = new Scanner(System.in);
		List<String> fieldsToUpdate = new ArrayList<>();

		while (true) {
			String field = scanner.nextLine().toLowerCase().trim();
			if (field.equals("finish")) {
				break;
			}
			fieldsToUpdate.add(field);
		}

		Map<String, Object> map = new HashMap<>();

		for (String field : fieldsToUpdate) {
			switch (field) {
			case "firstname":
				System.out.println("Enter your firstname: ");
				map.put("firstname", scanner.nextLine());
				break;
			case "lastname":
				System.out.println("Enter your lastname: ");
				map.put("lastname", scanner.nextLine());
				break;
			case "totalprice":
				System.out.println("Enter totalprice: ");
				map.put("totalprice", scanner.nextInt());
				scanner.nextLine();
				break;
			case "depositpaid":
				System.out.println("Enter 1 if you paid the deposit, else 0: ");
				int flag = scanner.nextInt();
				map.put("depositpaid", flag == 1);
				scanner.nextLine();
				break;
			case "additionalneeds":
				System.out.println("Enter the additional needs (Eg:Breakfast): ");
				map.put("additionalneeds", scanner.nextLine());
				break;
			case "bookingdates":
				LocalDate today = LocalDate.now();
				LocalDate oneYearLater = today.plusYears(1);
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
				String checkInDate = today.format(formatter);
				String checkOutDate = oneYearLater.format(formatter);
				Map<String, Object> bookingDates = new HashMap<>();
				bookingDates.put("checkin", checkInDate);
				bookingDates.put("checkout", checkOutDate);
				map.put("bookingdates", bookingDates);
				break;
			default:
				System.out.println("Invalid field. Try again.");
			}
		}

		Gson gson = new Gson();
		String requestBody = gson.toJson(map);

		Map<String, String> headerMap = new HashMap<>();
		headerMap.put("content-type", "application/json");
		headerMap.put("Cookie", "token=" + authToken);

		System.out.println("\nRequest Body : " + requestBody);
		System.out.println(param);
		Response response = given().headers(headerMap).contentType("application/json").accept("application/json")
				.body(requestBody).when().patch("/booking/" + param);

		int statusCode = response.getStatusCode();
		System.out.println(response.body().asPrettyString());
		if (statusCode == 200) {
			System.out.println("Updated Successfully!");
			System.out.println("--------------New Details----------\n");
			getBookingDetails(bookingId);
		}
	}

	public void deleteDetails(String authToken) {
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter the booking ID to delete: ");
		int bookingId = scanner.nextInt();

		List<Integer> bookingIds = getBookingIds();

		if (bookingIds.contains(bookingId)) {
			String param = Integer.toString(bookingId);
			System.out.println("Deleting booking ID: " + bookingId);

			Map<String, String> headerMap = new HashMap<>();
			headerMap.put("content-type", "application/json");
			headerMap.put("Cookie", "token=" + authToken);

			Response response = given().headers(headerMap).when().delete("/booking/" + param);

			int statusCode = response.getStatusCode();
			System.out.println(response.body().asPrettyString());
			if (statusCode == 201) {
				System.out.println("Deleted Successfully!");
			} else {
				System.out.println("Failed to delete. Status Code: " + statusCode);
			}
		} else {
			System.out.println("Booking ID not found.");
		}
	}

	@Test
	public void testHttpRequests() {
		baseURI = "https://restful-booker.herokuapp.com/";
		getBookingIds();
		String token = getAuthToken();
		System.out.println("Auth token generated : " + token);
		int bookingId = createBooking();
		getBookingDetails(bookingId);
		updateBookingDetails(bookingId, token);
		partialUpdateBookingDetails(bookingId, token);
		deleteDetails(token);

	}
}
