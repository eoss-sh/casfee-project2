import { Link } from "react-router-dom";
import icon from "../../assets/score.png";

const Empty = () => {
  return (
    <section className="empty">
      <img src={icon} alt="keine scores vorhanden" className="empty-icon" />
      <h4 className="empty-title">Hier sieht es ziemlich leer aus...</h4>
      <p className="empty-content">
        Starte jetzt und erfasse deine erste Runde.
      </p>
      <Link className="btn btn-secondary" to={"/add-score"}>
        Speielen!
      </Link>
    </section>
  );
};

export default Empty;
