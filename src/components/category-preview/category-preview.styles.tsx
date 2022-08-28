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
  font-size: 38px;
  margin-bottom: 1rem;
  text-align: center;
  cursor: pointer;
`

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  margin-bottom: 2rem;

  @media screen and (max-width: 800px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`