import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  getOneVideo,
  getVideosBySearchQuery,
  getCommentsByVideoId,
  getDefaultPopulation,
} from "../Api/fetch";
import About from "./components/About";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import VideoShowPage from "./components/VideoShowPage";
import VideoThumbNailsList from "./components/VideoThumbNailsList";

function App() {
  const [loadingError, setLoadingError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("uesEffect Triggered");
    if (searchQuery) {
      getVideosBySearchQuery(searchQuery)
        .then((data) => {
          console.log("Raw api:", data);
          console.log("Videos by query:", data.items);
          setVideos(data.items);
          setLoadingError(false);
        })
        .catch((err) => {
          setLoadingError(true);
          console.error(err);
        });
    }
  }, [searchQuery]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setSearchQuery={setSearchQuery} />} />
        <Route path="/about" element={<About />} />
        <Route path="/videos/:videoId" element={<VideoShowPage />} />
        <Route
          path="/thumbnails"
          element={
            <VideoThumbNailsList
              items={videos}
              setSearchQuery={setSearchQuery}
            />
          }
        />
      </Routes>
      {loadingError && <p>Error loading videos.</p>}
    </Router>
  );
}

export default App;
