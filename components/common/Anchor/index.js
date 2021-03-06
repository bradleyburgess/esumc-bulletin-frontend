import { theme } from "../../../styles/global";

const Anchor = ({ href, children, color }) => (
  <>
    <a href={href}>{children}</a>
    <style jsx>
      {`
        a {
          text-decoration: underline;
          color: black;
          font-weight: bold;
          transition: all 0.15s ease-out;
          &:hover {
            color: ${color || theme.colors.red};
            transtion: all 0.15s ease-out;
          }
        }
      `}
    </style>
  </>
);

export default Anchor;
