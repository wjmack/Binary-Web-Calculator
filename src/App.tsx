import * as React from 'react'
import './App.css'

const App = () => {
    
    const [input, setInput] = React.useState("");
    const [mode, setMode] = React.useState(0);
    const [parity, setParity] = React.useState("Even");
    const [sign, setSign] = React.useState(0);

    const changeInput = (event: any) => {
        var newIn = event.target.value.toString().split("");
        if(mode != 3 && newIn.indexOf('.') > -1) return;
        if((newIn.filter(x => x == '.').length > 1 && input.indexOf('.') > -1) 
           || (newIn.indexOf('.') > -1 && input == "" && mode == 3)) return;
        console.log("x");
        setInput(event.target.value);
    }
    const changeMode = (event: any) => {
        if(input.indexOf('.') > -1) setInput("");
        setMode(event.target.value);
    }
    const decMode = () => {
        if(input.indexOf('.') > -1) setInput("");
        setMode(mode == 0 ? 3 : mode - 1);
    }
    const incMode = () => {
        if(input.indexOf('.') > -1) setInput("");
        setMode(mode == 3 ? 0 : mode + 1);
    }
    const changeParity = (event: any) => {
        setParity(event.target.value);
    }
    const changeSign = () => {
        setSign(sign == 0 ? 1 : 0);
    }
    const updateInput = (char: any) => {
        if(char == -100) {
            setInput("");
            return;
        } else if(char == '.' && (input.indexOf('.') > -1 || mode != 3 || input == "")) return;
        setInput(char >= 0 || char == '.' ? input + char : input.slice(0,-1));
    }

    const decToBinary = (z : string) => {
        if(input == "") return "";
        var x = + z;
        var binary = [x%2 == 0 ? "0" : "1"]
        while(x != 0) {
            x = Math.floor(x/2);
            binary.push(x%2);
        }
        binary.pop();
        return binary.reverse();
    }

    const binToDecimal = () => {
        const regex = new RegExp('^[0-1]{1,}$','g');
        if(input == "") return "";
        if(!regex.test(input) && input.length > 0) return "NOT BINARY";
        var x = input.split("").reverse();
        var sum = 0;
        for(var i = 0; i<x.length; i++) {
            if(x[i] == "1") sum += 2**i;
        }
        return sum;
    }

    const hammingEncoder = () => {
        const regex = new RegExp('^[0-1]{1,}$','g');
        if(!regex.test(input) && input.length > 0) return "NOT BINARY";
        if(input.length != 8) return "";
        const indeces = [[1,2,4,5,7],[1,3,4,6,7],[2,3,4,8],[5,6,7,8],[4,8,10,11]];
        const value = input.split('');
        var reversed = []; for(var i = value.length-1; i >= 0; i--) reversed.push(value[i]);
        const encodingBits = [];

        for(var set = 0; set < 4; set++) {
            const newBits = []; 
            for(var i = 0; i < indeces[set].length; i++) {
                newBits.push(reversed[indeces[set][i]-1]);
            }
            if(parity == "Even") {
                encodingBits.push(newBits.filter(x => x == '1').length % 2 == 0 ? '0' : '1');
            } else {
               encodingBits.push(newBits.filter(x => x == '1').length % 2 == 0 ? '1' : '0');
            } 
        }
        
        for(var i = 0; i < indeces[4].length; i++) value.splice(indeces[4][i],0,encodingBits.pop());
        return value; 
    }

    const ieeeFT = () => {
        if(input == "" || Math.abs(Math.floor(+ input)) == Math.abs(+ input)) return "";
        var numFloored = Math.floor(Math.abs(+ input));
        var length = 0; for(var i in decToBinary(numFloored)) length++;
        var bits = [sign];
        for(var i = 0; i<decToBinary(length+16).length; i++) bits.push(decToBinary(length+16)[i]);
        for(var i = 0; i<decToBinary(numFloored).length; i++) bits.push(decToBinary(numFloored)[i]);
        var x  = Math.abs(+ input) - numFloored;
        var c = 0;
        while(x != 1 && ++c < 12) {
            bits.push(Math.floor(x*2));
            x = x*2 - (x*2 > 1 ? 1 : 0);
        }
        while(bits.length > 14) bits.pop();
        while(bits.length < 14) bits.push(0);
        return (
            <div>
                <span id = "outputText" style = {{color:"darkred"}}>{bits[0]}</span>
                <span id = "outputText" style = {{color:"darkcyan"}}>{bits.slice(1,6)}</span>
                <span id = "outputText" style = {{color:"darkgreen"}}>{bits.slice(6,14)}</span>
            </div>
        );
    }

    return (
        <main>
            <div className="Calculator">
                <h1>CS-2520 CALCULATOR</h1>
                <div id = "output">{[decToBinary(input),binToDecimal(),hammingEncoder(),ieeeFT()][mode]}</div>
                <div id="input">
                    {mode == 3 ? 
                    <div className="selectSign" style={{fontSize:"20pt"}} onClick={changeSign}>{sign == 0 ? "+" : "-"}</div> 
                    : ""}
                    <input
                        type="text" 
                        id="inputBox"
                        placeholder="Input Value" 
                        value={input} 
                        onChange={changeInput}
                        maxLength={[18,18,8,18][mode]}
                    />
                    {mode == 2 ? 
                    <select className="select" style={{fontSize:"12pt"}} value={parity} onChange={changeParity}>
                      <option value="Even">Even</option>
                      <option value="Odd">Odd</option>
                    </select> 
                    : ""}
                </div>
                <div id="modeContainer">
                    <select value={mode} onChange={changeMode} id="modeSelection">
                        <option value="0">Decimal to Binary</option>
                        <option value="1">Binary to Decimal</option>
                        <option value="2">Hamming Encoder</option>
                        <option value="3">IEEE 14-bit</option>
                    </select>
                </div>
                <div id = "buttonContainer">
                <table id="table">
                    <tr>
                        <td><div onClick={() => updateInput(7)} id = "button">7</div></td><td><div onClick={() => updateInput(8)} id = "button">8</div></td><td><div onClick={() => updateInput(9)} id = "button">9</div></td>
                    </tr>
                    <tr>   
                        <td><div onClick={() => updateInput(4)} id = "button">4</div></td><td><div onClick={() => updateInput(5)} id = "button">5</div></td><td><div onClick={() => updateInput(6)} id = "button">6</div></td>
                    </tr>
                    <tr>
                        <td><div onClick={() => updateInput(1)} id = "button">1</div></td><td><div onClick={() => updateInput(2)} id = "button">2</div></td><td><div onClick={() => updateInput(3)} id = "button">3</div></td>
                    </tr>
                    <tr>
                        <td><div onClick={() => updateInput('.')} id = "button">.</div></td><td><div onClick={() => updateInput(0)} id = "button">0</div></td><td><div onClick={() => updateInput(-1)} id = "button">&lt;</div></td>
                    </tr>
                </table>
                </div>
                <div onClick={() => updateInput(-100)} id = "clearButton">CLEAR</div>
            </div>
        </main>
      )
}

export default App;