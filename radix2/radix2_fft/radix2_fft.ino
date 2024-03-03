struct Complex {
  float real;
  float imag;
};

Complex add(Complex a, Complex b) {
  Complex result;
  result.real = a.real + b.real;
  result.imag = a.imag + b.imag;
  return result;
}

Complex sub(Complex a, Complex b) {
  Complex result;
  result.real = a.real - b.real;
  result.imag = a.imag - b.imag;
  return result;
}

Complex mult_num(Complex a, Complex b) {
  Complex result;
  result.real = a.real * b.real - a.imag * b.imag;
  result.imag = a.real * b.imag + a.imag * b.real;
  return result;
}

Complex exp(float imag) {
  Complex result;
  result.real = cos(imag);
  result.imag = sin(imag);
  return result;
}

// Bit-reversal
void bit_rev(Complex* v, int N) {
  for (unsigned int i = 0, j = 0; i < N; ++i) {
    if (i < j) {
      Complex temp = v[i];
      v[i] = v[j];
      v[j] = temp;
    }
    for (unsigned int k = N >> 1; (j ^= k) < k; k >>= 1);
  }
}

// Radix-2 FFT
void radix2fft(Complex* v, int N) {
  if (__builtin_popcount(N) != 1) { // Check if N is a power of 2
    return;
  }

  bit_rev(v, N);

  for (int m = 1; m <= log2(N); ++m) {
    int l = 1 << (m - 1);
    for (int i = 0; i < N; i += 2 * l) {
      for (int k = 0; k < l; ++k) {
        Complex t = mult_num(exp(-2 * PI * k / N), v[i + k + l]);
        v[i + k + l] = sub(v[i + k], t);
        v[i + k] = add(v[i + k], t);
      }
    }
  }
}
