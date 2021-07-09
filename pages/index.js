import { theme } from "../styles/global";
import Head from "next/head";
import Image from "next/image";
import roseWindow from "../public/rosette.png";
import Button from "../components/Button";
import ESUMCLogo from "../components/ESUMCLogo";

export default function Home() {
  return (
    <>
      <Head>
        <title>ESUMC Online Bulletin</title>
      </Head>
      <div className="container">
        <div className="box">
          <header>
            <ESUMCLogo />
            <h1 style={{ marginTop: "1rem" }}>ESUMC Online Bulletins</h1>
          </header>
          <main>
            <section style={{ marginTop: "2rem" }}>
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
                <Button href="/sanctuary" disabled>
                  Archive
                </Button>
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

          h1 {
            font-size: 1.5em;
            font-family: ${theme.fonts.serif};
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
            font-family: ${theme.fonts.sans};
            // font-size: 1.5em;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            padding-left: 0.8em;
            color: ${theme.colors.darkGrey};
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
