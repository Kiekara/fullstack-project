import React, { useState, useEffect } from "react";

function Home() {
  const [tags, setTags] = useState([]);
  const [words, setWords] = useState([]);

  useEffect(() => {
    const get = async (path) => {
      let data = await getData(path);

      if (path === "tags") {
        setTags(data);
      } else {
        setWords(data);
      }
    };

    get("tags");
    get("words");
  }, []);

  const getData = async (path) => {
    let response = await fetch(`http://localhost:8080/data/${path}/`, {
      method: "GET",
    });
    let data = await response.json();

    return data;
  };

  return <div></div>;
}

export default Home;
