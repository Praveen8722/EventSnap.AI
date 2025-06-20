import { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button
} from '@mui/material';

export default function CreateEventDialog({ open, onClose, onSave }) {
  const [form, setForm] = useState({ name: '', place: '', customer: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const newEvent = {
      ...form,
      createdAt: new Date().toISOString().split('T')[0]
    };
    onSave(newEvent);
    setForm({ name: '', place: '', customer: '' });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <TextField name="name" label="Event Name" fullWidth margin="dense" value={form.name} onChange={handleChange} />
        <TextField name="place" label="Event Place" fullWidth margin="dense" value={form.place} onChange={handleChange} />
        <TextField name="customer" label="Customer Name" fullWidth margin="dense" value={form.customer} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
