import { useState } from "react";
import axios from "axios";

export default function ImageUpload() {
  const [images, setImages] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    try {
      const res = await axios.post("http://localhost:4000/upload", formData);
      setUploadedUrls(res.data.imageUrls);
      alert("Upload successful");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload failed. Check console.");
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {uploadedUrls.map((url, idx) => (
          <img key={idx} src={url} alt={`Uploaded ${idx}`} width={100} />
        ))}
      </div>
    </div>
  );
}
