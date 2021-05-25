import React from "react";

function SelectUser({ users, currentUser, setCurrentUser }) {
  function HandleUserClick(event) {
    const newUser = users.filter(
      (user) => user.name === event.target.innerHTML
    );

    console.log("CurrentUser=", newUser);
    setCurrentUser(newUser);
  }
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>
          <button type="button" onClick={HandleUserClick}>
            {user.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SelectUser;
