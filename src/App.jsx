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
  const [mode, setMode] = useState("easy");
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

  const machineClickedHandler = (gameData) => {
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
  };
  const checkWhoWon = (gameData, type) => {
    const selectedItemsIndex = [];
    gameData.forEach((item, i) => {
      if (item.user === type) {
        selectedItemsIndex.push(i);
      }
    });
    const constrainOne = [0, 1, 2];
    const constrainFour = [3, 4, 5];
    const constrainFive = [6, 7, 8];
    const constrainTwo = [0, 3, 6];
    const constrainSix = [1, 4, 7];
    const constrainSeven = [2, 5, 8];
    const constrainThree = [0, 4, 8];
    const constrainEight = [2, 4, 6];
    const result =
      constrainOne.every((value) => selectedItemsIndex.includes(value)) ||
      constrainTwo.every((value) => selectedItemsIndex.includes(value)) ||
      constrainThree.every((value) => selectedItemsIndex.includes(value)) ||
      constrainFour.every((value) => selectedItemsIndex.includes(value)) ||
      constrainFive.every((value) => selectedItemsIndex.includes(value)) ||
      constrainSix.every((value) => selectedItemsIndex.includes(value)) ||
      constrainSeven.every((value) => selectedItemsIndex.includes(value)) ||
      constrainEight.every((value) => selectedItemsIndex.includes(value));
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

  React.useEffect(() => {
    if (clickCount === 9) {
      setDialogTitle("Match Tied!");
      setOpenModal(true);
    }
  }, [clickCount]);

  const modeChangeHandler = (index) => {
    if (index === 0) {
      setMode("easy");
    } else {
      setMode("hard");
    }
  };
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
