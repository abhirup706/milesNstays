import React, { useState } from 'react'
import HomeInfo from './HomeInfo';
import PropertyAddress from './PropertyAddress';
import PropertyImage from './PropertyImage';
import PropertyPrice from './PropertyPrice';
import PropertyRules from './PropertyRules';
import GuestRequirements from './GuestRequirements';
import mongoose from 'mongoose'
import {
  Divider, Typography, Grid
} from '@material-ui/core'
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';

function AddPropertyForm() {

  const [page, setPage] = useState(0);
  //host_id = mongoose.Types.ObjectId(123);
  let host_id = ReactSession.get("id")
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    host_id: mongoose.Types.ObjectId(host_id),
    property_name: "",
    property_type: "",
    description: "",
    summary: "",
    room_type: "",
    max_nights: 0,
    min_nights: 0,
    max_guests: 0,
    bed_count: 0,
    bath_count: 0,

    cancellation_policy: "",

    cost: {
      per_night: 0.0,
      deposit: 0.0,
      cleaning_fee: 0.0
    },


    house_rules: {
      check_in: 12 * 60,
      check_out: 12 * 60,
      check_in_type: "",
      smoking: false,
      parties: false,
      pets: false,
      additional_notes: ""
    },

    property_address: {
      street: "",
      unit_no: "",
      city: "",
      state: "",
      zip: 0,
      country: "",
    },

    images: [
    ],

    amenities: {
      swimming_pool: false,
      garden: false,
      natural_gas_barbeque: false,
      sun_lounger: false,
      television: false
    },

  });



  const FormTitles = ["Property Information", "Property Address", "Property Price", "Propery Rules", "Property Images", "Guest Requirements"];
  const PageDisplay = (page) => {
    if (page === 0) {
      return <HomeInfo formData={formData} setFormData={setFormData} />
    }
    else if (page === 1) {
      return <PropertyAddress formData={formData} setFormData={setFormData} />
    }
    else if (page === 2) {
      return <PropertyPrice formData={formData} setFormData={setFormData} />
    }
    else if (page === 3) {
      return <PropertyRules formData={formData} setFormData={setFormData} />
    }
    else if (page === 4) {
      return <PropertyImage formData={formData} setFormData={setFormData} />
    }
    else if (page === 5) {
      return <GuestRequirements formData={formData} setFormData={setFormData} />
    }


  }

  const handleSubmit = () => {


    console.log(JSON.stringify(formData))

    const formData1 = new FormData();
    formData1.append('property_name', 'Mi Casa');
    formData1.append('property_type', 'Boat');

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch("http://localhost:3000/listings", requestOptions)
      .then((response) => response.json())
      .then(navigate("/dashboard"))


  }

  return (
    <div className='form'>
      <div className="form-container">
        <div className="header" style={{ marginTop: "1%", marginBotto: "1%" }}>
          <Grid>
            <Grid item>
              <Typography style={{ justify: "center" }} variant="h3">Add A New Property</Typography>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </div>
        <div className="body">{PageDisplay(0)}</div>
        <div className="body">{PageDisplay(1)}</div>
        <div className="body">{PageDisplay(2)}</div>
        <div className="body">{PageDisplay(3)}</div>
        <div className="body">{PageDisplay(4)}</div>
        <div className="body">{PageDisplay(5)}</div>
        <div className="footer">
          <button
            styles={{ borderRadius: "50%" }}
            onClick={() => {
              window.alert("Submitting now")
              handleSubmit()
            }}>
            Submit
          </button>
        </div>

      </div>
    </div>

  )
}

export default AddPropertyForm
