`timescale 1ns / 1ps
module tb_decoder(
    );
reg A,B,C;
wire [7:0] Y;

parameter Tclk = 10;

decoder decoder0(
    .A(A),
    .B(B),
    .C(C),
    .Y(Y)
);

initial begin
                        A = 0;B = 0;C = 0;
        #(Tclk * 3)     A = 0;B = 0;C = 1;
        #(Tclk * 3)     A = 0;B = 1;C = 0;
        #(Tclk * 3)     A = 0;B = 1;C = 1;
        #(Tclk * 3)     A = 1;B = 0;C = 0;
        #(Tclk * 3)     A = 1;B = 0;C = 1;
        #(Tclk * 3)     A = 1;B = 1;C = 0;
        #(Tclk * 3)     A = 1;B = 1;C = 1;
        #(Tclk*15)      $stop;

end

endmodule
