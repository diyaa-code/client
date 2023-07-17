import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { register } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import validator from "validator";

const Container = styled.div``;
const ComponentDiv = styled.div`
  width: 100vw;
  height: 80vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    // url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
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
  font-size: 24px;
  font-weight: 300;
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
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error, errData } = useSelector((state) => state.register);
  // console.log("errData", errData);
  // const location = useLocation();
  const regexPattern = /^[a-zA-Z0-9]\w{3,25}$/;
  const handleClick = (e) => {
    e.preventDefault();

    if (!username) {
      document.getElementById("nameErr").innerHTML = "Enter your username...";
    } else if (!email) {
      document.getElementById("emailErr").innerHTML = "Enter your email...";
    } else if (!password) {
      document.getElementById("passwordErr").innerHTML =
        "Enter your password...";
    } else if (!regexPattern.test(username)) {
      document.getElementById("nameErr").innerHTML =
        "Username must be between 3 and 25 characters....";
    } else if (!validator.isEmail(email)) {
      document.getElementById("emailErrValid").innerHTML =
        "Please, enter valid Email...";
    } else {
      register(dispatch, { username, email, password });
    }
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <ComponentDiv>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            {(!username || !regexPattern.test(username)) && (
              <Error id="nameErr"></Error>
            )}
            <Input
              placeholder="email"
              // value={location.state ? location.state.email : ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!email && <Error id="emailErr"></Error>}
            {!validator.isEmail(email) && <Error id="emailErrValid"></Error>}
            <Input
              //type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {!password && <Error id="passwordErr"></Error>}
            <Input type="password" placeholder="confirm password" />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleClick} disabled={isFetching}>
              CREATE
            </Button>
            {error && (
              <Error>
                {" "}
                {errData.username || errData.email} already exists ...
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
