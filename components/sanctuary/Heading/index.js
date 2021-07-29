import { theme } from "../../../styles/global";
import classnames from "classnames";

const Heading = ({ children, standing }) => (
  <>
    <h1 className={classnames({ standing })}>{children}</h1>
    <style jsx>{`
      h1 {
        font-family: ${theme.fonts.sans};
        font-weight: 700;
        font-size: 1.6875rem;
        color: black;
        text-transform: uppercase;
      }
      .standing:before {
        content: "\\002B \\00A0";
        font-weight: 700;
      }
      @media screen and (min-width: 630px) {
        .standing:before {
          position: absolute;
          left: -10px;
        }
      }
    `}</style>
  </>
);

export default Heading;
