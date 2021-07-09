import { theme } from "../styles/global";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import esumcLogo from "../public/esumclogo.png";
import A from "../components/Anchor";

export default function ErrorPage() {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
      </Head>
      <div className="container">
        <div className="box">
          <Link href="https://esumc.org">
            <a>
              <Image src={esumcLogo} alt="ESUMC logo" />
            </a>
          </Link>
          <h1>404 | Page Not Found</h1>
          <p>
            The requested page could not be found. Click <A href="/">here</A> to
            go back.
          </p>
        </div>
      </div>
      <style jsx>{`
        .container {
          position: absolute;
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .box {
          max-width: 400px;
          text-align: center;
          padding: 10px;
        }
        h1 {
          font-family: ${theme.fonts.sans};
          text-transform: uppercase;
          margin-top: 2rem;
          color: ${theme.colors.darkGrey};
        }
        p {
          font-family: ${theme.fonts.serif};
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
}
