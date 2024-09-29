import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./VideoCard.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { value_converter } from "../../data";
import profileUtils from "../../utils/profileUtils";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea,
  useToast, // Import Chakra UI's toast
} from "@chakra-ui/react";
import moment from "moment";

const VideoCard = ({
  videoId,
  thumbnail,
  title,
  username,
  views,
  createdAt,
  avatar,
  isProfile,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedThumbnail, setUpdatedThumbnail] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleModal = () => {
    isOpen ? onClose() : onOpen();
  };

  const toggleMenu = (e) => {
    e.preventDefault(); // Prevents link click from triggering
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toast = useToast(); // Use Chakra's toast

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleThumbnailChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUpdatedThumbnail(e.target.files[0]); // Safely set the first file
    } else {
      setUpdatedThumbnail(null); // Handle the case when no file is selected
    }
  };

  const updateVideoDetails = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/v1/videos/update-video/${videoId}`;
    const formData = new FormData();

    if (updatedTitle === "" && updatedDescription === "" && !updatedThumbnail) {
      toast({
        title: "At least one field must be updated!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (updatedTitle) formData.append("title", updatedTitle);
    if (updatedDescription) formData.append("description", updatedDescription);
    if (updatedThumbnail) formData.append("thumbnail", updatedThumbnail);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    closeMenu();

    const updatePromise = axios.patch(url, formData, { headers });

    toast.promise(updatePromise, {
      loading: {
        title: "Updating video...",
        description: "Please wait while we update the video details.",
      },
      success: {
        title: "Video updated successfully!",
        description: "Your video details have been updated.",
      },
      error: {
        title: "Failed to update video",
        description: "Something went wrong while updating the video.",
      },
    });

    try {
      await updatePromise;
      onClose();
      closeMenu();
      profileUtils.fetchUserVideos(dispatch);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const deleteVideo = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/v1/videos/delete-video/${videoId}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    closeMenu();

    const deletePromise = axios.delete(url, { headers });

    toast.promise(deletePromise, {
      loading: {
        title: "Deleting video...",
        description: "Please wait while we update the video details.",
      },
      success: {
        title: "Video Deleted successfully!",
        description: "Your video details have been updated.",
      },
      error: {
        title: "Failed to Delete video",
        description: "Something went wrong while updating the video.",
      },
    });

    try {
      await deletePromise;
      onClose();
      closeMenu();
      profileUtils.fetchUserVideos(dispatch);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="card">
      <img
        onClick={() => navigate(`/video/${videoId}`)}
        className="thumbnail"
        src={thumbnail}
        alt=""
      />
      <div className="avatar-channel">
        <div>
          <img src={avatar} alt="" />
        </div>

        <div onClick={() => navigate(`/video/${videoId}`)} className="det-div">
          <h2>{title}</h2>
          <h3>{username}</h3>
          <p>
            {`${value_converter(views)} Views`} &bull;{" "}
            {moment(createdAt).fromNow()}
          </p>
        </div>

        {isProfile && (
          <div className="dots-container">
            <HiOutlineDotsVertical className="dot-icon" onClick={toggleMenu} />
            {menuOpen && (
              <ul className="popup-menu" onClick={closeMenu}>
                <li onClick={deleteVideo}>Delete</li>
                <li onClick={toggleModal}>Update</li>
              </ul>
            )}
          </div>
        )}

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={toggleModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Video Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Title"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  placeholder="Enter a description"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Thumbnail</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  placeholder="Upload Thumbnail"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={updateVideoDetails}>
                Save
              </Button>
              <Button onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default VideoCard;
