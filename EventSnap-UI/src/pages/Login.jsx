import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, TextField, Box, Typography } from '@mui/material';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login('test@email.com');
    navigate('/dashboard');
  };

  return (
    <Box sx={{ width: 300, mx: 'auto', mt: 10 }}>
      <Typography variant="h5" mb={2}>Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField label="Email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button type="submit" variant="contained" fullWidth>Login</Button>
      </form>
    </Box>
  );
}
