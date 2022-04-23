# Binary Web Calculator
<img src="https://github.com/wjmack/Binary-Web-Calculator/blob/main/webcalc.png" width=300/>  
**Description**  
A web calculator for binary numbers built in TypeScript using React.js.  
Can convert decimal to binary, and binary to decimal.  
Can encode 8 bits of data with 4 bits of Hamming code.  
Can convert floating point numbers into their respective 14-bit IEEE representation.  

**How to Use**  
See a working version hosted on Repl.it <a href="https://cs2520-web-calc.wjmackinnon.repl.co/">here</a>.  
Use the keyboard, or the digital keypad to input values.  
Use the drop-down menu to change operations.  
If the number outputted by the calculator is larger than the output display, hover the mouse over the display to enable overflow scrolling  

**Known Issues**  
Rare crashes may occur when trying to convert some floats to binary in 14-bit IEEE representation.


**Note**  
Find the majority of backend and frontend code at <a href="https://github.com/wjmack/Binary-Web-Calculator/blob/main/src/App.tsx">src/App.tsx</a>.
