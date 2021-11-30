import styled from "styled-components"

export const FlexRowCenter = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: center;
`

export const TwoColumns = styled.div`
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    height: 70vh;
`

export const ImageFullCover = styled.img`
    flex: 1;
    height: 100%;
    width: 100%;
    object-fit: cover;
`

export const ImageHalfCover = styled.img`
  flex: 1;
  height: 100%;
  width: 50vw;
  object-fit: cover;
`;
