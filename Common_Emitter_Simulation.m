V_CC = 12;
R_B = 100000;
R_E = 1000;
R_L = 4700;
beta = 100;
V_in = 0.7;

alpha = beta / (beta + 1);

A = [-R_B, 0, 0; beta, -1, 0; 1, 1, -1];
B = [V_in; 0; V_CC - V_in];

currents = linsolve(A, B);
I_B = currents(1);
I_C = currents(2);
I_E = currents(3);

V_out = I_C * R_L;

fprintf('Beta = %f\n', beta);
fprintf('Alpha = %f\n', alpha);
fprintf('I_B = %e A\n', I_B);
fprintf('I_C = %e A\n', I_C);
fprintf('I_E = %e A\n', I_E);
fprintf('V_out = %f V\n', V_out);