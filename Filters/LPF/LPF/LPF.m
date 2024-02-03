% paramters
f_c = 3400;
f_s = 1000;

% coefficient calcualtions
omega_c = 2 * pi * f_c / f_s;
Omega = tan(omega_c / 2);
b0 = Omega / (1 + Omega)
b1 = b0
a1 = (1 - Omega) / (1 + Omega)

% system definition
sys = tf([b0 b1],[1 a1]);
bode(sys);