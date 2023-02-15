import {
  Avatar,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import MButtonGroup from "./Component/MButtonGroup";
const initialStates = [
  {
    id: 1,
    user: "",
  },
  {
    id: 2,
    user: "",
  },
  {
    id: 3,
    user: "",
  },
  {
    id: 4,
    user: "",
  },
  {
    id: 5,
    user: "",
  },
  {
    id: 6,
    user: "",
  },
  {
    id: 7,
    user: "",
  },
  {
    id: 8,
    user: "",
  },
  {
    id: 9,
    user: "",
  },
];
const App = () => {
  const [gameData, setGameDate] = useState(initialStates);
  const [userWonCount, setUserWonCount] = useState(0);
  const [pcWonCount, setPcWonCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [mode, setMode] = useState("hard");
  const userClickHandler = (id) => {
    //check if already clicked
    let checkAlreadyExistance = gameData.findIndex(
      (item) =>
        (item.id === id && item.user === "user") ||
        (item.id === id && item.user === "machine")
    );
    //if not already selected
    if (checkAlreadyExistance === -1) {
      const newGameData = gameData.map((item) => {
        if (item.id === id && item.user !== "user") {
          return { ...item, user: "user" };
        } else return item;
      });
      setGameDate(newGameData);
      setDisabled(true);
      setTimeout(() => {
        const result = checkWhoWon(newGameData, "user");
        if (!result) {
          machineClickedHandler(newGameData);
          setClickCount((prevState) => prevState + 1);
        } else {
          setUserWonCount((prevState) => prevState + 1);
          setDialogTitle("You won!");
          setOpenModal(true);
        }
        setDisabled(false);
      }, 300);
    }
  };
  // console.log("clikedCount", clickCount);
  const machineClickedHandler = (gameData) => {
    if (mode === "hard") {
      const userSelectedItems = gameData.filter((item) => item.user === "user");
      console.log("userSelectedItems", userSelectedItems);
      if (userSelectedItems.length === 1) {
        generateRandom(gameData);
      } else {
        console.log("gameData", gameData);
        ////////////Row [0,1]
        if (gameData[0].user === "user" && gameData[1].user === "user") {
          generatePredicted(gameData, 2);
        } else if (gameData[1].user === "user" && gameData[0].user === "user") {
          generatePredicted(gameData, 2);
        } else if (gameData[3].user === "user" && gameData[4].user === "user") {
          generatePredicted(gameData, 5);
        } else if (gameData[4].user === "user" && gameData[3].user === "user") {
          generatePredicted(gameData, 5);
        } else if (gameData[6].user === "user" && gameData[7].user === "user") {
          generatePredicted(gameData, 8);
        } else if (gameData[7].user === "user" && gameData[6].user === "user") {
          generatePredicted(gameData, 8);
        }
        ////////////Row [1,2]
        else if (gameData[2].user === "user" && gameData[1].user === "user") {
          generatePredicted(gameData, 0);
        } else if (gameData[1].user === "user" && gameData[2].user === "user") {
          generatePredicted(gameData, 0);
        } else if (gameData[5].user === "user" && gameData[4].user === "user") {
          generatePredicted(gameData, 3);
        } else if (gameData[4].user === "user" && gameData[5].user === "user") {
          generatePredicted(gameData, 3);
        } else if (gameData[8].user === "user" && gameData[7].user === "user") {
          generatePredicted(gameData, 6);
        } else if (gameData[7].user === "user" && gameData[8].user === "user") {
          generatePredicted(gameData, 6);
        }
        ////////////Row [0,2]
        else if (gameData[0].user === "user" && gameData[2].user === "user") {
          generatePredicted(gameData, 1);
        } else if (gameData[2].user === "user" && gameData[0].user === "user") {
          generatePredicted(gameData, 1);
        } else if (gameData[3].user === "user" && gameData[5].user === "user") {
          generatePredicted(gameData, 4);
        } else if (gameData[5].user === "user" && gameData[3].user === "user") {
          generatePredicted(gameData, 4);
        } else if (gameData[6].user === "user" && gameData[8].user === "user") {
          generatePredicted(gameData, 7);
        } else if (gameData[8].user === "user" && gameData[6].user === "user") {
          generatePredicted(gameData, 7);
        }

        ////////////Column [0,1]
        else if (gameData[0].user === "user" && gameData[3].user === "user") {
          generatePredicted(gameData, 6);
        } else if (gameData[3].user === "user" && gameData[0].user === "user") {
          generatePredicted(gameData, 6);
        } else if (gameData[1].user === "user" && gameData[4].user === "user") {
          generatePredicted(gameData, 7);
        } else if (gameData[4].user === "user" && gameData[1].user === "user") {
          generatePredicted(gameData, 7);
        } else if (gameData[2].user === "user" && gameData[5].user === "user") {
          generatePredicted(gameData, 8);
        } else if (gameData[5].user === "user" && gameData[2].user === "user") {
          generatePredicted(gameData, 8);
        }
        ////////////Column [1,2]
        else if (gameData[3].user === "user" && gameData[6].user === "user") {
          generatePredicted(gameData, 0);
        } else if (gameData[6].user === "user" && gameData[3].user === "user") {
          generatePredicted(gameData, 0);
        } else if (gameData[4].user === "user" && gameData[7].user === "user") {
          generatePredicted(gameData, 1);
        } else if (gameData[7].user === "user" && gameData[4].user === "user") {
          generatePredicted(gameData, 1);
        } else if (gameData[5].user === "user" && gameData[8].user === "user") {
          generatePredicted(gameData, 2);
        } else if (gameData[8].user === "user" && gameData[5].user === "user") {
          generatePredicted(gameData, 2);
        }
        ////////////Column [0,2]
        else if (gameData[0].user === "user" && gameData[6].user === "user") {
          generatePredicted(gameData, 3);
        } else if (gameData[6].user === "user" && gameData[0].user === "user") {
          generatePredicted(gameData, 3);
        } else if (gameData[1].user === "user" && gameData[7].user === "user") {
          generatePredicted(gameData, 4);
        } else if (gameData[7].user === "user" && gameData[1].user === "user") {
          generatePredicted(gameData, 4);
        } else if (gameData[2].user === "user" && gameData[8].user === "user") {
          generatePredicted(gameData, 5);
        } else if (gameData[8].user === "user" && gameData[2].user === "user") {
          generatePredicted(gameData, 5);
        }
        ////////////// Diagonal///////////
        else if (gameData[0].user === "user" && gameData[8].user === "user") {
          generatePredicted(gameData, 4);
        } else if (gameData[8].user === "user" && gameData[0].user === "user") {
          generatePredicted(gameData, 4);
        } else if (gameData[2].user === "user" && gameData[6].user === "user") {
          generatePredicted(gameData, 4);
        } else if (gameData[6].user === "user" && gameData[2].user === "user") {
          generatePredicted(gameData, 4);
        } else if (gameData[6].user === "user" && gameData[4].user === "user") {
          console.log("[6-4]");
          generatePredicted(gameData, 2);
        } else if (gameData[4].user === "user" && gameData[6].user === "user") {
          generatePredicted(gameData, 2);
        } else if (gameData[2].user === "user" && gameData[4].user === "user") {
          generatePredicted(gameData, 6);
        } else if (gameData[4].user === "user" && gameData[2].user === "user") {
          generatePredicted(gameData, 6);
        } else if (gameData[4].user === "user" && gameData[8].user === "user") {
          generatePredicted(gameData, 0);
        } else if (gameData[8].user === "user" && gameData[4].user === "user") {
          generatePredicted(gameData, 0);
        } else if (gameData[0].user === "user" && gameData[4].user === "user") {
          console.log("[0-4]");
          generatePredicted(gameData, 8);
        } else if (gameData[4].user === "user" && gameData[0].user === "user") {
          generatePredicted(gameData, 8);
        }
      }
    } else {
      generateRandom(gameData);
    }
  };

  function generateRandom(gameData) {
    const unselectedItems = gameData.filter((item) => item.user === "");
    const randomNumber = Math.floor(Math.random() * unselectedItems.length);

    if (unselectedItems && unselectedItems.length) {
      setDisabled(true);
      const newGameData = gameData.map((item) => {
        if (item.id === unselectedItems[randomNumber].id) {
          return { ...item, user: "machine" };
        } else return item;
      });
      setGameDate(newGameData);
      setTimeout(() => {
        const result = checkWhoWon(newGameData, "machine");
        if (result) {
          setPcWonCount((prevState) => prevState + 1);
          setDialogTitle("Machine Won!");
          setOpenModal(true);
        } else {
          setClickCount((prevState) => prevState + 1);
        }
        setDisabled(false);
      }, 300);
    }
  }
  function generatePredicted(gameData, index) {
    if (gameData[index].user === "") {
      setDisabled(true);
      const newGameData = gameData.map((item, i) => {
        if (i === index) {
          return { ...item, user: "machine" };
        } else return item;
      });
      setGameDate(newGameData);
      setTimeout(() => {
        const result = checkWhoWon(newGameData, "machine");
        if (result) {
          setPcWonCount((prevState) => prevState + 1);
          setDialogTitle("Machine Won!");
          setOpenModal(true);
        } else {
          setClickCount((prevState) => prevState + 1);
        }
        setDisabled(false);
      }, 300);
    } else generateRandom(gameData);
  }

  const checkWhoWon = (gameData, type) => {
    const selectedItemsIndex = [];
    gameData.forEach((item, i) => {
      if (item.user === type) {
        selectedItemsIndex.push(i);
      }
    });
    const constrain1 = [0, 1, 2];
    const constrain2 = [3, 4, 5];
    const constrain3 = [6, 7, 8];

    const constrain4 = [0, 3, 6];
    const constrain5 = [1, 4, 7];
    const constrain6 = [2, 5, 8];

    const constrain7 = [2, 4, 6];
    const constrain8 = [0, 4, 8];

    const result =
      constrain1.every((value) => selectedItemsIndex.includes(value)) ||
      constrain2.every((value) => selectedItemsIndex.includes(value)) ||
      constrain3.every((value) => selectedItemsIndex.includes(value)) ||
      constrain4.every((value) => selectedItemsIndex.includes(value)) ||
      constrain5.every((value) => selectedItemsIndex.includes(value)) ||
      constrain6.every((value) => selectedItemsIndex.includes(value)) ||
      constrain7.every((value) => selectedItemsIndex.includes(value)) ||
      constrain8.every((value) => selectedItemsIndex.includes(value));
    return result;
  };
  const resetHandler = () => {
    setGameDate(initialStates);
    setClickCount(0);
  };
  const modalHandler = () => {
    setOpenModal(false);
    resetHandler();
  };
  const modeChangeHandler = (index) => {
    if (index === 0) {
      setMode("easy");
    } else {
      setMode("hard");
    }
  };
  React.useEffect(() => {
    if (clickCount === 9) {
      setDialogTitle("Match Tied!");
      setOpenModal(true);
    }
  }, [clickCount]);

  React.useEffect(() => {
    setGameDate(initialStates);
  }, [mode]);
  return (
    <Container maxWidth="md" sx={{ paddingTop: "2rem" }}>
      <Dialog open={openModal}>
        <Stack gap={2} p={3} alignItems="center">
          <Typography variant="h3">{dialogTitle}</Typography>

          <IconButton onClick={modalHandler}>
            <Avatar>Ok</Avatar>
          </IconButton>
        </Stack>
      </Dialog>
      <Grid container>
        <Grid item xs={12} md={9}>
          <Typography variant="h4" textAlign="center" fontWeight={"bold"}>
            Tic Tac Toe
          </Typography>
        </Grid>
        <Grid container item xs={12} md={9}>
          <Grid container className="GridContainer">
            {gameData.map((item, i) => {
              let styles = {};
              if (i === 0 || i === 1 || i === 2) {
                styles.borderBottom = "4px solid #E3E3E3";
              }
              if (i === 6 || i === 7 || i === 8) {
                styles.borderTop = "4px solid #E3E3E3";
              }
              if (i === 1 || i === 4 || i === 7) {
                styles.borderRight = "4px solid #E3E3E3";
                styles.borderLeft = "4px solid #E3E3E3";
              }

              return (
                <Grid
                  item
                  xs={4}
                  id="grid-1"
                  style={styles}
                  key={i}
                  onClick={() => {
                    if (!disabled) {
                      userClickHandler(item.id);
                    }
                  }}
                >
                  {item.user === "user" ? (
                    <CloseSharpIcon sx={{ fontSize: 130, fontWeight: 700 }} />
                  ) : null}
                  {item.user === "" ? (
                    <FiberManualRecordOutlinedIcon
                      sx={{ fontSize: 130, fontWeight: 700, opacity: 0 }}
                    />
                  ) : null}
                  {item.user === "machine" ? (
                    <FiberManualRecordOutlinedIcon
                      sx={{ fontSize: 130, fontWeight: 700 }}
                    />
                  ) : null}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "flex-start", md: "flex-end" },
            marginTop: { xs: "1rem", md: "initial" },
          }}
        >
          <Stack
            gap={2}
            sx={{
              display: "flex",
              flexDirection: { sx: "column", sm: "row", md: "column" },
              alignItems: { xs: "flex-start", md: "flex-end" },
            }}
          >
            <MButtonGroup modeChangeHandler={modeChangeHandler} />
            <Typography variant="h6">
              User won : <strong> {userWonCount}</strong>
            </Typography>

            <Typography variant="h6">
              PC won : <strong> {pcWonCount}</strong>
            </Typography>

            <Button onClick={resetHandler} variant="outlined">
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
