import { useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Button,
  TextField, Box, Grid, Typography, InputAdornment, Divider,
  IconButton
} from '@mui/material';
import CreateEventDialog from './CreateEventDialog';
import EventDetailsDialog from './EventDetailsDialog'; // ✅ New dialog import
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

const dummyEvents = [
  { name: "Wedding Bash", place: "Mumbai", customer: "John Doe", createdAt: "2025-06-20" },
  { name: "Tech Expo", place: "Bangalore", customer: "Tech Corp", createdAt: "2025-06-18" },
];

export default function EventTable() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState(dummyEvents);
  const [search, setSearch] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // For full row click

  const handleCreate = (newEvent) => {
    if (editingIndex !== null) {
      const updated = [...events];
      updated[editingIndex] = newEvent;
      setEvents(updated);
      setEditingIndex(null);
    } else {
      setEvents([...events, newEvent]);
    }
    setOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      const updated = [...events];
      updated.splice(index, 1);
      setEvents(updated);
    }
  };
                                  
  const handleShare = async (event) => {
    try {
      const response = await fetch('/sample.jpg');
      const blob = await response.blob();
      const file = new File([blob], 'event-image.jpg', { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: event.name,
          text: `📅 ${event.name}\n📍 ${event.place}\n👤 ${event.customer}`,
          files: [file],
        });
      } else {
        alert('File sharing is not supported on this device/browser.');
      }
    } catch (err) {
      console.error('Sharing failed:', err);
      alert('Failed to share the file.');
    }
  };

  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box p={2}>
      {/* Header */}
      <Grid container spacing={2} mb={2} justifyContent="space-between" alignItems="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Event Table</Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Box display="flex" justifyContent="flex-end" gap={2} flexWrap="wrap">
            <TextField
              size="small"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: '300px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                setEditingIndex(null);
                setOpen(true);
              }}
              startIcon={<AddIcon />}
              sx={{ minWidth: '150px' }}
            >
              Create Event
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Table */}
      <Box sx={{ overflowX: 'auto' }}>
        <Divider />
        <Table>
          <TableHead>
            <TableRow>
              {["Event Name", "Event Place", "Customer", "Created At", "QR Code", "Actions"].map((head, i) => (
                <TableCell key={i}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((e, idx) => (
              <TableRow key={idx} onClick={() => setSelectedEvent(e)} sx={{ cursor: 'pointer' }}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.place}</TableCell>
                <TableCell>{e.customer}</TableCell>
                <TableCell>{e.createdAt}</TableCell>
                <TableCell>QR</TableCell>
                <TableCell onClick={(ev) => ev.stopPropagation()}>
                  <Box display="flex" gap={1}>
                    <IconButton color="primary" size="small" onClick={() => handleEdit(idx)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" size="small" onClick={() => handleDelete(idx)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="secondary" size="small" onClick={() => handleShare(e)}>
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* Create/Edit Dialog */}
      <CreateEventDialog
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingIndex(null);
        }}
        onSave={handleCreate}
        initialData={editingIndex !== null ? events[editingIndex] : null}
      />

      {/* Event Details Dialog on Row Click */}
      <EventDetailsDialog
        open={!!selectedEvent}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </Box>
  );
}
