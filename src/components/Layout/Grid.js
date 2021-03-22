import styled from "styled-components";

const MAX_SIZE = 400;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${MAX_SIZE}px, 1fr));
  grid-gap: 16px;
  margin: 16px;

  @media (max-width: ${MAX_SIZE + 32}px) {
    grid-template-columns: 1fr;
  }
`;

export default Grid;
