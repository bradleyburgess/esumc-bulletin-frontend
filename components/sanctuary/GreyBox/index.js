import { theme } from "../../styles/global";

const GreyBox = ({ children }) => (
  <>
    <section className="greybox">{children}</section>
    <style jsx>{`
      .greybox {
        background-color: ${theme.colors.veryLightGrey};
        padding: ${theme.sizes.boxPadding};
      }
    `}</style>
  </>
);

export default GreyBox;
