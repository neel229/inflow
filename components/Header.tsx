import {
  Container,
  SubTitleContainer,
  TextContainer,
  TitleContainer,
  VideoContainer,
} from "./styled/Header.styled";

const Header = () => {
  return (
    <Container>
      <TextContainer>
        <TitleContainer>
          <h1>Inflow</h1>
        </TitleContainer>
        <SubTitleContainer>
          <p>
            Introducing a new decentralized way of <br />
            learning and teaching.
          </p>
        </SubTitleContainer>
      </TextContainer>
      <VideoContainer>
        <p>Video explaining inflow will play here</p>
      </VideoContainer>
    </Container>
  );
};

export default Header;
