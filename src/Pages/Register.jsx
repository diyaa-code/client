import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { login, register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import validator from "validator";

const Container = styled.div``;
const ComponentDiv = styled.div`
  width: 100vw;
  height: 80vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    center;
  background-color: #f5fafd;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 70vh;
  padding: 20px;

  //background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #004848;
  }
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  color: red;
`;
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, errData } = useSelector((state) => state.register);
  // console.log("errData", errData);
  // const location = useLocation();
  const navigate = useNavigate();
  const regexPattern = /^[a-zA-Z0-9_]\w{3,25}$/;
  const handleClick = (e) => {
    e.preventDefault();

    if (!username) {
      document.getElementById("nameErr").innerHTML =
        "Kullanıcı adınızı giriniz...";
    } else if (!email) {
      document.getElementById("emailErr").innerHTML = "E-postanızı giriniz...";
    } else if (!password) {
      document.getElementById("passwordErr").innerHTML = "Şifrenizi girin...";
    } else if (!regexPattern.test(username)) {
      document.getElementById("nameErr").innerHTML =
        "Kullanıcı adı 3 ila 25 karakter arasında olmalıdır....";
    } else if (!validator.isEmail(email)) {
      document.getElementById("emailErrValid").innerHTML =
        "Lütfen geçerli bir e-posta girin...";
    } else if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      })
    ) {
      document.getElementById("passwordErr").innerHTML =
        "Passwords must be eight characters long, and include at least one number...";
    } else if (!(passwordConf === password)) {
      document.getElementById("passwordErrConfirm").innerHTML =
        "Parola eşleşmiyor ...";
    } else {
      // navigate(
      //   "/login"
      //   // , { state: { username, email, password } }
      // );
      register(dispatch, { username, email, password });

      //  &&login(dispatch, { username, password });
    }
  };

  return (
    <Container>
      <Navbar />
      <ComponentDiv>
        <Wrapper>
          <Title>BİR HESAP OLUŞTURUN</Title>
          <Form>
            <label>kullanıcı adı:</label>
            <Input
              placeholder="kullanıcı adı"
              onChange={(e) => setUsername(e.target.value)}
            />
            {(!username || !regexPattern.test(username)) && (
              <Error id="nameErr"></Error>
            )}
            <label>e-posta:</label>
            <Input
              placeholder="e-posta"
              // value={location.state ? location.state.email : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!email && <Error id="emailErr"></Error>}
            {!validator.isEmail(email) && <Error id="emailErrValid"></Error>}
            <label>şifre:</label>
            <Input
              type="password"
              placeholder="şifre"
              onChange={(e) => setPassword(e.target.value)}
            />

            {(!password ||
              !validator.isStrongPassword(password, {
                minLength: 8,
                minLowercase: 0,
                minUppercase: 0,
                minNumbers: 1,
                minSymbols: 0,
              })) && <Error id="passwordErr"></Error>}
            <label>Şifreyi Onayla</label>
            <Input
              type="password"
              placeholder="Şifreyi Onayla"
              onChange={(e) => setPasswordConf(e.target.value)}
            />
            {!(passwordConf === password) && (
              <Error id="passwordErrConfirm"></Error>
            )}
            <Agreement>
              Bir hesap oluşturarak kişisel verilerimin işlenmesine izin
              veriyorum verilere uygun olarak <b>GİZLİLİK POLİTİKASI</b>
            </Agreement>
            <Button onClick={handleClick} disabled={isFetching}>
              YARATMAK
            </Button>
            {error && (
              <Error>
                {" "}
                {/* {errData?.username || errData?.email} already exists ... */}
                Bu bilgi zaten mevcut.<br></br>
                Yeni bir hesap oluşturmak istiyorsanız bu bilgiyi değiştirin
              </Error>
            )}
          </Form>
        </Wrapper>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Register;
