import { theme } from "../../../styles/global";

const HR = () => (
  <>
    <hr />
    <style jsx>{`
      hr {
        width: calc(100% - 40px);
        border: 0;
        border-radius: 1px;
        height: 2px;
        background-color: ${theme.colors.teal};
        margin: 2rem auto;
      }
    `}</style>
  </>
);

export default HR;
