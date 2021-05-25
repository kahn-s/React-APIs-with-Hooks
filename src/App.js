import React, { useState, useEffect, useMemo } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [appTitle, setAppTitle] = useState("Awsome Album App");
  const updateTitle = useMemo(
    () => setAppTitle(`${currentUser} Albums`),
    [currentUser]
  );

  //get users
  useEffect(() => {
    const abortController = new AbortController();
    async function getUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          { signal: abortController.signal }
        );
        const userList = await response.json();
        setUsers(userList);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          throw error;
        }
      }
    }
    getUsers();
    return () => abortController.abort();
  }, []);

  return (
    <div className="App">
      <div className="left column">
        <UserList
          users={users}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </div>
      <div className="right column">
        <div id="title">
          <p>{appTitle}</p>
        </div>
        <div>
          <AlbumList user={currentUser} updateTitle={updateTitle} />
        </div>
      </div>
    </div>
  );
}

export default App;
