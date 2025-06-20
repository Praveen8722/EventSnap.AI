import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';

export default function AppBarHeader() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">EventSnap AI</Typography>
        <Avatar alt="User" src="/avatar.png" />
      </Toolbar>
    </AppBar>
  );
}
