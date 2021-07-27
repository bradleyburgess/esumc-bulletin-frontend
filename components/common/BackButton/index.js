import Link from "next/link";
import { useRouter } from "next/router";
import { theme } from "../../../styles/global";

const {
  colors: { lightGrey },
} = theme;

export default function BackButton({ href }) {
  const router = useRouter();
  return (
    <div className="container">
      <a aria-label="Go Back" onClick={() => router.back()}>
        <div className="btn">
          <div className="symbol"></div>
        </div>
      </a>
      <style jsx>{`
        .container {
          margin: 0.5rem;
        }
        .btn {
          width: 40px;
          height: 40px;
          border: 2px solid ${lightGrey};
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: ${lightGrey};
        }
        .btn:hover {
          transition: all 0.15s ease-in-out;
          margin-left: -2px;
          margin-top: -2px;
          border-width: 3px;
          height: 42px;
          width: 42px;
        }
        .btn:hover .symbol {
          height: 11px;
          width: 11px;
          border-width: 5px;
          transition: all 0.15s ease-in-out;
        }
        a {
          text-decoration: none;
          cursor: pointer;
        }
        .text {
          font-family: ${theme.fonts.sans};
          font-weight: bold;
          font-size: 3.2rem;
        }
        .symbol {
          height: 10px;
          width: 10px;
          transform: rotate(-45deg);
          border-left: 4px solid ${lightGrey};
          border-top: 4px solid ${lightGrey};
        }
      `}</style>
    </div>
  );
}
