import Image from "next/image";
import Link from "next/link";
import esumcLogo from "../../public/esumclogo.png";

const sizes = {
  sm: "150px",
  md: "225px",
  lg: "300px",
};

const ESUMCLogo = ({ size, href }) => (
  <>
    <Link href={href || "https://esumc.org"}>
      <a>
        <div className="container">
          <Image src={esumcLogo} alt="ESUMC logo" />
        </div>
      </a>
    </Link>
    <style jsx>{`
      .container {
        max-width: ${sizes[size] || "300px"};
        cursor: pointer;
      }
    `}</style>
  </>
);

export default ESUMCLogo;
