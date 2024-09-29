import React, { useState } from "react";
import axios from "axios";
import "./Upload.css";
import { Spinner } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [tags, setTags] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // Show video preview
  };

  const handleThumbnailChange = (e) => {
    console.log(e.target.files);
    setThumbnail(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("videoFile", videoFile);
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("description", description);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/videos/upload-video",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.data.success) {
        console.log(response.data);
        setLoading(false);
        handleSuccess("Video Uploaded successfully");
        // console.log("Upload success:", response.data);
        setVideoFile(null);
        setThumbnail(null);
        setTitle("");
        setDescription("");
        setTimeout(() => {
          navigate("/user-profile");
        }, 10000);
      } else {
        setLoading(false);
        handleError("Erro while uploading video");
      }
    } catch (error) {
      handleError("Erro while uploading video");
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="upload-page">
      <h2>Upload Video</h2>
      <form onSubmit={handleUpload}>
        {/* Video Upload Section */}
        <div className="form-group">
          <label htmlFor="video">Select Video</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Video Preview */}
        {previewUrl && (
          <div className="video-preview">
            <h4>Video Preview:</h4>
            <video width="400" controls>
              <source src={previewUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Title */}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Tags */}
        {/* <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Separate tags with commas"
          />
        </div> */}

        {/* Thumbnail */}
        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail Image</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && (
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit">{loading ? <Spinner /> : "Upload Video"}</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Upload;
