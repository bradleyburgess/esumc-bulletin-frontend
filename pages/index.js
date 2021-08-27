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
      <Container>
        <Box>
          <header>
            <ESUMCLogo />
            <Heading>ESUMC Online Bulletins</Heading>
          </header>
          <main style={{ width: "100%" }}>
            {locations.map((location) => (
              <Section key={location.name}>
                <SectionHeader>
                  <Logo location={location} />
                  <Name>{makeTitleCase(location.name)}</Name>
                </SectionHeader>
                <ButtonsContainer>
                  <Button href={`/${location.name}/latest`} primary>
                    Latest
                  </Button>
                  <Button href={`/${location.name}`}>Archive</Button>
                </ButtonsContainer>
              </Section>
            ))}
          </main>
        </Box>
      </Container>
    </>
  );
}

const Container = ({ children }) => (
  <div className="root">
    {children}
    <style jsx>{`
      .root {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>
);

const Box = ({ children }) => (
  <div className="root">
    {children}
    <style jsx>{`
      .root {
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
    `}</style>
  </div>
);

const Heading = ({ children }) => (
  <h1 className="root">
    {children}
    <style jsx>{`
      .root {
        margin-top: 1rem;
        font-size: 1.5em;
        font-family: ${theme.fonts.serif};
        text-align: center;
      }
    `}</style>
  </h1>
);

const Section = ({ children }) => (
  <section className="root">
    {children}
    <style jsx>{`
      .root {
        margin-top: 2rem;
      }
    `}</style>
  </section>
);

const SectionHeader = ({ children }) => (
  <div className="root">
    {children}
    <style jsx>{`
      .root {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  </div>
);

const Logo = ({ location }) => (
  <div className="root">
    <Image src={location.image.src} alt={location.image.alt} />
    <style jsx>{`
      .root {
        width: 50px;
      }
    `}</style>
  </div>
);

const Name = ({ children }) => (
  <h2 className="root">
    {children}
    <style jsx>{`
      .root {
        font-weight: normal;
        font-family: ${theme.fonts.sans};
        // font-size: 1.5em;
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
        padding-left: 0.8em;
        color: ${theme.colors.darkGrey};
      }
    `}</style>
  </h2>
);

const ButtonsContainer = ({ children }) => (
  <div className="root">
    {children}
    <style jsx>{`
      .root {
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-top: 1rem;
      }
    `}</style>
  </div>
);
