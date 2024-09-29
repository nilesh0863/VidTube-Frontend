import "./PlaylistCard.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { value_converter } from "../../data";
import profileUtils from "../../utils/profileUtils";
import { useDispatch } from "react-redux";
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

const PlaylistCard = ({ playlistId, thumbnail, title, videoCount }) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedThumbnail, setUpdatedThumbnail] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleModal = () => {
    isOpen ? onClose() : onOpen();
  };

  const toast = useToast(); // Use Chakra's toast

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toggleMenu = (e) => {
    e.preventDefault(); // Prevents link click from triggering
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const deletePlaylist = async (e) => {
    const url = `http://localhost:8000/api/v1/playlist/${playlistId}`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    closeMenu();

    const deletePromise = axios.delete(url, { headers });

    toast.promise(deletePromise, {
      loading: {
        title: "Deleting Playlist...",
        description: "Please wait while we update the video details.",
      },
      success: {
        title: "Playlist Deleted successfully!",
        description: "Your video details have been updated.",
      },
      error: {
        title: "Failed to Delete Playlist",
        description: "Something went wrong while updating the video.",
      },
    });

    try {
      await deletePromise;
      onClose();
      closeMenu();
      profileUtils.fetchUserPlaylists(dispatch);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const updatePlaylist = async (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/v1/playlist/${playlistId}`;

    if (updatedTitle === "" && updatedDescription === "") {
      toast({
        title: "At least one field must be updated!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const data = {};
    if (updatedTitle) {
      data.name = updatedTitle;
    }
    if (updatedDescription) {
      data.description = updatedDescription;
    }

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };

    closeMenu();

    const updatePromise = axios.patch(url, data, { headers });

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
      profileUtils.fetchUserPlaylists(dispatch);
      onClose();
      closeMenu();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div className="playlist-card">
      <img
        src={thumbnail}
        alt="Playlist Thumbnail"
        className="playlist-thumbnail"
      />
      <div className="playlist-info">
        <h3>{title}</h3>
        <p>{videoCount} videos</p>
      </div>
      <div className="dots-container2">
        <HiOutlineDotsVertical className="dot-icon2" onClick={toggleMenu} />
        {menuOpen && (
          <ul className="popup-menu2" onClick={closeMenu}>
            <li onClick={deletePlaylist}>Delete</li>
            <li onClick={toggleModal}>Update</li>
          </ul>
        )}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={toggleModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new Playlist</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Playlist Name"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  placeholder="Enter a Playlist description "
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={updatePlaylist}>
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

export default PlaylistCard;
