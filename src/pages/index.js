import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { navigate } from "gatsby";

const IndexPage = () => {
  const [loading, setLoading] = useState(0);
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    if (enter) {
      let intervalId = setInterval(() => {
        setLoading((x) => {
          const newValue = x + 5;

          if (newValue === 100) {
            clearInterval(intervalId);
          }
          return newValue;
        });
      }, 210);
    }
  }, [enter]);

  useEffect(() => {
    if (loading === 100) {
      navigate("/pin");
    }
  }, [loading]);

  return (
    <Layout rootClassName="enterLayoutContainer">
      <div className="textCenter mb-8">
        {enter ? (
          <h1 className="mb-4">Loading...</h1>
        ) : (
          <h1 className="mb-4">Welcome to Bank of Mario</h1>
        )}
        <i className="nes-mario"></i>
        <i className="nes-icon coin is-large"></i>
      </div>
      <div className="textCenter w-80">
        {enter ? (
          <progress
            className="nes-progress is-pattern"
            value={loading}
            max="100"
          ></progress>
        ) : (
          <button className="nes-btn is-primary" onClick={() => setEnter(true)}>
            Enter your card
          </button>
        )}
      </div>
    </Layout>
  );
};

export default IndexPage;
