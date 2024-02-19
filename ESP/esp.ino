#include <Wifi.h>
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


char incoming[255];                       // buffer to hold incoming packet
char  ReplyBuffer[] = "acknowledged";         // a string to send back
IPAddress control_unit(192, 168, 43, 42);     // address of the central unit.
bool nominal_operation = true;
String command = "'"
WiFiUDP Udp;                                  
camera_config_t config;
// TensorFlow model variables
TfLiteTensor* input;
TfLiteTensor* output;

bool connect_wifi(char name[], char pass[]){
  char ssid[] = name;   // wifi name
  char pass[] = pass;   // wifi password

  WiFi.mode(WIFI_STA); //Optional
  WiFi.begin(ssid, password);
  Serial.println("\nConnecting")

  Udp.begin(900);                              // Open connection on port number 900
  return true;
}

void print_address(){
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void stop_camera(){
  // Get ESP32 to stop sending camera data and stop capturing camera.
}

void get_camera_data(){
  // Grab camera data
  // Init Camera
  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("Camera initialization failed");
    return;
  }

  // Capture a still photo
  camera_fb_t* fb = esp_camera_fb_get();
  if (fb) {
    // Preprocess image for TensorFlow model
    preprocess_image(fb->buf, input->data.f);

    // Run inference
    tflInterpreter->Invoke();

    // Get the result
    float* results = output->data.f;
    float person_score = results[1]; // Assuming the model outputs scores for classes, and person is class 1

    Serial.println("Person Score: " + String(person_score));

    if(person_score){
      // Arduino code to beep
    }

    esp_camera_fb_return(fb);
  }
}

void receive_command(){
  // Allows the control unit to request data from the ESP32
  String commands[2] = {"send", "stop"};

  int packetSize = Udp.parsePacket();

  // Wait for control unit to request camera data
  int len = Udp.read(incoming, 255);
  if (len > 0) incoming[len] = 0;

  if(incoming == "send"){
    send_camera_data();
  }else{
    stop_camera();
  }
}


void send_camera_data(){
  // Send the captured camera data from the ESP32 to the control unit
  get_camera_data();          // Start reading camera data
}

void setup() {
  Serial.begin(115200);

  // put your setup code here, to run once:
  if(connect_wifi("test", "pass")){   
    nominal_operation = true;
  }else{
    nominal_operation = false;
    ESP.restart()                     // Restart esp if it wasn't able to get an IP address.
  }                 
}

void loop() {
  // If wifi connected, await command from control unit
  receive_command();
}