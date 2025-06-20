import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography } from '@mui/material';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" mb={2}>Register Page</Typography>
      <form onSubmit={handleRegister}>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button type="submit" variant="contained" fullWidth>Register</Button>
      </form>
    </Box>
  );
}
