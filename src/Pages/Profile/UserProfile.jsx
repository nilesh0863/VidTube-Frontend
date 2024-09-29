import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./UserProfile.css";
import VideoCard from "../../Components/VideoCard/VideoCard";
import PlaylistCard from "../../Components/PlaylistCard/PlaylistCard";
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
  useToast,
} from "@chakra-ui/react";

const ChannelProfile = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.user.userProfile);
  const videos = useSelector((state) => state.user.userVideos);
  const playlists = useSelector((state) => state.user.userPlaylist);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleModal = () => {
    isOpen ? onClose() : onOpen();
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toast = useToast();

  useEffect(() => {
    profileUtils.fetchUserProfile(dispatch);
    profileUtils.fetchUserVideos(dispatch);
    profileUtils.fetchUserPlaylists(dispatch);
  }, []);

  const handleCreatePlaylist = async () => {
    const url = `http://localhost:8000/api/v1/playlist/create`;
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    };
    if (!playlistName || !playlistDescription) {
      toast({
        title: "All fields required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const data = {
      name: playlistName,
      description: playlistDescription,
    };

    const createPromise = axios.post(url, data, { headers });

    toast.promise(createPromise, {
      loading: {
        title: "Creating Playlist",
        description: "Please wait while we update the video details.",
      },
      success: {
        title: "Playlist Created successfully!",
        description: "Your playlist has created.",
      },
      error: {
        title: "Failed to Create Playlist",
        description: "Something went wrong while Creating the Playlist.",
      },
    });

    try {
      await createPromise;
      toggleModal();
      setPlaylistName("");
      setPlaylistDescription("");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="channel-profile">
      {/* Channel Header */}
      <div className="channel-header">
        <img
          src={profileDetails.coverImage || "default-cover.jpg"}
          alt="Channel Banner"
          className="channel-banner"
        />
        <div className="channel-info">
          <img
            src={profileDetails.avatar || "default-avatar.jpg"}
            alt="Channel Avatar"
            className="channel-avatar"
          />
          <div>
            <h2>{profileDetails.username}</h2>
            <p>{profileDetails.subscribersCount} subscribers</p>
          </div>
        </div>
      </div>

      {/* Channel Tabs */}
      <div className="channel-tabs">
        <button
          className={activeTab === "videos" ? "active-tab" : ""}
          onClick={() => setActiveTab("videos")}
        >
          Videos
        </button>
        <button
          className={activeTab === "playlists" ? "active-tab" : ""}
          onClick={() => setActiveTab("playlists")}
        >
          Playlists
        </button>
      </div>
      <hr />

      {/* Channel Content */}
      <div className="channel-content">
        {activeTab === "videos" && (
          <div className="video-section">
            {videos?.map((video) => (
              <VideoCard
                key={video._id}
                videoId={video._id}
                thumbnail={video.thumbnail}
                title={video.title}
                username={video.owner.username}
                views={video.views}
                createdAt={video.createdAt}
                avatar={video.owner.avatar}
                isProfile={true}
              />
            ))}
          </div>
        )}

        {activeTab === "playlists" && (
          <div>
            <div className="create-div">
              <h3> Create new playlist? </h3>
              <Button
                onClick={toggleModal}
                size="sm"
                colorScheme="blue"
                variant="outline"
              >
                Create
              </Button>
            </div>
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
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                      value={playlistDescription}
                      onChange={(e) => setPlaylistDescription(e.target.value)}
                      placeholder="Enter a Playlist description "
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={handleCreatePlaylist}
                  >
                    Save
                  </Button>
                  <Button onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <div className="playlist-section">
              {playlists?.map((playlist) => (
                <PlaylistCard
                  key={playlist._id}
                  playlistId={playlist._id}
                  thumbnail={playlist.thumbnail}
                  title={playlist.name}
                  videoCount={playlist.videosCount}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChannelProfile;
