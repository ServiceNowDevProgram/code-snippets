
---

## ⚡ 2. NodeMCU_IoT_Sensor.ino

```cpp
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

#define DHTPIN D4      // Pin connected to sensor
#define DHTTYPE DHT11  // DHT 11 sensor

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverName = "https://YOUR_INSTANCE.service-now.com/api/x_iot/iotdeviceapi/data";
const char* user = "YOUR_SERVICENOW_USER";
const char* userPassword = "YOUR_SERVICENOW_PASSWORD";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  dht.begin();
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nConnected!");
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.setAuthorization(user, userPassword);
    http.addHeader("Content-Type", "application/json");

    String payload = "{";
    payload += "\"device_id\":\"PARK01\",";
    payload += "\"status\":\"occupied\",";
    payload += "\"temperature\":" + String(temperature) + ",";
    payload += "\"humidity\":" + String(humidity);
    payload += "}";

    int httpCode = http.POST(payload);
    String response = http.getString();

    Serial.println(httpCode);
    Serial.println(response);
    http.end();
  } else {
    Serial.println("WiFi not connected");
  }
  delay(10000); // send every 10 seconds
}
