import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { createEvent } from "../services/eventService";

export default function CreateEventDialog({ open, onClose, onSave }) {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [customer, setCustomer] = useState("");
  const [file, setFile] = useState(null);

  const handleSave = async () => {
    const eventData = {
      name,
      place,
      customer,
      file,
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await createEvent(eventData);
      console.log("Event created:", response.data);
      onSave(response.data.event); // Optionally pass the created event back

      // Reset all fields
      setName("");
      setPlace("");
      setCustomer("");
      setFile(null);
      onClose(); // close the dialog after save
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Name"
          fullWidth
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Event Place"
          fullWidth
          margin="dense"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <TextField
          label="Customer Name"
          fullWidth
          margin="dense"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        {/* File upload input */}
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginTop: 16 }}
        />
        {file && <p>Selected File: {file.name}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
