`timescale 1ns / 1ps
module LEDwater_vlg_tst();

// test vector input registers
reg clk;
reg rst_n;
reg stop;

// wires                                               
wire [7:0]  led;

                     
LEDwater test_LEDwater (
// port map - connection between master ports and signals/registers   
	.clk(clk),
	.led(led),
	.rst_n(rst_n),
	.stop(stop)
);

parameter PERIOD=20; 

initial
begin
	clk=0;
	rst_n=0;
	stop=0;
	#10 rst_n=1;
	#500 stop=1;
	#100 $stop;
end

always
begin
	#(PERIOD/2) clk=~clk;
end



endmodule