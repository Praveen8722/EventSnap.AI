import React, { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, Link, } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [isWhiteBg, setIsWhiteBg] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleToggleBackground = () => {
    setIsWhiteBg((prev) => !prev);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      login(email);
      navigate("/dashboard");
    }
  };
  return (
    <Box sx={{
      bgcolor: isWhiteBg ? "#fff" : "#111",
      color: isWhiteBg ? "#000" : "#fff",
      height: "97.5vh",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      px: '2',
      transition: 'background-color 0.4s ease, color 0.4s ease',
    }}>

      {/* Settings Icon */}
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16, color: "#2196f3" }}
        onClick={handleToggleBackground}
      >
        <SettingsIcon />
      </IconButton>

      {/* Title */}
      <Typography variant="h4" fontWeight="bold" color="#2196f3" mb={1} >
        Eventsnap.AI
      </Typography>
      <Typography variant="body2" color="#999" mb={3}>
        Powered by <span style={{ color: "#2196f3", fontWeight: "bold" }}>Praveen</span>
      </Typography>

      {/* Login Title */}
      <Typography variant="h6" mb={1}>
        Sign in
      </Typography>
      <Typography variant="body2" color={isWhiteBg ? "#666" : "#aaa"} mb={3}>
        Login with your work email to continue.
      </Typography>

      {/* Email Input */}
      <TextField
        variant="outlined"
        placeholder="name@work-email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          style: {
            backgroundColor: isWhiteBg ? "#f0f0f0" : "#1e1e1e",
            color: isWhiteBg ? "#000" : "#fff",
          },
        }}
        sx={{ width: "100%", maxWidth: 400, mb: 2 }}
      />


      {/* Password Input */}
      <TextField
        variant="outlined"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          style: {
            backgroundColor: isWhiteBg ? "#f0f0f0" : "#1e1e1e",
            color: isWhiteBg ? "#000" : "#fff",
          },
        }}
        sx={{ width: "100%", maxWidth: 400, mb: 2 }}
      />

      {/* Login Button */}
      <Button
        onClick={handleLogin}
        variant="contained"
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#2196f3",
          ":hover": { bgcolor: "#1976d2" },
          textTransform: "none",
        }}

      >
        Login
      </Button>


      {/* Register Link */}
      <Typography
        variant="body2" color={isWhiteBg ? "#555" : "#aaa"} mt={3}
      >
        Don't have an account?{" "}
        <Link href="/register" underline="hover" color="#2196f3">
          Create one →
        </Link>
      </Typography>

    </Box>
  )
};

export default Login;