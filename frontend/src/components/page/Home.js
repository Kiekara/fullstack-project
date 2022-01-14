import React, { useState, useEffect } from "react";
import TagList from "../sections/TagList";
import WordList from "../sections/WordList";
import { Box, Container, Grid } from "@mui/material";

function Home() {
  const [tags, setTags] = useState([]);
  const [words, setWords] = useState([]);
  const [sort, setSort] = useState(-1);
  const [learn, setLearn] = useState(false);
  const [swap, setSwap] = useState(false);

  useEffect(() => {
    const get = async (path) => {
      let data = await getData(path);
      console.log(data);
    };

    get("tags");
    get("words");
  }, []);

  const getData = async (path) => {
    let response = await fetch(`http://localhost:8080/data/${path}/`, {
      method: "GET",
    });
    let data = await response.json();

    if (path === "tags") {
      setTags(data);
    } else {
      setWords(data);
    }

    return data;
  };

  const api = {
    postData: async (path, data) => {
      let response = await fetch(`http://localhost:8080/data/${path}/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();

      return result;
    },
    editData: async (path, data, id) => {
      let response = await fetch(`http://localhost:8080/data/${path}/${id}/`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();

      return result;
    },
    deleteData: async (path, id) => {
      await fetch(`http://localhost:8080/data/${path}/${id}/`, {
        method: "DELETE",
      });
    },
  };

  return (
    <>
      <Container maxWidth="960px">
        <h1>Language learning app</h1>
        <Grid container spacing={2} mt={"16px"} mb={"16px"}>
          <Grid item xs={4}>
            <TagList
              tags={tags}
              learn={learn}
              setSort={setSort}
              setLearn={setLearn}
              getData={getData}
              api={api}
            />
          </Grid>
          <Grid item xs={8}>
            {learn ? (
              <h3>
                Learn {tags.map((tag) => (tag.id === sort ? tag.name : null))}
              </h3>
            ) : null}
            <Box sx={{ flexGrow: 1 }} mt={learn ? "16px" : "40px"}>
              <WordList
                words={words}
                sort={sort}
                learn={learn}
                swap={swap}
                setSort={setSort}
                setLearn={setLearn}
                setSwap={setSwap}
                getData={getData}
                api={api}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home;
