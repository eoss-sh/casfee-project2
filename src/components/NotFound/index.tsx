import { useAppSelector } from "../../helpers/hooks";
import { Link } from "react-router-dom";
import SmallHero from "../SmallHero";

const NotFound = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <SmallHero
        title="Seite nicht gefunden"
        subtitle="Ups, da ist etwas schief gelaufen..."
      />
      <div className="not-found container">
        {user.uid === "" ? (
          <p>
            Die angegebene URL ist leider nicht verfügbar. Gehen Sie auf die{" "}
            <Link to="/">Startseite</Link> oder{" "}
            <Link to="/login">melden Sie sich an.</Link>
          </p>
        ) : (
          <p>
            Die angegebene URL ist leider nicht verfügbar. Gehen Sie auf die{" "}
            <Link to="/">Startseite</Link>, Ihre{" "}
            <Link to="/scores">Ergebnisse</Link> oder spielen Sie eine{" "}
            <Link to="add-score">neue Runde</Link>.
          </p>
        )}
      </div>
    </>
  );
};

export default NotFound;
