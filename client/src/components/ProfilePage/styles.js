import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    // backgroundColor: "#222222",
    padding: "0em",
    minWidth: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
  button: {
    width: "25vw",
    height: "8vh",
    fontWeight: "bold",
    fontSize: "1.5em",
    margin: "1vh",
  },
});

export { useStyles };
