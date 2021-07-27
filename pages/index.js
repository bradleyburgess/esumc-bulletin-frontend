import { theme } from "../styles/global";
import Head from "next/head";
import Image from "next/image";
import roseWindow from "../public/rosette.png";
import gatheringLogo from "../public/gatheringlogo_mark.png";
import Button from "../components/common/Button";
import ESUMCLogo from "../components/common/ESUMCLogo";
import { makeTitleCase } from "../lib/stringUtils";

const locations = [
  {
    image: {
      src: roseWindow,
      alt: "Rose Window",
    },
    name: "sanctuary",
  },
  {
    image: {
      src: gatheringLogo,
      alt: "Gathering Logo",
    },
    name: "gathering",
  },
];

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
            {locations.map((location) => (
              <section style={{ marginTop: "2rem" }} key={location.name}>
                <div className="sectionHeader">
                  <div className="sectionLogo">
                    <Image src={location.image.src} alt={location.image.alt} />
                  </div>
                  <h2>{makeTitleCase(location.name)}</h2>
                </div>
                <div className="buttons">
                  <Button href={`/${location.name}/latest`} primary>
                    Latest
                  </Button>
                  <Button href={`/${location.name}`}>Archive</Button>
                </div>
              </section>
            ))}
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
