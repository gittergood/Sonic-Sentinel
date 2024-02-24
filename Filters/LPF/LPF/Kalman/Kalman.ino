float estimate = 0;
float estimate_error = 1;
float measure_error = 1;
float noise = 0.05;
float gain = 0;
int sensor_value = 0;
float measurement = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  sensor_value = analogRead(A0);
  measurement = (float)sensor_value * (5.0 / 1023.0);

  // Update Measurement
  gain = estimate_error / (estimate_error + measure_error);
  estimate = estimate + gain * (measurement - estimate);
  estimateError = (1 - gain) * estimate_error + fabs(estimate_error * noise);

  Serial.print("Filtered: ");
  Serial.println(estimate);

  delay(100);
}