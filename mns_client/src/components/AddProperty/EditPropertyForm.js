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
import { useLocation, useNavigate } from "react-router-dom";



function EditPropertyForm() {

  const [page, setPage] = useState(0);
  //host_id = mongoose.Types.ObjectId(123);
  let host_id = ReactSession.get("id")
  const data = useLocation().state.data;
  const [formData, setFormData] = useState(data)
  console.log(formData)

  const navigate = useNavigate()


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

    window.alert("Updating Your Property Details")

    console.log(JSON.stringify(formData))


    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    fetch(`http://localhost:3000/listings/${formData._id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(window.alert("Property Successfully Updated"))
      .then(navigate("/dashboard"));

  }

  return (
    <div className='form'>
      <div className="form-container">
        <div className="header" style={{ marginTop: "1%", marginBotto: "1%" }}>
          <Grid>
            <Grid item>
              <Typography style={{ justify: "center" }} variant="h3">Edit Your Property</Typography>
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
              handleSubmit()
            }}>
            Submit
          </button>
        </div>

      </div>
    </div>

  )
}

export default EditPropertyForm
