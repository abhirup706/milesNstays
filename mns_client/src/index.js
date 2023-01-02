import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NavbarHome from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Listings from "./components/listings";
import Homepage from "./components/homepage";
import AddPropertyForm from "./components/AddProperty/AddPropertyForm";
import ListingDetails from "./components/ListingDetails";
import Reservations from "./components/reservations";
import Dashboard from "./components/Dashboard";
import ReservationsWrapper from "./components/reservations_wrapper";
import { ReactSession } from "react-client-session";
import EditPropertyForm from "./components/AddProperty/EditPropertyForm";

ReactSession.setStoreType("localStorage");

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <NavbarHome></NavbarHome>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/allProperties" element={<Listings />} />
        <Route path="/addProperty" element={<AddPropertyForm />} />
        <Route path="/listingDetails" element={<ListingDetails />} />
        <Route path="/allReservations" element={<ReservationsWrapper />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editProperty" element={<EditPropertyForm />} />
      </Routes>
    </Router>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
