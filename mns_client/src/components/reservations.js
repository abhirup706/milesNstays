import React, { useState, useEffect } from "react";
import { BsFillTrashFill } from 'react-icons/bs'
import {
    Typography,
    Grid,
    Card,
    Divider,
    List,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Reservations(props) {
    const navigate = useNavigate();
    var reservations = props.data;

    console.log(props)
    function refreshPage() {
        window.location.reload(false);
    }
    const deleteReservation = async (reservation) => {
        if (window.confirm(`Are you sure you want to delete the reservation?`)) {
            console.log(new Date(reservation.start_date))
            console.log(new Date().getDate())

            // console.log((new Date("2022-12-23").getDate() + 2) === new Date(reservations.start_date).getDate())
            if (new Date(reservation.start_date).getDate() - new Date().getDate() <= 2) {
                alert("Booking Cannot Be Cancelled 48 hours Prior to the Booking Start")
            }
            else {
                let url = `http://localhost:3000/reservations/${reservation._id}`
                const res = await axios.delete(url);
                alert("Booking Cancelled Successfully!")
                navigate(0);
                res.status();

            }
        };
    }




    return (
        <Grid item xs={12} sm={12} style={{ margin: "2%", width: "100%" }}>
            <Card style={{ padding: "3%" }}>
                <Divider style={{ marginTop: "1%", height: "3px" }} />

                <List>
                    {reservations.length > 0 && (
                        <ol>
                            {reservations.map((reservation) => (
                                <li key={reservation._id}>
                                    <Grid container>
                                        {/* <Grid item style={{ paddingRight: "3%" }}>
                                            <img src={`img/propertyImages/${d.images[0]}`} style={{ height: "100px", width: "100px" }} />
                                        </Grid> */}
                                        <Grid item>
                                            <Typography variant="h6">
                                                {reservation.property_name}
                                                <br />
                                            </Typography>
                                            <Typography variant="subtitle1">
                                                {reservation.start_date.substring(0, 10)} to {reservation.end_date.substring(0, 10)}
                                            </Typography>
                                        </Grid>
                                        {props.tab === "1" &&
                                            <Grid item style={{ paddingLeft: "20%", float: "right" }}>
                                                <BsFillTrashFill color="red" onClick={(e) => { deleteReservation(reservation) }} />
                                            </Grid>
                                        }
                                    </Grid>
                                    <br />
                                    <Divider style={{ marginTop: "1%", marginBottom: "1%", height: "2px" }} />
                                </li>
                            ))}
                        </ol>
                    )}
                </List>
            </Card>
        </Grid>)
}

export default Reservations;
