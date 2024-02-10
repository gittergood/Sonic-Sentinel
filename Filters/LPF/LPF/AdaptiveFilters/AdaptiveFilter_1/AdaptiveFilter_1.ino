const int L = 32;
const float mu = 0.1;

void denoise(float *s, float *noise, float *en, int length) {
    float output[length];
    float xn[L] = {0};
    float weights[L] = {0};
    int interval = 0;

    for (int w_n = 0; w_n < length; w_n++) {
        interval = (w_n < L) ? w_n + 1 : L;
        
        for (int i = 0; i < interval; i++) {
            xn[i] = noise[w_n - i];
        }
        
        // Adaptive filter output
        output[w_n] = 0;
        for (int i = 0; i < interval; i++) {
            output[w_n] += weights[i] * xn[i];
        }
        
        // Error output
        en[w_n] = s[w_n] - output[w_n];
        
        // Readjust weight parameters
        for (int i = 0; i < interval; i++) {
            weights[i] += mu * en[w_n] * xn[i];
        }
    }
}