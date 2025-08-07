import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography, Box, Paper, Grid
} from '@mui/material';
import { useDropzone } from 'react-dropzone';

export default function EventDetailsDialog({ open, onClose }) {
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState('photos');

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    onDrop: (files) => {
      const previews = files.map(file =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setImages(prev => [...prev, ...previews]);
    }
  });

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" gap={2}>
          {['photos', 'people'].map(tab => (
            <Button
              key={tab}
              variant="text"
              onClick={() => setActiveTab(tab)}
              sx={{
                borderBottom: activeTab === tab ? '2px solid blue' : '2px solid transparent',
                borderRadius: 0,
                fontWeight: 'bold',
                color: 'inherit'
              }}
            >
              {tab === 'photos' ? 'Event Photos' : 'People and Pets'}
            </Button>
          ))}
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {activeTab === 'photos' ? (
          <Box>
            <Typography fontWeight="bold" mb={1}>Upload Event Photos</Typography>
            <Paper {...getRootProps()} sx={{ p: 2, border: '2px dashed #ccc', textAlign: 'center', cursor: 'pointer' }}>
              <input {...getInputProps()} />
              <Typography variant="body2">Drag & drop or click to upload</Typography>
            </Paper>

            <Grid container spacing={1} mt={2}>
              {images.map((img, i) => (
                <Grid item xs={4} sm={2} key={i}>
                  <img
                    src={img.preview}
                    alt={`img-${i}`}
                    style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4, border: '2px solid gray' }}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box>
            <Typography fontWeight="bold" mb={1}>Detected Face Profiles</Typography>
            <Typography variant="body2">No faces detected yet.</Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
