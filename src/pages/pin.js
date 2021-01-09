import React, { useState } from "react";
import screencloud from "../api/screencloud";
import Layout from "../components/layout";
import { navigate } from "gatsby";

const PinPage = () => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    screencloud
      .post("/api/pin", {
        pin,
      })
      .then(({ data, status }) => {
        if (status === 200) {
          navigate("/dash", { state: { currentBalance: data.currentBalance } });
        }
      })
      .catch((x) => {
        if (!error) setError(true);
        setPin("");
      });
  };

  return (
    <Layout rootClassName="enterLayoutContainer">
      <div className="textCenter mb-8">
        {error ? (
          <h1 className="nes-text is-error">Incorrect Pin Try Again</h1>
        ) : (
          <h1 className="">Enter Your Pin</h1>
        )}
      </div>
      <div className="nes-field w-40 textCenter">
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className={`nes-input textCenter mb-6 ${error ? "is-error" : null}`}
            value={pin}
            onChange={handleInput}
          />
          <button className="nes-btn is-primary" type="submit">
            Enter
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PinPage;
