import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import CameraVIew from './components/CameraVIew';
import Header from './components/Header';
import Login from './components/Login';
import Test from './components/Test'
import { useState } from 'react';

function App() {
  const [galleryImages, setGalleryImages] = useState([]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <div className='bg-gray-900 min-h-screen'>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/camera' element={<CameraVIew />} />
            <Route exact path='/test' element={<Test />} />
          </Routes>
        </div>

      </BrowserRouter>
    </>
  );
}

export default App;
