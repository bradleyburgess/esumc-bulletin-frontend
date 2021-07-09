import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import esumcLogo from "../public/esumclogo.png";
import roseWindow from "../public/rosette.png";
import Button from "../components/Button";

export default function Home() {
  return (
    <>
      <Head>
        <title>ESUMC Online Bulletin</title>
      </Head>
      <div className="container">
        <div className="box">
          <header>
            <Link href="https://esumc.org" passHref>
              <div className="esumcLogo">
                <Image src={esumcLogo} alt="ESUMC logo" />
              </div>
            </Link>
            <h1>ESUMC Online Bulletins</h1>
          </header>
          <main>
            <section>
              <div className="sectionHeader">
                <div className="sectionLogo">
                  <Image src={roseWindow} alt="Rose Window" />
                </div>
                <h2>Sanctuary</h2>
              </div>
              <div className="buttons">
                <Button href="/sanctuary/latest" primary>
                  Latest
                </Button>
                <Button href="/sanctuary">Archive</Button>
              </div>
            </section>
          </main>
        </div>
      </div>

      <style jsx>
        {`
          .container {
            height: 100vh;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .box {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 1rem;
            margin: 0 1rem;
            border: 1px solid #ccc;
            border-radius: 7px;
            -webkit-box-shadow: 6px 5px 15px -4px rgba(113, 113, 113, 0.63);
            box-shadow: 6px 5px 15px -4px rgba(113, 113, 113, 0.63);
          }
          .esumcLogo {
            max-width: 300px;
            cursor: pointer;
          }

          h1 {
            font-size: 1.5em;
            font-family: "adobe-caslon-pro";
            text-align: center;
          }
          main {
            width: 100%;
          }
          // section {
          //   display: flex;
          // }
          .sectionHeader {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .sectionHeader h2 {
            font-weight: normal;
            font-family: adobe-caslon-pro;
            // font-size: 1.5em;
            text-transform: uppercase;
            text-align: center;
            padding-left: 0.8em;
          }
          .sectionLogo {
            width: 50px;
          }
          .buttons {
            width: 100%;
            display: flex;
            justify-content: space-around;
            margin-top: 1rem;
          }
        `}
      </style>
    </>
  );
}
