import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CameraVIew from "./components/CameraVIew";
import Header from "./components/Header";
import Login from "./components/Login";
import Admin from "./components/Admin";
import { Provider } from "react-redux";
import appStore from "./utils/redux/appStore";
import Footer from "./components/Footer";
import Support from "./components/Support";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <div className="">
          <Header />
          <div className="h-[95%] bg-slate-900">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/camera" element={<CameraVIew />} />
              <Route exact path="/settings" element={<Admin />} />
              <Route exact path="/terms-and-conditions" element={<Support purpose="terms-and-conditions"/>} />
              <Route exact path="/contact-us" element={<Support purpose="contact-us"/>} />
              <Route exact path="/privacy-policy" element={<Support purpose="privacy-policy"/>} />
              <Route exact path="/products-and-services" element={<Support purpose="products-and-services"/>} />
            </Routes>
            </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
