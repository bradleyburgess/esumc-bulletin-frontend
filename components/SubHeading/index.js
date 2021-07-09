import { theme } from "../../styles/global";

const SubHeading = ({ span, children }) => (
  <>
    {span ? (
      <span className="text">{children}</span>
    ) : (
      <h2 className="text">{children}</h2>
    )}
    <style jsx>{`
      .text {
        font-family: proxima-nova;
        font-weight: bold;
        font-size: 1.125rem;
        text-transform: uppercase;
        color: ${theme.colors.darkGrey};
      }
    `}</style>
  </>
);

export default SubHeading;
