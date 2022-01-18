import styled from "styled-components";

interface ErrorTextProps {
  errorString?: boolean;
}

export const SmallText = styled.small`
  margin-top: 1rem;
  color: ${(props: ErrorTextProps) =>
    props.errorString ? "var(--error)" : "var(--dark-grey)"};
`;
export const Header2 = styled.h2`
  font-size: 2rem;
  color: var(--dark-grey);
  margin-bottom: 1rem;
`;

export const ParagraphCenter = styled.p`
  text-align: center;
  color: var(--dark-grey);
`;
