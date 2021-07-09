import { theme } from "../../styles/global";
import Section from "../../components/Section";
import Heading from "../../components/Heading";
import SubHeading from "../../components/SubHeading";
import { getFinanceStrings } from "../../lib/financesUtils";

const padding = "7px";

const SectionLabel = ({ children }) => (
  <>
    <div className="container">
      <h3 className="text">{children}</h3>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: ${theme.fonts.sans};
        font-size: 1.125rem;
        background-color: ${theme.colors.lightGrey};
        color: #fff;
        text-transform: uppercase;
        text-align: center;
        padding: ${padding};
      }
    `}</style>
  </>
);

const StatLabel = ({ children }) => (
  <>
    <div className="container">
      <h4 className="text">{children}</h4>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: ${theme.fonts.sans};
        font-weight: bold;
        font-size: 1.125rem;
        color: ${theme.colors.darkGrey};
        text-transform: uppercase;
        padding: ${padding};
        // border: 1px solid white;
        @media screen and (min-width: 440px) {
          grid-row: 1;
        }
      }
    `}</style>
  </>
);

const Stat = ({ children }) => (
  <>
    <div className="container">
      <p className="text">{children}</p>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: ${padding};
        // border: 1px solid white;
      }
    `}</style>
  </>
);

const Finances = ({ finances: _finances }) => {
  const finances = getFinanceStrings(_finances);
  return (
    <>
      <Section greybox>
        <Heading>Tithes & Offerings</Heading>
        <SubHeading>Thank you for your ongoing gifts</SubHeading>
        <div className="finances">
          <SectionLabel>Actual</SectionLabel>
          <div className="table">
            <StatLabel>Week of {finances.week_of}</StatLabel>
            <Stat>{finances.weekly_donation}</Stat>
            <StatLabel>Year to date total</StatLabel>
            <Stat>{finances.ytd_total}</Stat>
          </div>
          <SectionLabel>Goal</SectionLabel>
          <div className="table">
            <StatLabel>{new Date().getFullYear()} Total Goal</StatLabel>
            <Stat>{finances.yearly_goal}</Stat>
            <StatLabel>YTD % of {new Date().getFullYear()} goal</StatLabel>
            <Stat>{finances.ytd_percent}</Stat>
          </div>
        </div>
      </Section>
      <style jsx>{`
        .finances {
          margin-top: 0.55rem;
          text-align: center;
        }

        .table {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 7px;
          @media screen and (max-width: 440px) {
            grid-template-columns: repeat(1, 1fr);
          }
        }

        //.finances {
        //  display: grid;
        //  grid-template-columns: repeat(2, 1fr);
        //  gap: 7px;

        //  @media screen and (max-width: 440px) {
        //    grid-template-columns: repeat(1, 1fr);
        //    //grid-auto-flow: column;
        //    //grid-template-rows: repeat(2, 1fr);
        //  }
        //}

        //.finances__label-container {
        //  grid-column: 1 / span 2;
        //  @media screen and (max-width: 440px) {
        //    grid-column: 1;
        //  }
        //  display: flex;
        //  align-items: center;
        //  justify-content: center;
        //  background-color: ${theme.colors.darkGrey};
        //  text-align: center;
        //  height: 2em;
        //}

        //.finances__label-text {
        //  display: block;
        //  font-family: proxima-nova;
        //  color: white;
        //}

        //.finances__stat {
        //  border: 2px solid white;
        //}

        //.finances__cell {
        //  padding: 7px;
        //  text-align: center;
        //}

        //.finances__data {
        //  font-family: adobe-caslon-pro;
        //}

        //.finances__descr {
        //  font-family: proxima-nova;
        //  border-bottom: 2px solid white;
        //  //height: 2em;
        //}
      `}</style>
    </>
  );
};

export default Finances;
