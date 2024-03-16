const int electret_pin = 34;
const int window = 50;
const int ma_readings = 10;

int readings[ma_readings];
int index = 0;
long total = 0;
long average = 0;

void setup() {
  Serial.begin(115200);
  for (int current = 0; current < ma_readings; current++) {
    readings[current] = 0;
  }
}

void loop() {
  unsigned long sample_window = millis();
  unsigned int max_signal = 0;
  unsigned int min_signal = 1023;
  unsigned int sample;

  while (millis() - sample_window < window) {
    sample = analogRead(electret_pin);
    if (sample < 1024) {
      if (sample > max_signal) {
        max_signal = sample;
      }
      else if (sample < min_signal) {
        min_signal = sample;
      }
    }
  }

  unsigned int signal_pp = max_signal - min_signal;
  
  total = total - readings[index];
  readings[index] = max_signal;
  total = total + readings[index];
  index = index + 1;

  if (index >= ma_readings) {
    index = 0;
  }

  average = total / ma_readings;
  Serial.println(average);
}