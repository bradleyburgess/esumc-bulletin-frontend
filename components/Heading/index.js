import { theme } from "../../styles/global";

const Title = ({ children }) => (
  <>
    <h1>{children}</h1>
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

export default Title;
