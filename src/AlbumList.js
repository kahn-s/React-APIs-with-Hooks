import React, { useState, useEffect } from "react";

function AlbumList({ currentUser, appTitle }) {
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getUserAlbums() {
      try {
        if (currentUser.length > 0) {
          const user = currentUser[0];
          console.log("userId = ", user.id);
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
            { signal: abortController.signal }
          );
          const userAlbumList = await response.json();
          setAlbumList(userAlbumList);

          console.log(userAlbumList);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          throw error;
        }
      }
    }

    getUserAlbums(currentUser);
    return () => abortController.abort();
  }, [currentUser]);

  if (albumList.length > 0) {
    return (
      <div>
        <p>{appTitle}</p>
        <ul className="album list">
          {albumList.map((album) => (
            <li key={album.id}>
              <p>{album.id}</p>
              <p>{album.title}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <p>Please click on a user name to the left</p>;
  }
}

export default AlbumList;
