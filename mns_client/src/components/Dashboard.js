import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Reservations from "./reservations";
import { ReactSession } from "react-client-session";
import { Form } from "react-bootstrap";
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs'
import { Modal } from "react-bootstrap";
import HomeInfo from "./AddProperty/HomeInfo";
import PropertyAddress from "./AddProperty/PropertyAddress";
import PropertyPrice from "./AddProperty/PropertyPrice";
import PropertyRules from "./AddProperty/PropertyRules";

import {
    Container,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Chip,
    Button,
    Divider,
    List,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    makeStyles,
    CardHeader,
    Tab,
    Tabs,
} from "@material-ui/core";

import mongoose from "mongoose";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Rating } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

function Dashboard() {
    const [tab, setTab] = React.useState(0);
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const [reservationCurr, setReservationCurr] = useState([])
    const [reservationPast, setReservationsPast] = useState([])
    const [reservationFut, setReservationsFut] = useState([])
    const [isFetchedCurr, setIsFetchedCurr] = useState(false)
    const [isFetchedPast, setIsFetchedPast] = useState(false)
    const [isFetchedFut, setIsFetchedFut] = useState(false)
    const first_name = ReactSession.get("first_name")
    const [listings, setListings] = useState(null)
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState(null)

    const user_id = ReactSession.get("id")
    var is_ui_host = ReactSession.get("is_ui_host")
    var is_host = ReactSession.get("is_host")
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const reviewFetch = async () => {
            var entity = is_ui_host ? "host" : "guest"
            const data = await (
                await fetch(
                    `http://localhost:3000/reservations/upcoming/${entity}/${user_id}`
                )
            ).json();
            console.log(data)
            await setReservationsFut(data)
            await setIsFetchedFut(true)
        };
        reviewFetch();
    }, []);

    useEffect(() => {
        var entity = is_ui_host ? "host" : "guest"
        const reviewFetch = async () => {
            const data = await (
                await fetch(
                    `http://localhost:3000/reservations/past/${entity}/${user_id}`
                )
            ).json();
            console.log(data)
            await setReservationsPast(data)
            await setIsFetchedPast(true)
        };
        reviewFetch();
    }, []);

    useEffect(() => {
        var entity = is_ui_host ? "host" : "guest"
        const reviewFetch = async () => {
            const data = await (
                await fetch(
                    `http://localhost:3000/reservations/current/${entity}/${user_id}`
                )
            ).json();
            console.log(data)
            await setReservationCurr(data)
            await setIsFetchedCurr(true)
        };
        reviewFetch();
    }, []);


    const handleClose = () => {
        // const requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        // };
        // fetch("http://localhost:3000/listings/reviews", requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .then(navigate(0))
        //     .catch((error) => console.log(error));
        setOpen(false);
    };

    const handleSubmit = () => {
        // const requestOptions = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        // };
        // fetch("http://localhost:3000/listings/reviews", requestOptions)
        //     .then((response) => response.json())
        //     .then((data) => console.log(data))
        //     .then(navigate(0))
        //     .catch((error) => console.log(error));



        setOpen(false);
    };

    const funOpenModal = (listing) => {
        console.log("inside setopenmodal")
        navigate("/EditProperty", { state: { data: listing } })
    };


    const handleOpen = () => {

        console.log("inside handleopen")
        fetch(`http://localhost:3000/listings/host/${user_id}`)
            .then((response) => response.json())
            .then((data) => setListings(data))
            .then(setOpen(true))
        // .then(console.log(listings))


    }


    function handleClickToHost(event) {
        // Prevent the default link behavior
        event.preventDefault();

        // Ask the user for confirmation
        if (window.confirm("Are you sure you want to become a host?")) {
            // If the user confirms, navigate to the new location

            const requestOptions = {
                method: "PUT"
            };
            fetch(`http://localhost:3000/users/${user_id}`, requestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .then(ReactSession.set("is_host", true))
                .then(navigate(0))
                .catch((err) => console.log(err))

        }
    }

    function handleSwitch(event) {
        // Prevent the default link behavior
        event.preventDefault();

        // Ask the user for confirmation
        ReactSession.set("is_ui_host", !is_ui_host);
        navigate(0)

    }

    const deleteListings = async (listing) => {
        if (window.confirm(`Are you sure you want to delete the listing?`)) {
            const listing_id = listing._id
            const requestOptions = {
                method: "PUT"
            };
            fetch(`http://localhost:3000/listings/delete/${listing_id}`, requestOptions)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .then(window.alert("Listing Deleted Successfully!!"))
                .then(navigate(0))
                .catch((err) => console.log(err))


        };
    }


    const pickWishlist = () => {
        fetch("http://localhost:3000/wishlist/" + user_id)
            .then((response) => response.json())
            .then((data) =>
                navigate("/allProperties", {
                    state: {
                        data: data,
                        title: "Your Wishlist",
                    },
                })
            );
    };

    return (

        <Container style={{ backgroundColor: "white" }}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={12} spacing={2} style={{ marginTop: "1%", marginBottom: "1%" }}>

                    <Card styles={{ padding: "10%" }}>
                        {is_host &&
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Host Mode"
                                checked={is_ui_host}
                                style={{ flex: "right" }}
                                onChange={handleSwitch}
                            />
                        }
                        <Typography styles={{ padding: "5%" }} variant="h3">Welcome {first_name}!
                            {!is_host && < Link to="/addProperty">
                                <Button
                                    variant="contained"
                                    color="success"
                                    style={{ float: "right", marginLeft: "1%" }}
                                    onClick={handleClickToHost}
                                >
                                    Become a Host
                                </Button>
                            </Link>}

                            {!is_ui_host &&
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    style={{ float: "right", marginLeft: "1%" }}
                                    onClick={pickWishlist}
                                >
                                    View Wishlist
                                </Button>
                            }
                        </Typography>

                        <CardContent>
                            Welcome to our MilesNStay! We are so glad you have chosen to stay
                            with us. Our goal is to make your experience with us as
                            comfortable and enjoyable as possible. Our team is here to help
                            with anything you need during your stay, so please don't hesitate
                            to reach out. Thank you for choosing us, and we hope you have a
                            wonderful time here! From cozy cottages to elegant penthouses,
                            Hosts are happy to share their places. Whether its a work trip,
                            weekend getaway, family vacation, or a longer stay, there are
                            millions of amazing places to visit.
                        </CardContent>
                    </Card>
                </Grid>


                <Grid item xs={12} sm={12} style={{ marginTop: "1%", marginBottom: "1%" }}>
                    {is_ui_host &&
                        <Grid container spacing={3} justifyContent="center" styles={{ marginBottom: "10%" }}>
                            <Grid item>
                                <Button
                                    style={{ marginTop: "3%", width: "100%" }}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    onClick={handleOpen}
                                >
                                    Manage Property
                                </Button>
                                {/* <div style={{ width: "100%" }}> */}
                                {listings &&
                                    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                                        <DialogTitle>Your Properties</DialogTitle>
                                        <DialogContent>
                                            <ol>
                                                {listings.map((listing) => (
                                                    <li key={listing._id}>
                                                        <Grid container>
                                                            <Grid item style={{ paddingRight: "3%" }}>
                                                                <img src={`img/propertyImages/${listing.images[0]}`} style={{ height: "100px", width: "100px", }} />
                                                            </Grid>
                                                            <Grid item>
                                                                <Typography variant="h6">
                                                                    {listing.property_name}
                                                                    <br />
                                                                </Typography>
                                                                <Typography variant="subtitle1">
                                                                    {listing.property_type}
                                                                </Typography>
                                                            </Grid>

                                                            <Grid item style={{ paddingLeft: "20%", float: "right" }}>
                                                                <BsPencilSquare onClick={(e) => { funOpenModal(listing) }} />

                                                            </Grid>
                                                            <Grid item style={{ paddingLeft: "5%", float: "right" }}>
                                                                <BsFillTrashFill color="red" onClick={(e) => { deleteListings(listing) }} />
                                                            </Grid>

                                                        </Grid>
                                                        <br />
                                                        <Divider style={{ marginTop: "1%", marginBottom: "1%", height: "2px" }} />
                                                    </li>
                                                ))}
                                            </ol>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleSubmit} color="primary">
                                                Submit
                                            </Button>
                                        </DialogActions>
                                    </Dialog>


                                }
                                {/* { 
                                    <Modal show={openModal} size="lg">
                                        <Modal.Header className="text-center">
                                            <h3>Edit Property Details</h3>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <HomeInfo formData={formData} setFormData={setFormData} />
                                            <PropertyAddress formData={formData} setFormData={setFormData} />
                                            <PropertyPrice formData={formData} setFormData={setFormData} />
                                            <PropertyRules formData={formData} setFormData={setFormData} />
                                        </Modal.Body>
                                        <Modal.Footer>
                                        </Modal.Footer>
                                    </Modal>} */}
                                {/* </div> */}
                            </Grid>

                            <Grid item>
                                < Link to="/addProperty">
                                    <Button
                                        style={{ marginTop: "3%", width: "130%", textDecoration: "none" }}
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        fullWidth
                                    >
                                        Add Property
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    }
                    <Card>
                        <CardContent>
                            <Tabs
                                value={tab}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                            >
                                <Tab label="Current" />
                                <Tab label="Upcoming" />
                                <Tab label="Past" />
                            </Tabs>
                            {tab === 1 && (
                                <div>
                                    {isFetchedFut && <Reservations data={reservationFut} tab="1" />}
                                </div>
                            )}
                            {tab === 0 && (
                                <div>
                                    {isFetchedCurr && <Reservations data={reservationCurr} tab="0" />}
                                </div>
                            )}
                            {tab === 2 && (
                                <div>
                                    {isFetchedPast && <Reservations data={reservationPast} tab="2" />}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>

            {/* </Grid> */}
        </Container>
    );
}

export default Dashboard;
