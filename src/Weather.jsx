import React, { useEffect, useState } from "react";
import Search from "./Search";

const key = `fa086d751c6ef296c8a0d044285fc2a7`;
const Weather = (props) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  async function fetchData(param) {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${key}`
      );
      const data = await res.json();
      console.log(data);
      if (data) {
        setLoading(false);
        setWeather(data);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData("Lagos"); // Call fetchData after a 2-second delay
  }, []);

  function handleSearch() {
    setLoading(true);
    const delay = setTimeout(() => {
      fetchData(search);
    }, 2000);
    setSearch("");

    return () => clearTimeout(delay);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  return (
    <div>
      <Search
        search={search}
        handleSearch={handleSearch}
        setSearch={setSearch}
      />
      <div className="border rounded-xl my-2 py-5 px-5 w-[350px] md:w-[500px] h-[250px]">
        {loading ? (
          <div>Data loading, please Wait</div>
        ) : (
          <div>
            <h2 className="text-4xl font-bold">
              {weather?.name}, <span>{weather?.sys?.country}</span>
            </h2>
            <div>
              <span>{getCurrentDate()}</span>
            </div>
            <div className="m-2">
              <p className="text-2xl text-center">
                Temperature, {weather?.main?.temp}
              </p>
              <p className="text-1xl text-center text-gray-400">
                {weather && weather.weather[0]
                  ? weather.weather[0].description
                  : ""}
              </p>
            </div>
            <div className="flex justify-center">
              <div className="m-2">
                <p className="text-2xl text-center">{weather?.wind?.speed}</p>
                <p className="text-1xl text-center text-gray-400">Wind Speed</p>
              </div>
              <div className="m-2">
                <p className="text-2xl text-center">
                  {weather?.main?.humidity}
                </p>
                <p className="text-1xl text-center text-gray-400">Humidity</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
