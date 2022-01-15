// Import modules
import React, { useState, useEffect } from "react";
import TagList from "../sections/TagList";
import WordList from "../sections/WordList";
import Login from "./Login";
import { Box, Container, Grid } from "@mui/material";

/**
 * The base of home screen and home for other components
 * @returns
 */
function Home() {
  const [tags, setTags] = useState([]);
  const [words, setWords] = useState([]);
  const [sort, setSort] = useState(-1);
  const [learn, setLearn] = useState(false);
  const [swap, setSwap] = useState(false);
  const [rights, setRights] = useState("");

  useEffect(() => {
    // Get data after logging in
    const get = async (path) => {
      let data = await getData(path);
      console.log(data);
    };

    if (rights) {
      get("tags");
      get("words");
    }
  }, [rights]);

  // Function for getting data
  const getData = async (path) => {
    let response = await fetch(`/data/${path}/`, {
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

  // Connection function to api
  const api = {
    // Function for posting data
    postData: async (path, data) => {
      let response = await fetch(`/data/${path}/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();

      return result;
    },
    // Function for editing data
    editData: async (path, data, id) => {
      let response = await fetch(`/data/${path}/${id}/`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let result = await response.json();

      return result;
    },
    // Function for deleting data
    deleteData: async (path, id) => {
      await fetch(`/data/${path}/${id}/`, {
        method: "DELETE",
      });
    },
  };

  // Return login, if user has not logged in
  return !rights ? (
    <Login setRights={setRights} />
  ) : (
    <>
      <Container maxWidth="960px">
        <h1>Language learning app</h1>
        <Grid container spacing={2} mt={"16px"} mb={"16px"}>
          <Grid item xs={4}>
            <TagList
              rights={rights}
              tags={tags}
              words={words}
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
                rights={rights}
                words={words}
                tags={tags}
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
