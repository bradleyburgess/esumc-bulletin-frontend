import { theme } from "../../../styles/global";
const Paragraph = ({ children }) => (
  <>
    <p>{children}</p>
    <style jsx>{`
      p {
        font-family: ${theme.fonts.sans};
        font-size: 1.125rem;
        line-height: 1.5em;
        margin-bottom: 0.55em;
        text-align: center;
        &:last-of-type {
          margin-bottom: 0;
        }
      }
    `}</style>
  </>
);

export default Paragraph;
