import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Feed from './pages/Feed';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for creating a new post */}
        <Route path="/create-post" element={<CreatePost />} />
        
        {/* Route for viewing the feed of all posts */}
        <Route path="/feed" element={<Feed />} />
      </Routes>
    </Router>
  );
}

export default App;