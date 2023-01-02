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
import Reservations from "./reservations";

function ReservationsWrapper() {
    const navigate = useNavigate();
    // var reservations = [];
    const [reservations, setReservations] = useState([])
    const [isFetched, setIsFetched] = useState(false)

    function refreshPage() {
        window.location.reload(false);
    }
    const deleteReservation = async (id) => {
        if (window.confirm(`Are you sure you want to delete the reservation?`)) {
            let url = `http://localhost:3000/reservations/${id}`
            const res = await axios.delete(url);
            navigate(0);
            res.status();
        };
    }

    useEffect(() => {
        const reviewFetch = async () => {
            const data = await (
                await fetch(
                    "http://localhost:3000/reservations/"
                )
            ).json();
            console.log(data)
            await setReservations(data)
            await setIsFetched(true)
        };
        reviewFetch();
    }, []);


    console.log(reservations)

    if (isFetched) {
        return (

            <Reservations data={reservations} />

        )
    }
}

export default ReservationsWrapper;
