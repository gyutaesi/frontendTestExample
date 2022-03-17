import React, { useState } from "react";
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

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    setTodoList([...todoList, input]);
    setInput("");
  };

  const deleteItem = (target) => {
    setTodoList(todoList.filter((item) => item !== target));
  };

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
            <ListItem key={index}>
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
                label={item}
                sx={{ width: "100%" }}
              />
              <Button variant="outlined" onClick={() => deleteItem(item)}>
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
