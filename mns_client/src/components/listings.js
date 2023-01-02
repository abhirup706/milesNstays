import ListingsCardsRow from "./listingCardsRow";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Row } from "react-bootstrap";

function Listings() {
  console.log(useLocation());
  const data = useLocation().state.data;
  const title = useLocation().state.title;
  var rows = [];
  var flag = false;
  console.log(data);
  for (let i = 0; i < data.length;) {
    console.log("in here")
    if (i + 4 > data.length) {
      rows.push(
        <ListingsCardsRow cards={data.slice(i, data.length)} keys={i / 4} />
      );
    } else {
      rows.push(<ListingsCardsRow cards={data.slice(i, i + 4)} keys={i / 4} />);
    }
    i += 4;
  }
  if (data.length > 0) {
    flag = false;
  } else {
    flag = true;
  }
  console.log(rows)

  return (
    <div>
      {flag && <div className="jumbotron jumbotron-fluid text-center mt-4" id="error" >
        <h1>Sorry! Could not find you the right stay for your miles &#128532; </h1>
      </div>}
      <Row className="mx-4 mt-2">
        <h2>{title}</h2>
      </Row>
      {rows}
    </div>
  );
}

export default Listings;
