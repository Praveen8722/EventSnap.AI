import axios from "axios";

const API_URL = "http://localhost:4000/api/events";

export const createEvent = async (eventData) => {
  const formData = new FormData();
  formData.append("eventName", eventData.name);
  formData.append("place", eventData.place);
  formData.append("customer", eventData.customer);

  if (eventData.file) {
    formData.append("images", eventData.file);
  }

  return await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
