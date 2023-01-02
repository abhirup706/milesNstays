import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactSession } from "react-client-session";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Rating } from '@material-ui/lab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DatePicker from "react-datepicker";
import axios from "axios";


import {
	Container,
	Typography,
	Grid,
	Card,
	CardMedia,
	CardContent,
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
	DialogActions
} from '@material-ui/core'

function ListingDetails() {

	const location = useLocation();
	var listing_id = location.state.listing_id;
	console.log(location.state)
	console.log(listing_id)

	const initial_review = {
		reviewer: {
			name: ReactSession.get('username'),
		},
		property_id: listing_id,
		rating: 0,
		comment: "",
	};

	const navigate = useNavigate();
	const user_id = ReactSession.get('id');
	const is_ui_host = ReactSession.get('is_ui_host');
	const [property, setProperty] = useState(null);
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const first_name = ReactSession.get('first_name');
	const last_name = ReactSession.get('last_name');
	const username = ReactSession.get('username');



	const [reviewData, setReviewData] = useState(initial_review)
	const [reviews, setReviews] = useState(null)
	const [wishlist, setWishList] = useState(null)
	const [isFavorited, setIsFavorited] = useState(false);
	const [wishFetched, setWishFetched] = useState(false)
	const [open, setOpen] = React.useState(false);
	var today = new Date();

	const endDateChange = (e) => {
		if (!startDate) {
			alert(`Pick Check-In date first`);
		} else {
			console.log(e, startDate);
			if (e > startDate) {
				setEndDate(e);
			} else {
				alert(
					`Check-out date [${e}] should be after Check-in Date [${startDate}]`
				);
			}
		}
	};

	const reserve = () => {
		if (window.confirm(`Are you sure you want to reserve ${property.property_name} from ${new Date(startDate).toISOString().substring(0, 10)} to ${new Date(endDate).toISOString().substring(0, 10)}?`)) {
			let requestBody = {
				start_date: startDate,
				end_date: endDate,
				status: "pending",
				host_id: property.host_id,
				guest_id: user_id,
				property_id: property._id,
				property_name: property.property_name,
			};
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requestBody),
			};
			fetch("http://localhost:3000/reservations/", requestOptions)
				.then((response) => response.json())
				.then((data) => alert(data.msg))
				.catch((err) => console.log(err));
		}
	};


	useEffect(() => {
		const dataFetch = async () => {
			const data = await (
				await fetch(`http://localhost:3000/listings/${listing_id}`)
			).json();
			setProperty(data);
		};

		dataFetch();
	}, []);

	useEffect(() => {
		console.log(listing_id, user_id)
		fetch(`http://localhost:3000/wishlist?prop_id=${listing_id}&guest_id=${user_id}`)
			.then((response) => response.json())
			.then((data) => {
				setWishFetched(true)
				if (data) {
					setIsFavorited(true)
					console.log("inside useeffect json")
					setWishList(data)
				} else {
					console.log("inside else of useeffect json")
					setIsFavorited(false)
					setWishList(data)
				}
			});
	}, []);

	useEffect(() => {
		const reviewFetch = async () => {
			const data = await (
				await fetch(`http://localhost:3000/listings/reviews/${listing_id}`)
			).json();
			setReviews(data);
		};
		reviewFetch();
	}, []);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reviewData),
		};
		fetch("http://localhost:3000/listings/reviews", requestOptions)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.then(navigate(0))
			.catch((error) => console.log(error));
		setOpen(false);
	};

	const handleRating = (newRating) => {
		setRating(newRating);
		setReviewData({ ...reviewData, rating: newRating });
	};
	const [rating, setRating] = React.useState(0);

	const handleClick = () => {


		if (!isFavorited) {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					guest_id: user_id,
					property_id: listing_id
				}),
			};
			fetch("http://localhost:3000/wishlist/", requestOptions)
				.then((response) => response.json())
				.then((data) => console.log(data))
				.then(setIsFavorited(true))
				.catch((error) => console.log(error));
		}

		else {



			let url = `http://localhost:3000/wishlist/delete?prop_id=${listing_id}&guest_id=${user_id}`
			axios.delete(url)
				.then((response) => response.json())
				.then((data) => console.log(data))
				.then(setIsFavorited(false))
				.catch((error) => console.log(error));

			// alert("Booking Cancelled Successfully!")
			// navigate(0);
			// res.status();
			// console.log(listing_id, user_id)


			// fetch(`http://localhost:3000/wishlist/delete?prop_id=${listing_id}&guest_id=${user_id}`)
			// //fetch(`http://localhost:3000/wishlist/delete?prop_id=6396d4c8f20ad01462da7cf6&guest_id=6396cb009a685e9f022d258e`)
			// 	.then((response) => response.json())
			// 	.then((data) => console.log(data))
			// 	.catch((error) => console.log(error));
		}



		console.log(isFavorited);
	};

	console.log(isFavorited);

	if (property && reviews) {
		return (
			<Container style={{ backgroundColor: "white" }}>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={12}
						style={{ marginTop: "1%", marginBottom: "1%" }}
					>
						<Typography variant="h4">
							{property.property_name}
							<Button
								variant="contained"
								style={{ float: "right" }}
								color={isFavorited ? "secondary" : "default"}
								onClick={handleClick}
								startIcon={
									isFavorited ? <FavoriteIcon /> : <FavoriteBorderIcon />
								}
							>
								{isFavorited ? "Remove from Favorites" : "Add to Favorites"}
							</Button>
						</Typography>

						<Card>
							<CardMedia
								component="img"
								alt={property.name}
								height="380"
								image={`img/propertyImages/${property.images[0]}`}
								title={property.name}
								style={{ margin: "1%" }}
							/>
						</Card>
					</Grid>
				</Grid>


				{/* <Grid> */}
				<Grid item xs={12} sm={12} style={{ margin: "2%" }}>
					<Typography variant="h5">
						{property.property_type} hosted by {property.host_name}
					</Typography>
					<Grid container xs={12} sm={12} spacing={2}>
						<Grid item xs={12} sm={6}>
							<Card style={{ padding: "3%", marginBottom: "3%" }}>
								<Typography variant="body1" gutterBottom>
									{property.max_guests} Guests | {property.bed_count} Beds |{" "}
									{property.bath_count} Baths
								</Typography>
								<Divider />
								<CardContent>
									{/* <Chip label={property.type} color="primary" /> */}
									<Typography variant="body2" gutterBottom>
										{property.description}
									</Typography>
								</CardContent>
							</Card>

							<Card style={{ padding: "3%" }}>
								<Typography variant="h6">Amenities Offered</Typography>
								<Divider />
								<CardContent>
									{/* <Chip label={property.type} color="primary" /> */}
									<ul>
										{property.amenities.swimming_pool && (
											<li>
												<Typography variant="body2" gutterBottom>
													Swimming Pool
												</Typography>
											</li>
										)}

										{property.amenities.sun_lounger && (
											<li>
												<Typography variant="body2" gutterBottom>
													Sun Lounger
												</Typography>
											</li>
										)}

										{property.amenities.garden && (
											<li>
												<Typography variant="body2" gutterBottom>
													Garden
												</Typography>
											</li>
										)}

										{property.amenities.television && (
											<li>
												<Typography variant="body2" gutterBottom>
													Television
												</Typography>
											</li>
										)}
									</ul>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} sm={6}>
							<Card>
								<CardContent>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
										style={{ justifyContent: "center" }}
									>
										Book your stay
									</Typography>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6}>
											<DatePicker
												id="checkin-date"
												label="Check-in date"
												selected={startDate}
												onChange={(e) => {
													setStartDate(e);
												}}
												placeholderText="Check-IN"
												className="form-control"
												minDate={today}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<DatePicker
												id="checkout-date"
												label="Check-out date"
												selected={endDate}
												onChange={(e) => {
													endDateChange(e);
												}}
												placeholderText="Check-Out"
												className="form-control"
												minDate={today}
											/>
										</Grid>
									</Grid>
									<br />
									<InputLabel id="guests-label">Guests</InputLabel>
									<Select
										labelId="guests-label"
										id="guests"
										variant="filled"
										fullWidth
										style={{ marginTop: 16 }}
									>
										<MenuItem value={1}>1</MenuItem>
										<MenuItem value={2}>2</MenuItem>
										<MenuItem value={3}>3</MenuItem>
										<MenuItem value={4}>4</MenuItem>
										<MenuItem value={5}>5</MenuItem>
										<MenuItem value={6}>6</MenuItem>
									</Select>

									<Grid
										container
										style={{ marginTop: "2%", alignItems: "center" }}
										alignContent="flex-start"
									>
										<Grid
											item
											alignItems="center"
											justifyContent="center"
											xs={12}
										>
											<Typography>
												Price Per Night : ${property.cost.per_night}
											</Typography>
										</Grid>
										<Grid
											item
											alignItems="center"
											justifyContent="center"
											xs={12}
										>
											<Typography>
												Cleaning Fee : ${property.cost.cleaning_fee}
											</Typography>
										</Grid>
										<Grid
											item
											alignItems="center"
											justifyContent="center"
											xs={12}
										>
											<Typography>
												Deposit Amount : ${property.cost.deposit}
											</Typography>
											<br />
										</Grid>

										<Grid
											item
											alignItems="center"
											justifyContent="center"
											xs={12}
										>
											<Divider
												variant="fullWidth"
												style={{ height: 2, backgroundColor: "darkgrey" }}
											/>
											<Typography variant="h5">
												Total : $
												{property.cost.per_night +
													property.cost.cleaning_fee +
													property.cost.deposit}
											</Typography>
										</Grid>
										{/* <Grid item> */}
									</Grid>
									{/* </Grid> */}

									<Button
										style={{ marginTop: "3%" }}
										variant="contained"
										color="primary"
										size="large"
										onClick={reserve}
										fullWidth
									>
										Book Now
									</Button>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Grid>


				{/* Review Grid */}
				< Grid item xs={12} sm={12} style={{ margin: "2%" }
				}>
					<Card style={{ padding: "3%" }}>
						<Typography variant="h6">
							What Other Guests Have To Say
							<Button
								variant="outlined"
								color="primary"
								style={{ float: "right" }}
								onClick={handleClickOpen}
							>
								Add Review
							</Button>
							<div style={{ width: "100%" }}>
								<Dialog open={open} onClose={handleClose}>
									<DialogTitle>Add Review</DialogTitle>
									<DialogContent>
										<Typography variant="body1">
											Posting as {first_name} {last_name}
										</Typography>
										<TextField
											margin="dense"
											id="comment"
											label="Your Comment"
											type="text"
											multiline
											rows="4"
											fullWidth
											value={reviewData.comment}
											onChange={(event) =>
												setReviewData({
													...reviewData,
													comment: event.target.value,
												})
											}
										/>
										<div>
											<Typography>
												Rating:
												{[...Array(5)].map((star, index) => {
													const ratingValue = index + 1;

													return (
														<label key={index}>
															<input
																type="radio"
																style={{ display: "none" }}
																name="rating"
																value={ratingValue}
																onClick={() => handleRating(ratingValue)}
															/>
															{ratingValue <= rating ? (
																<StarIcon />
															) : (
																<StarBorderIcon />
															)}
														</label>
													);
												})}
											</Typography>
										</div>
									</DialogContent>
									<DialogActions>
										<Button onClick={handleClose} color="primary">
											Cancel
										</Button>
										<Button onClick={handleClose} color="primary">
											Submit
										</Button>
									</DialogActions>
								</Dialog>
							</div>
						</Typography>

						<Divider style={{ marginTop: "1%" }} />
						<List>
							{reviews.length > 0 && (
								<ol>
									{reviews.map((review) => (
										<li key={review.reviewer.id}>
											<Typography variant="h6">
												{review.reviewer.name}
												<br />
											</Typography>
											<Typography variant="h6">
												{review.date}
												<br />
											</Typography>
											<Rating
												name="rating"
												defaultValue={review.rating}
												precision={0.5}
												size="large"
											/>
											<Typography variant="body2" gutterBottom>
												{review.comment}
											</Typography>
											<br />
										</li>
									))}
								</ol>
							)}
							{reviews.length === 0 && (
								<Typography variant="h6">No Reviews Yet</Typography>
							)}
						</List>
					</Card>
				</Grid >
			</Container >
		);
	}
}

export default ListingDetails;
