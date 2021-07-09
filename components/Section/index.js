import { theme } from "../../styles/global";

const Section = ({ children, greybox }) => {
  return (
    <>
      <section className={greybox ? "greybox" : null}>{children}</section>
      <style jsx>{`
        section {
          margin-top: 2.25rem;
          padding: 10px;
        }
        .greybox {
          background-color: ${theme.colors.veryLightGrey};
          padding: ${theme.sizes.boxPadding};
        }
      `}</style>
    </>
  );
};

export default Section;
