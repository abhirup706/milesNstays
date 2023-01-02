import { Card } from "react-bootstrap";

function PropertyCard(props) {
    console.log(props)
    return (
        <Card className='col-md-3 my-1 py-1 mx-1 px-1'>
            <Card.Img variant="top" src={`img/propertyImages/${props.info.images[0]}`} />
            <Card.Body>
                <Card.Title>{props.info.property_name}</Card.Title>
                <Card.Text>{props.info.property_type}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default PropertyCard;