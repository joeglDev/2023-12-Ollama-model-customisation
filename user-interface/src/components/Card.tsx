import styled from "styled-components";

export const Card = styled.div`
  margin: 2rem 0 2rem 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ChatResponseCard = styled(Card)`
padding: 1rem;
width: 80vw;
min-height: 25vh;
background-color: #48494B;
`;
