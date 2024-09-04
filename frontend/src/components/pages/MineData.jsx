import React, { useState, useEffect } from "react";
// import "./App.css"; // Import your CSS file

export const MineData = () => {
  const [coalFields, setCoalFields] = useState([]);
  const [mines, setMines] = useState([]);
  const [mineInfo, setMineInfo] = useState(null);
  const [selectedCoalField, setSelectedCoalField] = useState("");
  const [selectedMine, setSelectedMine] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5500/api/getCoalFields")
      .then((response) => response.json())
      .then((data) => setCoalFields(data))
      .catch((error) => console.error("Error fetching coal fields:", error));
  }, []);

  const handleCoalFieldChange = (e) => {
    const field = e.target.value;
    setSelectedCoalField(field);
    setSelectedMine("");
    setMines([]);

    if (field) {
      fetch(`http://127.0.0.1:5500/api/getMines?location=${field}`)
        .then((response) => response.json())
        .then((data) => setMines(data))
        .catch((error) => console.error("Error fetching coal mines:", error));
    }
  };

  const handleMineChange = (e) => {
    const mine = e.target.value;
    setSelectedMine(mine);

    if (mine) {
      fetch(`http://127.0.0.1:5500/api/getMineInfo?name=${mine}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
            setMineInfo(null);
          } else {
            setMineInfo(data);
          }
        })
        .catch((error) =>
          console.error("Error fetching mine information:", error)
        );
    } else {
      setMineInfo(null);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="container">
      <h1>Select Coal Field and Mine</h1>

      <label htmlFor="coalField">Select Coal Field:</label>
      <select
        id="coalField"
        name="coal_field"
        value={selectedCoalField}
        onChange={handleCoalFieldChange}
      >
        <option value="">Select Coal Field</option>
        {coalFields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>

      <label htmlFor="coalMine">Select Coal Mine:</label>
      <select
        id="coalMine"
        name="coal_mine"
        value={selectedMine}
        onChange={handleMineChange}
      >
        <option value="">Select Coal Mine</option>
        {mines.map((mine) => (
          <option key={mine.name} value={mine.name}>
            {mine.name}
          </option>
        ))}
      </select>

      {mineInfo && (
        <div className="mine-info" id="mineInfo">
          <h3>Mine Information:</h3>
          <p>
            <strong>Name:</strong> <span>{mineInfo.name}</span>
          </p>
          <p>
            <strong>Location:</strong> <span>{mineInfo.location}</span>
          </p>
          <p>
            <strong>State:</strong> <span>{mineInfo.state}</span>
          </p>
          <p>
            <strong>Production:</strong> <span>{mineInfo.production}</span>
          </p>
          <p>
            <strong>Capacity:</strong> <span>{mineInfo.capacity}</span>
          </p>
          <p>
            <strong>Total Emission:</strong>{" "}
            <span>{mineInfo.totalEmission}</span>
          </p>
          <p>
            <strong>Number of Employees:</strong>{" "}
            <span>{mineInfo.numberOfEmployees}</span>
          </p>
        </div>
      )}

      <div className="button-container">
        <button type="button" id="goBack" onClick={handleGoBack}>
          Go Back
        </button>
        <a href="./Estimation">
        <button type="submit" id="calculate">
          Calculate Carbon Emission
        </button>
        </a>
      </div>
    </div>
  );
};

// export default mineData;
