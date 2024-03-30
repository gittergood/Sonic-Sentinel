# The MIT License (MIT)
# Copyright (c) 2024 OpenAI

import urequests
import ujson
import machine
import time

# Configure I2S pins for INMP441
i2s_ws_pin = machine.Pin(25)
i2s_sd_pin = machine.Pin(33)
i2s_sck_pin = machine.Pin(32)

# Initialize I2S for audio input
i2s = machine.I2S(
    0,  # I2S bus number
    ws=i2s_ws_pin,
    sd=i2s_sd_pin,
    sck=i2s_sck_pin,
    mode=machine.I2S.MASTER_RX,
    sample_rate=16000,  # Adjust sample rate as needed
    data_format=machine.I2S.B32,
    channel_format=machine.I2S.RIGHT_LEFT,
)

# Google Web Speech API endpoint
API_URL = "https://www.google.com/speech-api/v2/recognize?output=json&lang=en-US"

def record_audio():
    # Read audio data from I2S buffer
    audio_data = bytearray(1024)  # Adjust buffer size as needed
    i2s.readinto(audio_data)
    return audio_data

def convert_to_text(audio_data):
    headers = {"Content-Type": "audio/l16; rate=16000"}
    response = urequests.post(API_URL, data=audio_data, headers=headers)
    result = ujson.loads(response.text)
    if "result" in result:
        return result["result"][0]["alternative"][0]["transcript"]
    else:
        return None

def main():
    while True:
        try:
            audio_data = record_audio()
            text = convert_to_text(audio_data)
            if text:
                print("Speech to text:", text)
            else:
                print("No speech detected.")
            time.sleep(1)
        except KeyboardInterrupt:
            break

if __name__ == "__main__":
    main()
