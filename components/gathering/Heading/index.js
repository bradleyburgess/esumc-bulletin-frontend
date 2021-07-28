import { theme } from "../../../styles/global";

const Title = ({ children }) => (
  <>
    <h1>{children}</h1>
    <style jsx>{`
      h1 {
        font-family: ${theme.fonts.serif};
        font-weight: 700;
        font-size: 1.6875rem;
        color: black;
        text-transform: uppercase;
        text-align: center;
      }
    `}</style>
  </>
);

export default Title;
