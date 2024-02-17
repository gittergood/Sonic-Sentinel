
#include <math.h>

#define N // array size

void dft(float *x, float *y) {
    float W_real, W_imag;
    float kn_real, kn_imag;
    float theta;
    int n, k;

    for (k = 0; k < N; k++) {
        y[k] = 0;
        for (n = 0; n < N; n++) {
            theta = -2 * M_PI * k * n / N;
            kn_real = cos(theta);
            kn_imag = sin(theta);
            W_real = kn_real;
            W_imag = -kn_imag;
            y[k] += x[n] * (W_real + W_imag);
        }
    }
}
