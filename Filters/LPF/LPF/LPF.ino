const int pin = 2;
float yn = 0;
float xn = 0;
float yn_next;
float xn_next;

void setup() {
  Serial.begin(9600);
  pinMode(pin, INPUT);
}

void loop() {
  x_n_plus_1 = analogRead(pin);
  y_n_plus_1 = 0.5095 * y_n + 0.7548 * (x_n_plus_1 + x_n);
  x_n = x_n_plus_1;
  y_n = y_n_plus_1;
  Serial.println(y_n_plus_1);
  delay(10);
}