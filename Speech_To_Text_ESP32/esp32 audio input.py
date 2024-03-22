# Import the I2S driver library
#include <driver/i2s.h>

void setup() {
  // Initialize the I2S driver
  i2s_config_t i2s_config = {
    .mode = I2S_MODE_MASTER_RX, // Set as master receiver
    .sample_rate = 16000,      // Sample rate (adjust as needed)
    .bits_per_sample = I2S_BITS_PER_SAMPLE_32BIT,
    .channel_format = I2S_CHANNEL_FMT_RIGHT_LEFT,
    .communication_format = I2S_COMM_FORMAT_I2S,
    .intr_alloc_flags = ESP_INTR_FLAG_LEVEL1,
    .dma_buf_count = 16,       // Number of DMA buffers
    .dma_buf_len = 256         // Length of each DMA buffer
  };

  i2s_pin_config_t pin_config = {
    .bck_io_num = 26, // GPIO for bit clock (BCLK)
    .ws_io_num = 22,  // GPIO for word select (WS or LRCLK)
    .data_out_num = -1, // Not used for input
    .data_in_num = 25   // GPIO for serial data (SD)
  };

  i2s_driver_install(I2S_NUM_0, &i2s_config, 0, NULL);
  i2s_set_pin(I2S_NUM_0, &pin_config);
}

void loop() {
  // Read audio data from I2S buffer
  size_t bytes_read;
  uint32_t i2s_data[256]; // Adjust buffer size as needed

  i2s_read(I2S_NUM_0, i2s_data, sizeof(i2s_data), &bytes_read, portMAX_DELAY);

  // Process or store the audio data as required
  // For demonstration, we'll print it to the serial monitor
  for (size_t i = 0; i < bytes_read / sizeof(uint32_t); i++) {
    Serial.println(i2s_data[i]);
  }
}