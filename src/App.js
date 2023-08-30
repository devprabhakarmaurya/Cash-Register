import "./styles.css";
import React, { useState } from "react";

const notesAvailable = [2000, 500, 100, 20, 5, 2, 1];

export default function App() {
  const [inputBill, setInputBill] = useState("");
  const [cashAmount, setCashAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [numberOfNotes, setNumberOfNotes] = useState(
    new Array(notesAvailable.length).fill(0)
  );

  function onClickHandler() {
    if (inputBill > 0) {
      if (parseFloat(cashAmount) >= parseFloat(inputBill)) {
        let cashAmtReturn = parseFloat(cashAmount) - parseFloat(inputBill);
        calculateReturnChange(cashAmtReturn);
        setErrorMessage("");
      } else {
        setErrorMessage("Cash Amount should be at least equal to Bill Amount.");
      }
    } else {
      setErrorMessage("Bill Amount should be greater than 0.");
    }
  }

  function calculateReturnChange(cashAmtReturn) {
    const updatedNumberOfNotes = notesAvailable.map((noteValue, index) => {
      const noteReturn = Math.trunc(cashAmtReturn / noteValue);
      cashAmtReturn %= noteValue;
      return noteReturn;
    });

    setNumberOfNotes(updatedNumberOfNotes);
  }

  return (
    <div className="App">
      <div className="hero-heading">
        <h1>Cash Register</h1>
      </div>
      <div className="container">
        <p className="hero-para">
          Enter the bill amount and cash given by the customer and know the
          minimum number of notes to return.
        </p>
        <label className="hero-label" htmlFor="input-bill">
          Bill Amount
        </label>
        <input
          className="hero-input"
          id="input-bill"
          value={inputBill}
          onChange={(event) => setInputBill(event.target.value)}
        />
        <label className="hero-label" htmlFor="input-cash">
          Cash Received
        </label>
        <input
          className="hero-input"
          id="input-cash"
          value={cashAmount}
          onChange={(event) => setCashAmount(event.target.value)}
        />
        <button className="hero-btn" id="btn-check" onClick={onClickHandler}>
          Check
        </button>
        {errorMessage && <span className="hero-error">{errorMessage}</span>}
        <div className="hero-div-table">
          <table className="hero-table">
            <caption>Notes to Return</caption>
            <thead>
              <tr>
                <td>Notes</td>
                {notesAvailable.map((item) => (
                  <td key={item}>{item}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Notes to return</td>
                {numberOfNotes.map((count, index) => (
                  <td key={index} className="noOfNotes">
                    {count}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="footer">
        <span>Made with ❤️ by Prabhakar Maurya</span>
      </div>
    </div>
  );
}
