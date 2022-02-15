import { Link } from "react-router-dom";

const CustomTooltip = ({ active, payload, label }: any) => {
  const getLabelName = (label: string) => {
    if (label === "score") {
      return "Anzahl Schläge";
    }
    if (label === "totalPutts") {
      return "Putts";
    }
    if (label === "totalGIR") {
      return "Greens in Regulation";
    }
    if (label === "totalFIR") {
      return "Fairways in Regulation";
    }
  };

  if (active) {
    return (
      <section id="tooltip">
        <h2>Statistik</h2>
        <p className="label">{`${getLabelName("score")}: ${
          payload[0].payload.score
        }`}</p>
        <p className="label">{`${getLabelName("totalPutts")}: ${
          payload[0].payload.totalPutts
        }`}</p>
        <p className="label">{`${getLabelName("totalGIR")}: ${
          payload[0].payload.totalGIR
        }`}</p>
        <p className="label">{`${getLabelName("totalFIR")}: ${
          payload[0].payload.totalFIR
        }`}</p>
        <Link
          className="btn btn-primary"
          to={`/singlescore/${payload[0].payload.id}`}
        >
          Details
        </Link>
      </section>
    );
  } else {
    return <h1>Hello</h1>;
  }
};

export default CustomTooltip;
