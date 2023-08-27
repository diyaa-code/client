import { useEffect, useState } from "react";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import jwt_decode from "jwt-decode";

import { Link as LinkA, useLocation } from "react-router-dom";

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
  // background-color: white;
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

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background-color: #004848;
  }
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const LinkTo = styled(LinkA)`
  margin: 5px 0px;
  font-size: 12px;
  color: black;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT;
  const location = useLocation();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  // function handleCredentialResponse(respons) {
  //   let userObject = jwt_decode(respons.credential);
  //   //console.log("respons", userObject);
  //   let userNameGoogle = userObject.name;
  //   let emailGoogle = userObject.email;
  //   let passwordGoogle = "1234";
  //   register(dispatch, {
  //     username: userNameGoogle,
  //     email: emailGoogle,
  //     password: passwordGoogle,
  //   });
  //   // console.log(emailGoogle);
  //   login(dispatch, { username: userNameGoogle, password: passwordGoogle });
  // }
  // useEffect(() => {
  //   // const google = window.google;
  //   google.accounts.id.initialize({
  //     client_id: CLIENT_ID,
  //     callback: handleCredentialResponse,
  //   });
  //   google.accounts.id.renderButton(document.getElementById("szignInDiv"), {
  //     theme: "outline",
  //     size: "large",
  //   });
  //   // google.accounts.id.prompt();
  // }, []);
  return (
    <Container>
      <Navbar />
      <ComponentDiv>
        <Wrapper>
          <Title>GİRİŞ YAPMAK</Title>
          <Form>
            <label>Kullanıcı adı: </label>
            <Input
              required
              placeholder="Kullanıcı adı"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>şifre: </label>
            <Input
              required
              placeholder="şifre"
              type="password"
              // value={location.state.password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            {error && <Error>Kullanıcı ismi veya parola yanlış...</Error>}
            {/* <LinkTo>DO NOT YOU REMEMBER THE PASSWORD?</LinkTo> */}
            <LinkTo to="/register">YENİ BİR HESAP OLUŞTUR</LinkTo>
          </Form>
          <div id="szignInDiv"></div>
        </Wrapper>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Login;
