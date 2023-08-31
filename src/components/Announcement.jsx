import styled from "styled-components";
import { mobile } from "../responsive";
import { WarningTwoTone } from "@material-ui/icons";
import { userRequest } from "../requestMethods";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

const Resend = styled.span`
  cursor: pointer;
  border-bottom: solid;
  font-weight: 700;
`;

const Announcement = () => {
  const user = useSelector((state) => state?.user?.currentUser);
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    try {
      await userRequest.post(`/auth/resendverifyemail/${user._id}`);
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "E-posta hesabınıza bir onay mesajı gönderdik. Lütfen e-postanıza gidin ve hesabı onaylayın.",
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Bir şeyler yanlış gitti!",
        timer: 1500,
      });
      setLoading(false);
    }
  };
  return (
    <Container>
      <WarningTwoTone style={{ width: "18px", color: "yellow" }} />
      <span>
        Lütfen e-postanıza gönderdiğimiz bağlantıyı kullanarak hesabınızı
        onaylayın veya&nbsp;
        {loading ? (
          <CircularProgress size="14px" color="inherit" />
        ) : (
          <Resend onClick={handleClick}> yeniden gönder</Resend>
        )}
      </span>
    </Container>
  );
};

export default Announcement;
