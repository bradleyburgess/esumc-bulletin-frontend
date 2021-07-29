import { theme } from "../../../styles/global";
import classnames from "classnames";

const Cross = () => (
  <>
    <span>+ </span>
    <style jsx>{`
      @media screen and (min-width: 630px) {
        position: absolute;
        left: -10px;
      }
    `}</style>
  </>
);

const Heading = ({ children, standing }) => (
  <>
    <h1>
      {standing ? (
        <>
          <Cross />
          {children}
        </>
      ) : (
        children
      )}
    </h1>
    <style jsx>{`
      h1 {
        font-family: ${theme.fonts.sans};
        font-weight: 700;
        font-size: 1.6875rem;
        color: black;
        text-transform: uppercase;
      }
    `}</style>
  </>
);

export default Heading;
