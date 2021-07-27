import { theme } from "../../../styles/global";

const IndexTitle = ({ children }) => (
  <>
    <h1>{children}</h1>
    <style jsx>{`
      h1 {
        font-family: ${theme.fonts.serif};
        font-size: 1.25rem;
        color: black;
        text-align: center;
      }
    `}</style>
  </>
);

export default IndexTitle;
