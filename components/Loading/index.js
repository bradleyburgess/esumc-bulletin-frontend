import Spinner from "./Spinner";
import P from "../Paragraph";

const Loading = ({ text }) => (
  <div>
    <div className="spinner">
      <Spinner />
    </div>
    <P>{text || "Loading bulletins…"}</P>
    <style jsx>{`
      .spinner {
        margin-bottom: 1.5rem;
      }
    `}</style>
  </div>
);

export default Loading;
