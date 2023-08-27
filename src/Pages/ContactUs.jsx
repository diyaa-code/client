import { useEffect, useState } from "react";
import styled from "styled-components";

import { mobile } from "../responsive";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";

import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Swal from "sweetalert2";
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

const Form = {
  display: "flex",
  flexDirection: "column",
};

const Input = {
  flex: "1",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
};

const Button = {
  width: "40%",
  border: "none",
  padding: "15px 20px",
  backgroundColor: "teal",
  color: "white",
  cursor: "pointer",
  marginBottom: "10px",
};

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const ContactUs = () => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_65ed8dd",
        "template_g9pv63s",
        form.current,
        "Part4zi-OT2Jh0TKt"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Mesajınız başarıyla gönderildi",
      showConfirmButton: false,
      timer: 1500,
    });
    e.target.reset();
  };

  return (
    <Container>
      <Navbar />
      <ComponentDiv>
        <Wrapper>
          <Title>Bize Bağlanın</Title>
          <div style={{ margin: "20px 0px " }}>
            Merhaba diyelim! Siparişinizle ilgili herhangi bir sorunuz veya
            sorunuz varsa, ürünlerimizle veya web sitemizle ilgili geri
            bildirimleriniz varsa... ya da sadece Merhaba 👋 demek istiyorsanız,
            lütfen iletişime geçin. Sizden duymak isteriz!
          </div>
          <div>
            <form style={Form} ref={form} onSubmit={sendEmail}>
              <div>
                <label>Kullanıcı Adı :</label>
                <input
                  style={Input}
                  type="text"
                  name="from_name"
                  placeholder="İsmi"
                  required
                />
              </div>
              <label>E-posta adresi :</label>
              <div>
                <input
                  style={Input}
                  type="email"
                  name="user_email"
                  placeholder="E-posta adresi"
                  required
                />
              </div>
              <label>Mesajı: </label>
              <div>
                <textarea style={Input} name="message" required />
              </div>

              <input
                onMouseOver={() =>
                  (document.getElementById("gfg").style.backgroundColor =
                    "#004848")
                }
                onMouseOut={() =>
                  (document.getElementById("gfg").style.backgroundColor =
                    "teal")
                }
                id="gfg"
                style={Button}
                type="submit"
                value="Gönder"
              />
            </form>
          </div>
        </Wrapper>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ContactUs;
