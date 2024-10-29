module LEDwater(clk,rst_n,stop,led);
  input clk,rst_n,stop;
  output reg[7:0] led;
  reg[31:0] cnt;
  reg[7:0] Current_state,Next_state;
  reg clk_div;
  parameter S0=8'b00000001,
				S1=8'b00000010,
				S2=8'b00000100,
				S3=8'b00001000,
				S4=8'b00010000,
				S5=8'b00100000,
				S6=8'b01000000,
				S7=8'b10000000;
// A simple frequency divider for reducing frequency of the input clk,to be remind, it's not a good idea to use clk_div as clk input in simulation (take too much time to obtain result)
always@(posedge clk or negedge rst_n)
begin
	if(!rst_n)
	begin
		cnt<=0;
		clk_div<=0;
	end
	else if(cnt==32'd5_000_000)
			begin
			clk_div<=~clk_div;
			cnt<=0;
			end
	else
			cnt<=cnt+1;
end
				
////-----------------三段式描述----------------------------    
always@(posedge clk_div or negedge rst_n) // Change clk to clk_div if requires to download to the development board
begin
   if (rst_n == 1'b0)
       Current_state <= S0;                     
   else 
       Current_state <= Next_state;
end

always@(Current_state or stop)
begin
   Next_state=8'bXXXX_XXXX;
   case(Current_state)
         S0: Next_state = stop ? S0 : S1;
         S1: Next_state = stop ? S1 : S2;
         S2: Next_state = stop ? S2 : S3;
         S3: Next_state = stop ? S3 : S4;
         S4: Next_state = stop ? S4 : S5;
         S5: Next_state = stop ? S5 : S6;
         S6: Next_state = stop ? S6 : S7;
         S7: Next_state = stop ? S7 : S0;
         default: Next_state = S0;
    endcase
end

always@(Current_state or stop or rst_n)
begin
   if (rst_n == 1'b0) led=8'b0000_0001;
   else begin
       case(Current_state)
               S0: led = stop ? 8'b0000_0001 : 8'b0000_0010;
               S1: led = stop ? 8'b0000_0010 : 8'b0000_0100;
               S2: led = stop ? 8'b0000_0100 : 8'b0000_1000;
               S3: led = stop ? 8'b0000_1000 : 8'b0001_0000;
               S4: led = stop ? 8'b0001_0000 : 8'b0010_0000;
               S5: led = stop ? 8'b0010_0000 : 8'b0100_0000;
               S6: led = stop ? 8'b0100_0000 : 8'b1000_0000;
               S7: led = stop ? 8'b1000_0000 : 8'b0000_0001;
               default: led = 8'b0000_0001;
        endcase
   end
end

endmodule

