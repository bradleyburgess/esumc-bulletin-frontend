import Link from "next/link";
import { theme } from "../../../styles/global";

const {
  colors: { primary: primaryColor, secondary: secondaryColor, lightGrey: grey },
} = theme;

export default function Button({ href, children, primary, disabled }) {
  const color = disabled ? grey : primary ? primaryColor : secondaryColor;
  return (
    <>
      {!disabled ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        <a className="disabled">{children}</a>
      )}

      <style jsx>{`
        a {
          padding: 0.85em;
          border: 2px solid;
          border-radius: 25px;
          border-color: ${color};
          font-family: ${theme.fonts.sans};
          text-transform: uppercase;
          font-weight: bold;
          text-decoration: none;
          color: #fff;
          background-color: ${color};
        }
        a:hover {
          transition: all 0.15s ease-in;
          color: ${disabled ? null : color};
          background-color: ${disabled ? null : "white"};
        }

        .disabled {
          cursor: not-allowed;
        }
        // .primary {
        //   background-color: #2c6279;
        //   border-color: #2c6279;
        // }
        // .primary:hover {
        //   background-color: white;
        //   color: #2c6279;
        // }
      `}</style>
    </>
  );
}
