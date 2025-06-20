import { useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Button, TextField, Box
} from '@mui/material';
import CreateEventDialog from './CreateEventDialog';

const dummyEvents = [
  { name: "Wedding Bash", place: "Mumbai", customer: "John Doe", createdAt: "2025-06-20" },
  { name: "Tech Expo", place: "Bangalore", customer: "Tech Corp", createdAt: "2025-06-18" },
];

export default function EventTable() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState(dummyEvents);
  const [search, setSearch] = useState("");

  const handleCreate = (newEvent) => {
    setEvents([...events, newEvent]);
    setOpen(false);
  };

  const filtered = events.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField size="small" placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button variant="contained" onClick={() => setOpen(true)}>Create Event</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Event Name</TableCell>
            <TableCell>Place</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>QR Code</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((e, idx) => (
            <TableRow key={idx}>
              <TableCell>{e.name}</TableCell>
              <TableCell>{e.place}</TableCell>
              <TableCell>{e.customer}</TableCell>
              <TableCell>{e.createdAt}</TableCell>
              <TableCell>QR</TableCell>
              <TableCell>Edit | Delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateEventDialog open={open} onClose={() => setOpen(false)} onSave={handleCreate} />
    </Box>
  );
}
