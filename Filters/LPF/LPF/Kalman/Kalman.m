% Sinusoidal Signal Parameters
Fs = 1000;
T = 1/Fs;
L = 1500;
t = (0:L-1)*T;

% Input Signal
A = 0.7;
f = 50;
signal = A*sin(2*pi*f*t);

% Adding Noise
signal_with_noise = signal + 0.5*randn(size(t));

% Filter Initialization
x_est = 0;
P_est = 1;
Q = 0.1;
R = 0.25;
F = 1;
H = 1;

% Store Outputs
x_est_arr = zeros(size(t));

for k = 1:length(t)
    x_pred = F * x_est;
    P_pred = F * P_est * F' + Q;
    
    K = P_pred * H' / (H * P_pred * H' + R);
    x_est = x_pred + K * (noisySignal(k) - H * x_pred);
    P_est = (1 - K * H) * P_pred;
    
    x_est_arr(k) = x_est;
end

figure;
plot(t, noisySignal, 'r', 'LineWidth', 1);
hold on;
plot(t, x_est_arr, 'b', 'LineWidth', 2);
title('Kalman Filtering');
xlabel('Time (seconds)');
ylabel('Amplitude');
legend('Noisy Signal', 'Kalman Filter Output');
grid on;