import { Spinner } from "react-bootstrap";

const SpinnerComp = () => {
  return (
    <section className="spinner">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </section>
  );
};

export default SpinnerComp;
