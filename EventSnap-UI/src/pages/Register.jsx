import React, { useState } from "react";
import { Box, Typography, TextField, Button, Link, IconButton,} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Register = () => {
  const [isWhiteBg,setIsWhiteBg] = useState(false);

  const handleToggleBackground = () => {
    setIsWhiteBg((prev) => !prev);
  };

  return (
    <Box
     sx={{
        bgcolor: isWhiteBg ? "#fff" : "#111",
        color: isWhiteBg ? "#000" : "#fff",
        height: "97.5vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        px: 2,
        transition: "background-color 0.4s ease, color 0.4s ease",
      }}
    >
      {/* Settings Icon */}
      <IconButton
        sx={{ position: "absolute", top: 16, right: 16, color: "#2196f3" }}
        onClick={handleToggleBackground}
      >
        <SettingsIcon />
      </IconButton>

      {/* Title */}
      <Typography variant="h4" fontWeight="bold" color="#2196f3" mb={1}>
        Eventsnap.AI
      </Typography>
      <Typography variant="body2" color="#999" mb={3}>
        Powered by <span style={{ color: "#2196f3", fontWeight: "bold" }}>Praveen</span>
      </Typography>

      {/* Create account */}
      <Typography variant="h6" mb={1}>
        Create your free account
      </Typography>
      <Typography variant="body2" color={isWhiteBg ? "#666" : "#aaa"} mb={3}>
        We suggest using the email address you use at work.
      </Typography>
            {/* First name Input */}
            <TextField
              variant="outlined"
              placeholder="fistname "
              type="fistname"
              value={fistname}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: {
                  backgroundColor: isWhiteBg ? "#f0f0f0" : "#1e1e1e",
                  color: isWhiteBg ? "#000" : "#fff",
                },
              }}
              sx={{ width: "100%", maxWidth: 400, mb: 2 }}
            />
                  {/* Lastname Input */}
                  <TextField
                    variant="outlined"
                    placeholder="Lastname"
                    type="Lastname"
                    value={Lastname}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      style: {
                        backgroundColor: isWhiteBg ? "#f0f0f0" : "#1e1e1e",
                        color: isWhiteBg ? "#000" : "#fff",
                      },
                    }}
                    sx={{ width: "100%", maxWidth: 400, mb: 2 }}
                  />

      {/* Email Input */}
      <TextField
        variant="outlined"
        placeholder="name@work-email.com"
        type="email"
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
                  {/* confirme password Input */}
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

      {/* Continue Button */}
      <Button
        variant="contained"
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "#2196f3",
          ":hover": { bgcolor: "#1976d2" },
          textTransform: "none",
        }}
      >
        Continue
      </Button>

      {/* Sign In Link */}
      <Typography variant="body2" color={isWhiteBg ? "#555" : "#aaa"} mt={3}>
        Already have an account?{" "}
        <Link href="#" underline="hover" color="#2196f3">
          Sign in →
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
