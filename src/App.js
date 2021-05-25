import React, { useState, useEffect } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [appTitle, setAppTitle] = useState("Awsome Album App");

  //change title
  useEffect(() => {
    if (currentUser.length > 0) {
      const userName = currentUser[0].name;
      setAppTitle(`${userName} Albums`);
    }
  }, [currentUser]);

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
          <AlbumList currentUser={currentUser} appTitle={appTitle} />
        </div>
      </div>
    </div>
  );
}

export default App;
