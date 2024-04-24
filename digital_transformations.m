% Sampling Rate
fs = 24000;

% Low Pass Filter (analog)
figure(1);
[b,a] = butter(5,20000,'low','s');
freqs(b,a)
title('Analog Filter Frequency Response')

% Low Pass Filter (bilinear)
figure(2);
[b,a] = butter(5,2*pi*20000,'low','s');
[bz,az] = bilinear(b,a,fs);
freqz(bz,az,[],fs);
title('Bilinear Transformation Frequency Response')

% Group Delay for Bilinear Transformation
figure(3);
grpdelay(bz, az, 512, fs);
title('Group Delay for Bilinear Transformation')

% Low Pass Filter (impulse invariant)
figure(4);
[b,a] = butter(5,2*pi*20000,'low','s');
[bz,az] = impinvar(b,a,fs);
freqz(bz,az,1024,fs);
title('Impulse Invariant Transformation Frequency Response')

% Group Delay for Impulse Invariant Transformation
figure(5);
grpdelay(bz, az, 512, fs);
title('Group Delay for Impulse Invariant Transformation')

% Low Pass Filter (step invariant)
figure(6);
[b,a] = butter(5,20000,'low','s');
sys = tf(b,a);
sysz = c2d(sys,1/fs, 'tustin');
bode(sysz);
title('Step Invariant (Tustin) Transformation Bode Plot')

% Phase response for Step Invariant Transformation
figure(7);
[h, w] = freqz(bz,az,[],fs);
phase = unwrap(angle(h));
plot(w, phase);
xlabel('Frequency (Hz)')
ylabel('Phase (Radians)')
title('Phase Response for Step Invariant Transformation')

% Comparative Analysis
figure(8);
subplot(2,2,1);
freqz(bz, az, 1024, fs);
title('Impulse Invariant Frequency Response');
subplot(2,2,2);
freqz(bz, az, [], fs);
title('Bilinear Frequency Response');
subplot(2,2,3);
grpdelay(bz, az, 512, fs);
title('Impulse Invariant Group Delay');
subplot(2,2,4);
grpdelay(bz, az, 512, fs);
title('Bilinear Group Delay');