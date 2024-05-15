import React, { useState, useEffect } from "react";
import "./Mydata.css";

const Mydata = () => {
  const [data, setData] = useState([]);
  const [indicate, setIndicate] = useState("");
  const [dataVisible, setDataVisible] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const handleData = async () => {
    // Toggle data visibility
    setDataVisible(!dataVisible);

    // Fetch data only if it hasn't been fetched before
    if (!dataFetched) {
      try {
        const response = await fetch(
          "https://showdata-backend.vercel.app/view"
        );
        const jsonData = await response.json();
        setData(jsonData);
        setDataFetched(true); // Set dataFetched to true after fetching data
      } catch (error) {
        console.log("Error fetching the data");
      }
    }
  };

  useEffect(() => {
    // Show "Loading..." if data is being fetched
    if (dataVisible && !dataFetched) {
      setIndicate("Loading.....");
    } else {
      setIndicate("");
    }
  }, [dataVisible, dataFetched]);

  return (
    <>
      <div className="MainContainer">
        <div className="headingContainer">
          <h1>Welcome to your Database, Farhan 😁</h1>
          <button onClick={handleData}>
            {dataVisible ? "Hide Messages" : "Show Messages"}
          </button>
          <p>{indicate}</p>
        </div>
        {dataVisible &&
          data.map((values, id) => (
            <div key={id} className="SubContainer">
              <h2>
                <span>{id + 1}-</span>Name :- {values.name}
              </h2>
              <h4>Email :- {values.email}</h4>
              <h3>Message :- {values.message}</h3>
            </div>
          ))}
      </div>
    </>
  );
};

export default Mydata;
