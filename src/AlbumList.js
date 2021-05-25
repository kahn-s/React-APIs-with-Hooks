import React, { useState, useEffect } from "react";

function AlbumList({ user, updateTitle }) {
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getUserAlbums({ user } = {}) {
      try {
        const userId = { user }.id;
        console.log("userId = ", userId);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
          { signal: abortController.signal }
        );

        setAlbumList(await response.data);
        console.log({ albumList });
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        } else {
          throw error;
        }
      }
    }
    getUserAlbums({ user });
    return () => abortController.abort();
  }, [albumList, user]);

  if ({ albumList }.length > 0) {
    return (
      <div>
        <p>{updateTitle()}</p>
        <ul className="album list">
          {albumList.map((album) => (
            <li key={album.index}>
              {album.index}
              {album.name}
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
