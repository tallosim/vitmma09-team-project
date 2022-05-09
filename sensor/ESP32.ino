
#include <ArduinoHttpClient.h>
#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>

//WiFire csatlakozáshoz
const char* ssid = "<WIFI_SSID>";
const char* password =  "<PASSWORD_SSID>";


// RFID
#define SS_PIN 21
#define RST_PIN 22
#define RF_ID "ff23cb4d-57c9-4099-8cbf-30dd10d7cc4a" //id of the reader
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

//API
char serverAddress[] = "<SERVER_ADDRESS>";
int port = 8000;

WiFiClient wifi;
HttpClient apiClient = HttpClient(wifi, serverAddress, port);
int status = WL_IDLE_STATUS;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);   
  
  //WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
 
  Serial.println("Connected to the WiFi network");

  //RFID
  // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
  Serial.println("Approximate your card to the reader...");
  Serial.println();
}

void loop() {

  // RFID
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  //Show UID on serial monitor
  Serial.print("UID tag :");
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++) 
  {
     Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
     Serial.print(mfrc522.uid.uidByte[i], HEX);
     content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : ""));
     content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  Serial.print("Message : ");

  Serial.println("making POST request");
  String contentType = "application/json";
  String s1 = "{\"basketID\": \"";
  String s2 = "\",\"tagID\": \"";
  String s3 = "\"}";
  String postData = s1 + RF_ID + s2 + content + s3;

  //{\"sensorID\": RF_ID,\"card_id\":\"content\"}")

  Serial.println(postData);

  if(apiClient.post("/api/sendTagId", contentType, postData) == 0){ 
  // read the status code and body of the response
    int apiStatusCode = apiClient.responseStatusCode();
    String apiResponse = apiClient.responseBody();

    Serial.print("Status code from server: ");
    Serial.println(apiStatusCode);
    Serial.print("Response from server: ");
    Serial.println(apiResponse);
  } else {
    Serial.println("Server is not available.");  
  }
 
  //Serial.println("Wait one seconds\n");
  delay(1000);
}