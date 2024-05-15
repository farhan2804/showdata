import React, { useState, useEffect } from "react";

const Mydata = () => {
  const [data, setData] = useState([]);
  const [dataVisible, setDataVisible] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // New state to track if data has been fetched

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

  return (
    <>
      <h1>Apna Data Show Karna hai</h1>
      <button onClick={handleData}>
        {dataVisible ? "Hide Messages" : "Show Messages"}
      </button>
      {dataVisible &&
        data.map((values, id) => (
          <div key={id} className="Container">
            <h2>Name - {values.name}</h2>
            <h4>Email - {values.email}</h4>
            <h3>Message - {values.message}</h3>
          </div>
        ))}
    </>
  );
};

export default Mydata;
