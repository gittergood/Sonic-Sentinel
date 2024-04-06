import numpy as np
import librosa
import librosa.display
import matplotlib.pyplot as plt

def load_audio(filename):
    audio, sr = librosa.load(filename)
    return audio, sr

def frame_signal(audio, sr, frame_length=0.025, frame_stride=0.01):
    frame_length, frame_stride = frame_length * sr, frame_stride * sr
    signal_length = len(audio)
    frame_length = int(round(frame_length))
    frame_stride = int(round(frame_stride))
    num_frames = int(np.ceil(float(np.abs(signal_length - frame_length)) / frame_stride))

    pad_signal_length = num_frames * frame_stride + frame_length
    z = np.zeros((pad_signal_length - signal_length))
    pad_signal = np.append(audio, z)

    indices = np.tile(np.arange(0, frame_length), (num_frames, 1)) + np.tile(np.arange(0, num_frames * frame_stride, frame_stride), (frame_length, 1)).T
    frames = pad_signal[indices.astype(np.int32, copy=False)]
    return frames

def fft_frames(frames, NFFT=512):
    mag_frames = np.absolute(np.fft.rfft(frames, NFFT))
    pow_frames = ((1.0 / NFFT) * ((mag_frames) ** 2))  # Power Spectrum
    return pow_frames

def apply_cepstrum(pow_frames):
    cepstrum = np.fft.irfft(np.log(pow_frames))
    return cepstrum

def analyze_audio(filename):
    audio, sr = load_audio(filename)
    frames = frame_signal(audio, sr)
    pow_frames = fft_frames(frames)
    cepstrum = apply_cepstrum(pow_frames)

    plt.figure(figsize=(10, 4))
    librosa.display.waveshow(cepstrum[0], sr=sr)
    plt.title('Cepstrum of the first frame')
    plt.tight_layout()
    plt.show()

filename = 'vowels.wav'
analyze_audio(filename)