import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTotoList();
  }, []);

  const getTotoList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodoList(response.data);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const addItem = () => {
    if (input !== "") {
      setTodoList([{ title: input }, ...todoList]);
      setInput("");
    }
  };

  const deleteItem = (target) => {
    setTodoList(todoList.filter((item) => item.title !== target));
  };

  if (loading) return <>로딩중</>;

  return (
    <Container>
      <Typography variant="h3">Todo List</Typography>

      <Stack direction={"row"} spacing={2}>
        <TextField
          fullWidth
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") addItem();
          }}
        />
        <Button variant="contained" onClick={addItem}>
          등록
        </Button>
      </Stack>

      <Box>
        <List sx={{ width: "100%" }}>
          {todoList.map((item, index) => (
            <ListItem key={item.title + index}>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        "&, & + .MuiFormControlLabel-label": {
                          textDecoration: "line-through",
                          color: "gray",
                        },
                      },
                    }}
                  />
                }
                label={item.title}
                sx={{ width: "100%" }}
              />
              <Button variant="outlined" onClick={() => deleteItem(item.title)}>
                삭제
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default App;
