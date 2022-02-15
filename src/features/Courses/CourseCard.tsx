import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

interface CourseCardProps {
  id: string;
  url: string;
  name: string;
  shortDesc: string;
}

const CourseCard = (props: CourseCardProps) => {
  const { id, url, name, shortDesc } = props;

  return (
    <Col key={id}>
      <Card>
        <Card.Img variant="top" src={url} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{shortDesc}</Card.Text>
          <Link className="btn btn-primary" to={`/course/${id}`}>
            Details
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CourseCard;
