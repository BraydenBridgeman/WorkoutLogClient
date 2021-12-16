import React, { useState, useEffect } from "react";
import Sitebar from "./home/Navbar";
import Auth from "./auth/Auth";
import WorkoutIndex from "./workouts/WorkoutIndex";

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") !== undefined) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", "Bearer " + newToken); // space after Bearer
      setSessionToken("Bearer " + newToken);
      console.log("token updated: ", sessionToken);
    }
  };
  //render method is down here

  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
  };

  const protectedViews = () => {
    return sessionToken === localStorage.getItem("token") ? (
      <WorkoutIndex token={sessionToken} />
    ) : (
      <Auth updateToken={updateToken} />
    );
  };

  return (
    <div>
      <Sitebar clearToken={clearToken} />
      {protectedViews()}
    </div>
  );
}

export default App;