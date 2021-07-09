import Image from "next/image";
import Link from "next/link";
import esumcLogo from "../../public/esumclogo.png";

const ESUMCLogo = () => (
  <>
    <Link href="https://esumc.org" passHref>
      <div className="container">
        <Image src={esumcLogo} alt="ESUMC logo" />
      </div>
    </Link>
    <style jsx>{`
      .container {
        max-width: 300px;
        cursor: pointer;
      }
    `}</style>
  </>
);

export default ESUMCLogo;
