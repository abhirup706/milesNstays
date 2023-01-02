import { useEffect } from "react";
import { Carousel, Card, Col } from "react-bootstrap";
import "./carousel.css";

function CarouselMulti(props) {
  useEffect(() => {
    var items = document.querySelectorAll(".carousel .carousel-item");

    items.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i = 1; i < minPerSlide; i++) {
        if (!next) {
          next = items[0];
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });
  });
  return (
    <Carousel className="m-2">
      <Carousel.Item>
        <Col md="3">
          <Card className="card-carousel">
            <Card.Img className="rounded" variant="top" src={"img/jbnu2.jpg"} />
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Carousel.Item>
      <Carousel.Item>
        <Col md="3">
          <Card className="card-carousel">
            <Card.Img className="rounded" variant="top" src={"img/jbnu2.jpg"} />
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Carousel.Item>
      <Carousel.Item>
        <Col md="3">
          <Card className="card-carousel">
            <Card.Img className="rounded" variant="top" src={"img/jbnu2.jpg"} />
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Carousel.Item>
      <Carousel.Item>
        <Col md="3">
          <Card className="card-carousel">
            <Card.Img className="rounded" variant="top" src={"img/jbnu2.jpg"} />
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Carousel.Item>
      <Carousel.Item>
        <Col md="3">
          <Card className="card-carousel">
            <Card.Img className="rounded" variant="top" src={"img/jbnu2.jpg"} />
            <Card.Body>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselMulti;
