import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  h2 {
    display: flex;
    justify-content: center;
  }
`

export const Title = styled(Link)`
  font-size: 28px;
  margin-left: 10px;
  cursor: pointer;
`

export const Preview = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`