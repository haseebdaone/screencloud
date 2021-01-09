import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import screencloud from "../api/screencloud";

const DashPage = ({ location }) => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState({
    5: Array.from({ length: 4 }, (v, i) => i),
    20: Array.from({ length: 7 }, (v, i) => i),
    10: Array.from({ length: 15 }, (v, i) => i),
  });

  useEffect(() => {
    if (location) {
      setBalance(location.state.currentBalance);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(amount);
    let totalAmount = 0;
    let currentNotes = { ...notes };
    let keys = ["5", "20", "10"];
    console.log(keys);

    while (totalAmount < amount) {
      keys.forEach((x) => {
        if (totalAmount == amount) return;
        if (currentNotes[x]) {
          totalAmount += Number(x);
          if (currentNotes[x].length === 1) {
            currentNotes[x] = null;
            return;
          }
          currentNotes[x] = Array.from(
            { length: currentNotes[x].length - 1 },
            (v, i) => i
          );
          return;
        }
      });
    }
    setNotes(currentNotes);
    setBalance((x) => x - amount);
  };

  const handleInput = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Layout rootClassName="enterLayoutContainer">
      <div className="textCenter mb-8">
        <h1 className="nes-text">
          Current Balance:{" "}
          <span className={balance < 0 && "nes-text is-error"}>{balance}</span>
        </h1>
      </div>
      <div className="nes-field w-40 textCenter">
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            className={`nes-input textCenter mb-6`}
            value={amount}
            onChange={handleInput}
          />
          <button className="nes-btn is-primary" type="submit">
            Withdraw
          </button>
        </form>
      </div>
      <div className="notesContainer">
        <div className="notes">
          {notes[5] ? notes[5].length : 0} x 5
          <i className="nes-icon coin is-small"></i>
        </div>
        <div className="notes">
          {notes[10] ? notes[10].length : 0} x 10
          <i className="nes-icon coin is-small"></i>
        </div>
        <div className="notes">
          {notes[20] ? notes[20].length : 0} x 20
          <i className="nes-icon coin is-small"></i>
        </div>
      </div>
      {balance <= -50 ? (
        <div className="congrats">
          <span className="nes-text is-success mb-8">
            Congratulations on the New Switch
          </span>
          <div>
            <i className="nes-ash"></i>
            <i className="nes-pokeball"></i>
            <i className="nes-bulbasaur"></i>
            <i className="nes-charmander"></i>
            <i className="nes-squirtle"></i>
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default DashPage;
