import React, { useState } from "react";

import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { API } from "../../service/api";
import { useNavigate } from "react-router-dom";



// Styled background container
const BackgroundContainer = styled(Container)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
  padding: "20px",
});

// Glassmorphism effect for the card
const GlassCard = styled(Paper)({
  padding: "2rem",
  maxWidth: "400px",
  width: "100%",
  background: "rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(10px)",
  borderRadius: "12px",
  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)",
  textAlign: "center",
  color: "white",
  border: "1px solid rgba(255, 255, 255, 0.18)",
});

const buttonStyle = {
  marginTop: "1rem",
  background: "linear-gradient(90deg, #ff6a00, #ee0979)",
  color: "white",
  padding: "10px",
  borderRadius: "6px",
  '&:hover': {
    background: "linear-gradient(90deg, #d31027, #ea384d)",
  },
};

const inputStyle = {
  backgroundColor: "rgba(255,255,255,0.2)",
  borderRadius: "6px",
  input: { color: "white", fontSize: "1rem" },
  label: { color: "white", fontSize: "0.9rem" },
};

const initialSignUpValues = {
  name: "",
  username: "",
  password: "",
};

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState(initialSignUpValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
    console.log(value)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle sign-up logic here
    console.log("Sign-Up Data:", signUpData);
    try {
      const response = await API.userSign(signUpData); // your api.js method that interacts with the backend
      console.log('User created:', response);
      if (response.isSuccess === true) {
        setSignUpData(initialSignUpValues);
        // here adding login routing
        alert("the account is created succesfully...!")
        navigate("/login");
      }




      // Handle success, like redirecting to a new page or showing a success message
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle the error, such as:
      if (error.code === 500) {
        // Handle server error.
        alert(error.msg)
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      // If your server send a `msg` in the response, use it.
      if (error.msg) {
        // you can handle the error
        alert(error.msg);
      } else {
        alert("Something went wrong. Please try again later")
      }
      // display an error message to the user.
    }

  };

  return (
    <BackgroundContainer>
      <GlassCard elevation={10}>
        <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
          Create an Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            sx={inputStyle}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            sx={inputStyle}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            sx={inputStyle}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={buttonStyle}
          >
            Sign Up
          </Button>
        </Box>
        <Typography variant="body2" sx={{ marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link href="/login" sx={{ color: "#f48fb1", fontWeight: "bold" }}>
            Log in
          </Link>
        </Typography>
      </GlassCard>
    </BackgroundContainer>
  );
};

export default SignUpPage;














