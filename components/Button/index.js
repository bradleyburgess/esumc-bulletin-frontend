import Link from "next/link";
import { theme } from "../../styles/global";

const {
  colors: { primary: primaryColor, secondary: secondaryColor },
} = theme;

export default function Button({ href, children, primary }) {
  return (
    <>
      <Link href={href}>
        <a className={primary ? "primary" : null}>{children}</a>
      </Link>

      <style jsx>{`
        a {
          padding: 0.85em;
          border: 2px solid;
          border-radius: 25px;
          border-color: ${primary ? primaryColor : secondaryColor};
          font-family: proxima-nova;
          text-transform: uppercase;
          font-weight: bold;
          text-decoration: none;
          color: #fff;
          background-color: ${primary ? primaryColor : secondaryColor};
        }
        a:hover {
          transition: all 0.15s ease-in;
          color: ${primary ? primaryColor : secondaryColor};
          background-color: white;
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
