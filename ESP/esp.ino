#include <WiFi.h>
#include "esp_camera.h"
#include "esp_timer.h"
#include <ESPAsyncWebServer.h>
#include <WiFiUdp.h>
#include "camera_pins.h"
#include <TensorFlowLite_ESP32.h>
#include <image_provider.h>
#include <Arduino.h>

#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27
#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22
#define SLEEP_DURATION_US 8000000

const int PIN_CAM_POWER = 4; // Adjust this pin based on your actual hardware setup

const int udpPort = 5000;
char incoming[255];
const char* control_unit = "192.168.43.42";
bool nominal_operation = true;
int speaker = 4;
WiFiUDP Udp;
camera_config_t config;
String mode;

// TensorFlow model variables
TfLiteTensor* input;
TfLiteTensor* output;

bool connect_wifi(const char* name, const char* pass) {
  const char* ssid = name;
  const char* password = pass;

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  Serial.println("\nConnecting");

  Udp.begin(udpPort);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
    if (++attempts > 30) {
      Serial.println("Failed to connect to WiFi. Restarting...");
      ESP.restart();
    }
  }

  Serial.println("Connected to WiFi");
  Serial.println("IP Address: " + WiFi.localIP().toString());

  return true;
}

void stop_camera() {
  esp_camera_deinit();
  pinMode(PIN_CAM_POWER, OUTPUT);
  digitalWrite(PIN_CAM_POWER, LOW);
}

void get_camera_data() {
  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("Camera initialization failed");
    return;
  }

  camera_fb_t* fb = esp_camera_fb_get();
  if (fb) {
    preprocess_image(fb->buf, input->data.f);
    tflInterpreter->Invoke();
    float* results = output->data.f;
    float person_score = results[1];

    Serial.println("Person Score: " + String(person_score));

    if (person_score) {
      // Beep for 
      for (int i=0; i<2; i++) {            // Beep for 4 seconds as long as the person is in view
        digitalWrite(speaker, HIGH);
        delayMicroseconds(2000);
        digitalWrite(speaker, LOW);
        delayMicroseconds(2000);
      }
    }

    esp_camera_fb_return(fb);
  }
}

void receive_command() {
  int packetSize = Udp.parsePacket();
  
  if (packetSize) {
    int len = Udp.read(incoming, 255);
    if (len > 0) {
      incoming[len] = 0;

      // Once the module receives a packet, respond to the main module to let it know that we received the data. Otherwise the server will assume that the module is asleep and will resend the packet later.
      udp.beginPacket(serverIP, serverPort);
      udp.print("Received");
      udp.endPacket();

      if (String(incoming) == "send") {
        send_camera_data();
      } else {
        stop_camera();
      }
    }
  }else {
    Serial.println("Sleeping for 8 seconds");
    esp_sleep_enable_timer_wakeup(SLEEP_DURATION_US);
    esp_light_sleep_start();
    Serial.println("Waking up...");

    delay(1000);  // Delay for stability, adjust as needed
  }
}

void send_camera_data() {
  get_camera_data();
}

void setup() {
  pinMode(speaker, OUTPUT);
  Serial.begin(115200);

  if (connect_wifi("test", "pass")) {
    nominal_operation = true;
  } else {
    nominal_operation = false;
    ESP.restart();
  }
}

void loop() {
  receive_command();
  // Your other loop code here
}
