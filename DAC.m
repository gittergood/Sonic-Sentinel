bits = 8;
Vref = 5;
levels = 2^bits;

function Vout = DAC(digital_value, bits, Vref)
    levels = 2^bits;
    Vout = (digital_value / (levels - 1)) * Vref;
end

digital_values = 0:(2^bits)-1;
analog_values = arrayfun(@(x) DAC(x, bits, Vref), digital_values);

figure;
stem(digital_values, analog_values, 'filled');
title('Digital to Analog Conversion');
xlabel('Digital Input Value');
ylabel('Analog Output Voltage (V)');
grid on;
axis tight;