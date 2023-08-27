import styled from "styled-components";
import { mobile } from "../responsive";
import { WarningTwoTone } from "@material-ui/icons";
const Container = styled.div`
  height: 25px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return (
    <Container>
      <WarningTwoTone style={{ width: "18px", color: "yellow" }}>
        {" "}
      </WarningTwoTone>
      Lütfen e-postanıza gönderdiğimiz bağlantıyı kullanarak hesabınızı
      onaylayın
    </Container>
  );
};

export default Announcement;
