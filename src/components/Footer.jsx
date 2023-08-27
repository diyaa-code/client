import {
  Facebook,
  Instagram,
  Email,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import logg from "../image/Capture33Looka.PNG";
import { useState, useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  /* ${mobile({ display: "none" })} */
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;
const Nolink = styled.div`
  a {
    text-decoration: none;
    display: flex;
    color: wheat;
  }
`;

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
`;

const Image = styled.img`
  width: 300px;
`;
const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(
          `https://nice-plum-swallow-fez.cyclic.app/api/categories`
        );
        // const res = await axios.get(
        //   `https://taaclandapi.onrender.com/api/categories`
        // );
        setLoading(false);
        setCategories(res.data);
      } catch (err) {}
    };
    getCategory();
  }, []);

  return (
    <Container>
      <Left>
        {/* <Logo>TAACLAND.</Logo> */}
        <Image src={logg} />
        <Desc>
          Designer Satış noktalarımız 📍The Land of Legends 📍Marriott Hotel
          Boulevard ✂️Atölye Adres:Kadriye mah.Süleyman demirel cad. No9/3 iç
          kapı No:5 Belek/Antalya
        </Desc>
        <SocialContainer>
          {/* <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon> */}

          <SocialIcon color="E4405F">
            <Nolink>
              <a href="https://www.instagram.com/taacland/" target="_blank">
                <Instagram />
              </a>
            </Nolink>
          </SocialIcon>
          {/* <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon> */}
        </SocialContainer>
      </Left>
      <Center>
        <Title>Faydalı Linkler</Title>
        <List>
          <ListItem>
            <StyledLink to="/">Ana sayfa</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink
              to="/cart"
              // style={({ isActive }) => ({
              //   color: isActive ? "#fff" : "#545e6f",
              //   background: isActive ? "#7600dc" : "#f0f0f0",
              // })}
            >
              Alışveriş çantası
            </StyledLink>
          </ListItem>
          {categories.map((item, index) => (
            <ListItem key={index}>
              <StyledLink to={`/products/${item?.cat}`}>
                {item?.cat} kategorisi
              </StyledLink>
            </ListItem>
          ))}
          {/* <ListItem>
            <StyledLink to="/products/kid">Çocuk Moda</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/products/ring">Moda Aksesuarları</StyledLink>
          </ListItem> */}
          <ListItem>
            <StyledLink to="/abutus">Hakkımızda</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/contactus">Bize Ulaşın</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/login">Giriş yapmak</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/register">Bir hesap oluşturun </StyledLink>
          </ListItem>
        </List>
      </Center>
      <Right>
        <Title>İletişim</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 📍The Land of Legends
        </ContactItem>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> 📍Marriott Hotel Boulevard
        </ContactItem>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} /> Atölye Adres:Kadriye
          mah.Süleyman demirel cad. No9/3 iç kapı No:5 Belek/Antalya
        </ContactItem>
        {/* <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> Yurtdışı sipariş 0551 056 11
          56
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> Yurtiçi sipariş 0546 423 44
          12
        </ContactItem> */}
        <ContactItem>
          <Email style={{ marginRight: "10px" }} /> taacland63@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
