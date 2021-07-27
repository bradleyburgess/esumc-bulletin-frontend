import Spinner from "./Spinner";
import P from "../../common/Paragraph";

const Loading = ({ text }) => (
  <div className="container">
    <div className="spinner">
      <Spinner />
    </div>
    <P>{text || "Loading bulletins…"}</P>
    <style jsx>{`
      .container {
        text-align: center;
      }
      .spinner {
        margin-bottom: 1.5rem;
      }
    `}</style>
  </div>
);

export default Loading;
