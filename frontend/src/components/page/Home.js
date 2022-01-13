import React, { useState, useEffect } from "react";
import TagList from "../sections/TagList";
import { Container, Grid } from "@mui/material";

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

  return (
    <>
      <Container maxWidth="960px">
        <h1>Language learning app</h1>
        <Grid container spacing={2} mt={"16px"} mb={"16px"}>
          <Grid item xs={4}>
            <TagList tags={tags} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
