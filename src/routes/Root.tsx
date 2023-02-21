import { Link } from "react-router-dom";
import "../styles/index.css";

export default function Root() {
  return (
    <Link to={"jobs/step-1"}>
      <h2 style={{ textAlign: "center" }}>Begin</h2>
    </Link>
  );
}
