import { Link } from "react-router-dom";
import score from "../../assets/score.png";
import champ from "../../assets/champs.png";

interface EmptyProps {
  icon: string;
  title: string;
  content: string;
  buttonText?: string;
  buttonLink?: string;
}

const Empty = (props: EmptyProps) => {
  const { icon, title, content, buttonText, buttonLink } = props;

  const ic = icon === champ ? champ : score;
  return (
    <section className="empty">
      <img src={ic} alt="keine scores vorhanden" className="empty-icon" />
      <h4 className="empty-title">{title}</h4>
      <p className="empty-content">{content}</p>
      {buttonLink && (
        <Link className="btn btn-secondary" to={buttonLink}>
          {buttonText}
        </Link>
      )}
    </section>
  );
};

export default Empty;
