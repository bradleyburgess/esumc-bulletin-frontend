import { theme } from "../../styles/global";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  border-color: ${theme.colors.lightGrey};
`;

const Spinner = () => (
  <BeatLoader css={override} color={theme.colors.lightGrey} size={20} />
);

export default Spinner;

