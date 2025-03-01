import React, { useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import useForm from "./useForm"; // Import the custom hook
import { API } from "../../service/api";
import { DataContext } from "../../context/dataProvider";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(135deg, #121212, #1e1e1e)",
});

const LoginForm = styled(Paper)({
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "12px",
  background: "rgba(30, 30, 30, 0.95)",
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.6)",
});

const StyledButton = styled(Button)({
  marginTop: "15px",
  padding: "12px",
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "none",
  background: "#bb86fc",
  backgroundImage: "linear-gradient(to right, #7c4dff, #bb86fc)",
  color: "white",
  '&:hover': {
    background: "#7c4dff",
  },
});

const LoginPage = ({isUserAuth}) => {
  const [values, handleChange] = useForm({ username: "", password: "" });
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("sended data:", values);
    try {
      const response = await API.userLogin(values);
      if (response.isSuccess === true) {
        sessionStorage.setItem('accessToken', `bearer ${response.data.accessToken}`)
        sessionStorage.setItem('refreshToken', `bearer ${response.data.refreshToken}`)
        setAccount({ username: response.data.username, name: response.data.name })

        alert("the login succesfully...!");
        isUserAuth(true);
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.error("Error in response from client page ", error);
      alert(`Error: ${error.msg}`);
    }
  };

  return (
    <LoginContainer>
      <LoginForm elevation={6}>
        <Typography variant="h4" gutterBottom style={{ color: "#e0e0e0" }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" gutterBottom style={{ color: "#b0b0b0" }}>
          Login to continue
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            label="username"
            name="username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.username}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: "#b0b0b0" } }}
            InputProps={{ style: { color: "#ffffff" } }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={values.password}
            onChange={handleChange}
            required
            InputLabelProps={{ style: { color: "#b0b0b0" } }}
            InputProps={{ style: { color: "#ffffff" } }}
          />
          <StyledButton type="submit" variant="contained" fullWidth>
            Login
          </StyledButton>
        </form>
        <Typography variant="body2" style={{ marginTop: "15px", color: "#b0b0b0" }}>
          Don't have an account? <Link href="/signup" style={{ color: "#bb86fc" }}>Sign up</Link>
        </Typography>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginPage;