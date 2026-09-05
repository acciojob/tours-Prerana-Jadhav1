import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [tours, setTours] = useState([]);

    const removeTour = (id) => {
      setTours(tours.filter((tour) => tour.id !== id));
    };

    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTours(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    useEffect(() => {
      fetchTours();
    }, []);

    if (loading) {
      return (
        <main id="main">
          <Loading />
        </main>
      );
    }

    if (tours.length === 0) {
      return (
        <main id="main">
          <div className="title">
            <h2>No tours left</h2>
            <button onClick={fetchTours}>Refresh</button>
          </div>
        </main>
      );
    }

    return(
      <main id="main">
        <h1>Our Tours</h1>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    )
}
export default App;
