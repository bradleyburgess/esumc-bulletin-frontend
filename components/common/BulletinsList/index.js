import React from "react";
import { theme } from "../../../styles/global";
import Link from "next/link";
import { createDateString, createDateObject } from "../../../lib/dateUtils";

const BulletinsList = ({ bulletins, location }) => {
  return (
    <>
      <div className="container">
        <ul>
          {bulletins.map((bulletin) => {
            const date = createDateObject(bulletin.date);
            return (
              <li key={bulletin.uuid}>
                <Link href={`/${location}/${bulletin.uuid}`}>
                  <a>
                    <Date>{createDateString(date)}</Date>
                    <br />
                    <Calendar>{bulletin.liturgical_calendar}</Calendar>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        .container {
          text-align: left;
          padding: 1rem;
          display: flex;
          justify-content: center;
        }
        ul {
          list-style: none;
          max-width: 300px;
        }
        li {
          padding: 0.5rem;
        }
        a {
          text-decoration: none;
        }
      `}</style>
    </>
  );
};

const Date = ({ children }) => (
  <>
    <span className="text">{children}</span>
    <style jsx>{`
      .text {
        font-family: ${theme.fonts.sans};
        color: ${theme.colors.darkGrey};
        font-weight: bold;
        text-transform: uppercase;
      }
    `}</style>
  </>
);

const Calendar = ({ children }) => (
  <>
    <span className="text">{children}</span>
    <style jsx>{`
      .text {
        font-family: ${theme.fonts.serif};
        color: black;
      }
    `}</style>
  </>
);

export default BulletinsList;
