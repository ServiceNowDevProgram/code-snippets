# IoT NodeMCU → ServiceNow REST Integration

##  Overview
This snippet demonstrates how to send real-time sensor data (e.g., parking slot status, temperature, or humidity) from a **NodeMCU (ESP8266)** board to a **ServiceNow instance** using the REST API.  
It shows how edge IoT devices can log events directly into ServiceNow tables such as `x_iot_device_data` or `incident`.



##  Components
- NodeMCU (ESP8266)
- DHT11 Temperature/Humidity sensor (or IR/Ultrasonic sensor)
- Wi-Fi connection
- ServiceNow instance with Scripted REST API enabled



##  NodeMCU Script (`NodeMCU_IoT_Sensor.ino`)
Connects to Wi-Fi, reads sensor data, and sends JSON payload to ServiceNow REST endpoint.



##  ServiceNow Scripted REST API (`ServiceNow_REST_Endpoint.js`)
Receives JSON payload and inserts into the `x_iot_device_data` table.



##  How to Use
1. **ServiceNow Setup**
   - Navigate to **System Web Services → Scripted REST APIs**
   - Create a new API called `IoTDeviceAPI`
   - Add a resource `/data`
   - Paste code from `ServiceNow_REST_Endpoint.js`
   - Test via Postman

2. **NodeMCU Setup**
   - Update Wi-Fi credentials: `ssid` and `password`
   - Update ServiceNow endpoint URL, username, and password
   - Flash code using Arduino IDE
   - Open Serial Monitor to verify successful data push

3. **Verify in ServiceNow**
   - Check `x_iot_device_data` table for new records
   - Optional: create Flow Designer flow for automation

##  Example Output

```json
{
  "device_id": "PARK01",
  "status": "occupied",
  "temperature": 28,
  "humidity": 60,
  "timestamp": "2025-10-27T14:23:05Z"
}


