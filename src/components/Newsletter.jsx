import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import validator from "validator";
const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  padding: 2%;
  text-align: center;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  text-align: center;
  padding: 0px 15% 0px 15%;
  ${mobile({ textAlign: "center" })}
`;
const Subs = styled.div`
  font-size: 18px;
  /* font-weight: 300; */
  text-align: center;
  margin: 0px 20% 3% 20%;
  ${mobile({ margin: "0px 8% 2% 8%" })}
`;

const SubsThanks = styled.div`
  font-size: 18px;
  text-align: center;

  color: green;
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;
const Newsletter = () => {
  const form = useRef();
  const [subscrib, setSubscrib] = useState(true);
  const history = useNavigate();
  const [newstEmail, setNewstEmail] = useState("");
  // const sendEmail = (e) => {
  //   e.preventDefault();

  //   emailjs
  //     .sendForm(
  //       "service_65ed8dd",
  //       "template_9245ciz",
  //       form.current,
  //       "Part4zi-OT2Jh0TKt"
  //     )
  //     .then(
  //       (result) => {
  //         console.log(result.text);
  //       },
  //       (error) => {
  //         console.log(error.text);
  //       }
  //     );
  //   e.target.reset();
  // };
  const sendEmail = (e) => {
    e.preventDefault();

    if (!validator.isEmail(newstEmail)) {
      document.getElementById("emailErrValid").innerHTML =
        "Lütfen geçerli e-postayı girin...";
    } else {
      setSubscrib(false);
      document.getElementById("emailValid").innerHTML =
        "Abonelik için teşekkürler! Yakında iletişime geçeceğiz.";
    }
  };
  return (
    <Container>
      <Title>Bilgilerimize abone olun</Title>
      {/* <Desc>Get timely updates from your favorite products.</Desc> */}
      {/* <Desc>SIGN UP TO OUR NEWSLETTER</Desc> */}

      <Subs>
        Yeni tanıtımlarımız, düğün bloglarımız ve tekliflerimizle güncel kalmak
        ister misiniz? İletişimde kalmak için e-postanızı buraya yazın!
      </Subs>

      {subscrib && (
        <>
          <InputContainer>
            <Input
              placeholder="E-postanız"
              onChange={(e) => setNewstEmail(e.target.value)}
            />
            <Button
              onClick={
                //history("/register", { state: { email: newstEmail } });
                sendEmail
              }
            >
              <Send />
            </Button>
          </InputContainer>
          <Error id="emailErrValid"></Error>
        </>
      )}
      <SubsThanks id="emailValid"></SubsThanks>

      {/* <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form> */}
    </Container>
  );
};

export default Newsletter;
