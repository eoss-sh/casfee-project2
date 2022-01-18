import styled from "styled-components";

interface TwoColumnProps {
  small?: boolean;
}

export const FlexRowCenter = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
`;

export const TwoColumns = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  height: ${(props: TwoColumnProps) => (props.small ? "30vh" : "70vh")};
`;

export const HalfWidthColumn = styled.section`
  display: flex;
  justify-content: flex-start;
  width: 50%;
`;

export const ImageFullCover = styled.img`
  flex: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

export const ImageHalfCover = styled.img`
  flex: 1;
  height: 100%;
  width: 50vw;
  object-fit: cover;
`;
