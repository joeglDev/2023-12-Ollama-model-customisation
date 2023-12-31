import styled from "styled-components";

export const Card = styled.div`
  margin: auto;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.25rem;
`;

export const ChatResponseCard = styled(Card)`
min-width: 80vw;
min-height: 25vh;
background-color: #48494B;
margin-bottom: 2rem;
padding: 1rem;
`;
