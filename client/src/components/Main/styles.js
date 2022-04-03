import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  container: {
    // backgroundColor: "#222222",
    padding: "0em",
    minWidth: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
  },
  form: {
    display: "flex",
    alignContent: "center",
  },
});

export { useStyles };
