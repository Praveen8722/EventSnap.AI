const Event = require('../models/event.model');
const { eventSchema } = require('../schema/event.schema');
const { processImage } = require('../services/event.service');

exports.createEvent = async (req, res) => {
  console.log("Received request to create event:", req.body);
  try {
    const { error, value } = eventSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { eventName, place, customer, imageUrls = [] } = value;

    const uploadedImageUrls = [];

    // 1. Upload files from multipart/form-data
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const url = await processImage(file);
        if (url) uploadedImageUrls.push(url);
      }
    }

    // 2. Upload image URLs (from body)
    if (imageUrls.length > 0) {
      for (const url of imageUrls) {
        const uploadedUrl = await processImage(null, url);
        if (uploadedUrl) uploadedImageUrls.push(uploadedUrl);
      }
    }

    // Save to DB
    const newEvent = await Event.create({
      eventName,
      place,
      customer,
      images: uploadedImageUrls,
    });

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error("Error in createEvent:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

