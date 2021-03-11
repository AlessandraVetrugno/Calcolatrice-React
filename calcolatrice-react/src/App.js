import React, { useContext, useReducer } from "react";
import "./styles.css";
const appContext = React.createContext(null);
let risultati = [0];

export function App() {
  const [state, dispatch] = useReducer(AppReducer, { display: "" });
  function Tasti() {
    return (
      <div className="tastiera">
        <div className="row">
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "Ac" });
            }}
          >
            Ac
          </button>
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "√" });
            }}
          >
            √
          </button>

          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "%" });
            }}
          >
            %
          </button>
          <button
            className="btn tasto simbolo"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "/" });
            }}
          >
            ÷
          </button>
        </div>
        <div className="row">
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "7" });
            }}
          >
            7
          </button>
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "8" });
            }}
          >
            8
          </button>
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "9" });
            }}
          >
            9
          </button>
          <button
            className="btn tasto simbolo"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "x" });
            }}
          >
            ×
          </button>
        </div>
        <div className="row">
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "6" });
            }}
          >
            6
          </button>
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "5" });
            }}
          >
            5
          </button>
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "4" });
            }}
          >
            4
          </button>
          <button
            className="btn tasto simbolo"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "-" });
            }}
          >
            -
          </button>
        </div>
        <div className="row">
          <button
            className="btn tasto"
            value="3"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "3" });
            }}
          >
            3
          </button>
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "2" });
            }}
          >
            2
          </button>
          <button
            className="btn tasto"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "1" });
            }}
          >
            1
          </button>
          <button
            className="btn tasto simbolo"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "+" });
            }}
          >
            +
          </button>
        </div>
        <div className="row">
          <button
            className="btn tasto ultima-riga"
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "0" });
            }}
          >
            0
          </button>
          <button
            className="btn tasto "
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "." });
            }}
          >
            .
          </button>
          <button
            className="btn tasto simbolo "
            onClick={() => {
              dispatch({ type: "SCRIVI", payload: "=" });
            }}
          >
            =
          </button>
        </div>
      </div>
    );
  }
  function Display() {
    const { state, dispatch } = useContext(appContext);
    return <div className="display align-bottom"> {state.display}</div>;
  }
  return (
    <appContext.Provider value={{ state, dispatch }}>
      <div className="App  ">
        <Display></Display>
        <Tasti></Tasti>
      </div>
    </appContext.Provider>
  );
}
function AppReducer(state, action) {
  let NewState = { ...state };
  if (action.type === "SCRIVI") {
    NewState.display = Scrivi(action.payload, NewState.display);
  }
  return NewState;
}

function Scrivi(p, display) {
  if (p === "Ac") return "";
  else if (p === "=") return daInAPos(display);
  else return (display += p);
}

function isOperand(x) {
  return x == "+" || x == "-" || x == "x" || x == "÷" || x == "^" || x == "%";
}

function precedence(a, b) {
  if (a == "+" || a == "-") return false;
  else return b == "+" || b == "-";
}

function eseguiOp(b, a, x) {
  if (x === "+") {
    if (a === null) return Number(0) + Number(b);
    return Number(a) + Number(b);
  }
  if (x === "-") {
    if (a == null) return Number(0) - Number(b);
    return Number(a) - Number(b);
  }
  if (x === "x") return Number(a) * Number(b);
  if (x === "÷") return Number(a) / Number(b);
  if (x === "%") return Number(a) % Number(b);
  return 0;
}
function daInAPos(infix) {
  let posfix = [];
  let stackChar = [];
  console.log("-----------------------------------");
  console.log("Infissa: " + infix);
  //Conversione a posfissa
  stackChar.push("(");
  for (var i = infix.length; i > 0; i--) infix += ")";
  for (var i = 0; stackChar.length != 0; i++) {
    let x = infix[i];
    if (!isNaN(x) || x == "." || x == "π") {
      if (x == "π") x = Math.PI;
      let numero = "";
      while (!isNaN(x) || x == ".") {
        numero += x;
        i++;
        x = infix[i];
      }
      posfix.push(numero);
      i--;
    } else if (infix.slice(i, i + 3) == "Ans") {
      posfix.push("Ans");
      i += 2;
    } else if (x == "(") stackChar.push("(");
    else if (x == ")") {
      let a = stackChar.pop();
      while (isOperand(a) || isFunction(a)) {
        posfix.push(a);
        a = stackChar.pop();
      }
    } else if (isNaN(x)) {
      if (isFunction(infix.slice(i, i + 3))) {
        x = infix.slice(i, i + 3);
        i += 2;
      }
      let a = stackChar.pop();
      while (isOperand(a) || isFunction(a)) {
        if (!precedence(x, a)) {
          posfix.push(a);
          a = stackChar.pop();
        } else {
          stackChar.push(a);
          break;
        }
      }
      if (!isOperand(a) || !isFunction(a)) stackChar.push(a);
      stackChar.push(x);
    }
  }
  for (let i = 0; i < posfix.length; i++) {
    if (isOperand(posfix[i]) && posfix[i] == posfix[i + 1]) posfix.splice(i, 1);
  }
  console.log("Postfissa: " + posfix);
  return daPosADouble(posfix);
}

function daPosADouble(posfix) {
  let stackInt = [];
  let risultato;

  posfix.forEach((x) => {
    if (x == "Ans") {
      let n = risultati.pop();
      risultati.push(n);
      stackInt.push(n);
    } else if (!isNaN(x)) {
      stackInt.push(x);
    } else if (isFunction(x)) {
      let n = stackInt.pop();
      let risultato = eseguiFun(n, x);
      stackInt.push(risultato);
    } else if (x == "√") {
      let n = stackInt.pop();
      let risultato = eseguiFun(n, x);
      stackInt.push(risultato);
    } else {
      let a = stackInt.pop();
      let b = stackInt.pop();
      let risultato = eseguiOp(a, b, x);
      if (risultato == "+infinito" || risultato == "-infinito")
        return risultato;
      stackInt.push(risultato);
    }
  });
  risultato = stackInt.pop();
  console.log("Risultato: " + risultato);
  console.log("-----------------------------------");
  risultati.push(risultato);
  return "" + risultato;
}

function isFunction(x) {
  return x == "√";
}

function eseguiFun(n, x) {
  let risultato = 0;
  if (x == "√") {
    return Math.sqrt(n);
  }
  return risultato;
}
