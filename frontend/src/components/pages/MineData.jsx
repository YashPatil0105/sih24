import React, { useState, useEffect } from "react";

export const MineData = () => {
  const [coalFields, setCoalFields] = useState([]);
  const [mines, setMines] = useState([]);
  const [mineInfo, setMineInfo] = useState(null);
  const [selectedCoalField, setSelectedCoalField] = useState("");
  const [selectedMine, setSelectedMine] = useState("");

  useEffect(() => {
    fetch("/api/getCoalFields")
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
      fetch(`/api/getMines?location=${field}`)
        .then((response) => response.json())
        .then((data) => setMines(data))
        .catch((error) => console.error("Error fetching coal mines:", error));
    }
  };

  const handleMineChange = (e) => {
    const mine = e.target.value;
    setSelectedMine(mine);

    if (mine) {
      fetch(`/api/getMineInfo?name=${mine}`)
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Select Coal Field and Mine</h1>

      <div className="mb-6">
        <label htmlFor="coalField" className="block text-sm font-medium text-gray-700 mb-2">
          Select Coal Field:
        </label>
        <select
          id="coalField"
          name="coal_field"
          value={selectedCoalField}
          onChange={handleCoalFieldChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Coal Field</option>
          {coalFields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="coalMine" className="block text-sm font-medium text-gray-700 mb-2">
          Select Coal Mine:
        </label>
        <select
          id="coalMine"
          name="coal_mine"
          value={selectedMine}
          onChange={handleMineChange}
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">Select Coal Mine</option>
          {mines.map((mine) => (
            <option key={mine.name} value={mine.name}>
              {mine.name}
            </option>
          ))}
        </select>
      </div>

      {mineInfo && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6" id="mineInfo">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Mine Information</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              {Object.entries(mineInfo).map(([key, value], index) => (
                <div key={key} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6`}>
                  <dt className="text-sm font-medium text-gray-500">{key.charAt(0).toUpperCase() + key.slice(1)}</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          id="goBack"
          onClick={handleGoBack}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go Back
        </button>
        <button
          type="submit"
          id="calculate"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Calculate Carbon Emission
        </button>
      </div>
    </div>
  );
};

export default MineData;