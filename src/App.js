import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CameraVIew from './components/CameraVIew';
import Header from './components/Header';
import Login from './components/Login';
import Gallery from './components/Gallery';
import { useState } from 'react';

function App() {
  const [ galleryImages, setGalleryImages] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/gallery' element={<Gallery galleryImages={galleryImages}/>} />
          <Route exact path='/camera' element={<CameraVIew setGalleryImages={setGalleryImages}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
