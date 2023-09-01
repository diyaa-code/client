import {
  Add,
  Remove,
  LocalMallOutlined,
  Close as CloseBotton,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import imga from "../image/logoTaac.PNG";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";

import { Link, useNavigate } from "react-router-dom";
import { deleteProduct } from "../redux/apiCalls";
import Newsletter from "../components/Newsletter";
import Swal from "sweetalert2";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;

  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  border: 0.5px solid lightgray;

  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", position: "relative " })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  @media (max-width: 350px) {
    flex-wrap: wrap;
  }
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;

  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;
const ProductColorSpan = styled.span`
  display: flex;
`;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 45vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const NoUser = styled.h1`
  font-weight: 200;
  text-align: center;
  margin: 100px auto;
  font-size: 25px;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const CloseBott = styled(CloseBotton)`
  cursor: pointer;

  ${mobile({ position: " absolute", left: "92%" })}
`;
const ButtonLogin = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #025b5b;
  }
`;

const Error = styled.span`
  color: red;
  font-weight: 500;
  font-size: 15px;
`;
const Cart = () => {
  const KEY = process.env.REACT_APP_PUB_KEY_STRIPE;

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  const history = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const { products } = useSelector((state) => state.cart);

  const [arrProducts, setArrProducts] = useState([]);

  let userId = "";
  if (user) {
    userId = user._id;
  }

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });

        const res2 = await userRequest.post("/orders", {
          userId: userId,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
            size: item.size,
          })),
          amount: cart.total,
          address: res.data.billing_details.address,
        });

        history("/success", { state: res2.data._id });
      } catch {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bir şeyler yanlış gitti!",
        });
      }
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, history]);

  return (
    <Container>
      <Navbar />
      {user && !user.isVerified && <Announcement />}
      <Wrapper>
        <Title>SENİN ÇANTAN</Title>
        <Error
          style={{ position: "absolute", left: "auto", right: "0%" }}
          id="loginErr"
        ></Error>
        <Top>
          <TopButton
            onClick={() => {
              history("/home");
            }}
          >
            ALIŞVERİŞE DEVAM
          </TopButton>
          <TopTexts>
            <TopText>Alışveriş çantası({products.length})</TopText>
          </TopTexts>{" "}
          {user ? (
            <>
              {products.length ? (
                <StripeCheckout
                  name="TAACLAND"
                  image={imga}
                  billingAddress
                  shippingAddress
                  description={`toplamınız ${cart.total + 10} TL`}
                  amount={(cart.total + 10) * 100}
                  currency="TRY"
                  token={onToken}
                  stripeKey={KEY}
                >
                  <Button>ŞİMDİ ÖDEME YAP</Button>
                </StripeCheckout>
              ) : (
                <></>
              )}
            </>
          ) : (
            <div>
              {products.length > 0 ? (
                <Button
                  onClick={() => {
                    document.getElementById(
                      "loginErr"
                    ).innerHTML = `Bu işlemi tamamlamak için <a href="/login">buradan</a> giriş yapmalısınız.
                    
                  `;
                    Swal.fire({
                      title:
                        "Satın alma işlemini tamamlamak için giriş yapmalısınız.",
                      text: "Giriş yapmak düğmesine tıklayın.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "giriş yapmak",
                      cancelButtonText: "iptal etmek",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        history("/login");
                      }
                    });
                  }}
                >
                  ŞİMDİ ÖDEME YAP
                </Button>
              ) : null}
            </div>
          )}
        </Top>

        {products.length ? (
          <Bottom>
            <Info>
              {products.map((product, index) => (
                <Product key={index}>
                  <ProductDetail>
                    <Image src={product.imgs[0].img} />
                    <Details>
                      <ProductName>
                        <b>Ürün: </b> {product.title}
                      </ProductName>

                      <ProductColorSpan>
                        <b>Renk: </b> <ProductColor color={product.color} />
                      </ProductColorSpan>
                      <ProductSize>
                        <b>Beden: </b>

                        {product.size ? product.size : <p>seçmedin</p>}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>
                      {product.price * product.quantity} TL
                    </ProductPrice>
                  </PriceDetail>

                  <CloseBott onClick={() => deleteProduct(product, dispatch)} />
                </Product>
              ))}
              <Hr />
            </Info>

            <Summary>
              <SummaryTitle>SİPARİŞ ÖZETİ</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Ara toplam</SummaryItemText>
                <SummaryItemPrice>{cart.total} TL</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>10 TL</SummaryItemPrice>
              </SummaryItem>
              {/* <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem> */}
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>{cart.total + 10} TL</SummaryItemPrice>
              </SummaryItem>
              {user ? (
                <>
                  {products.length ? (
                    <StripeCheckout
                      name="TAACLAND"
                      image={imga}
                      billingAddress
                      shippingAddress
                      description={`toplamınız ${cart.total + 10} TL`}
                      amount={(cart.total + 10) * 100}
                      currency="TRY"
                      token={onToken}
                      stripeKey={KEY}
                    >
                      <Button>ŞİMDİ ÖDEME YAP</Button>
                    </StripeCheckout>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <Button
                  onClick={() => {
                    document.getElementById(
                      "loginErr2"
                    ).innerHTML = `Bu işlemi tamamlamak için <a href="/login">buradan</a> giriş yapmalısınız.
                    
                  `;
                    Swal.fire({
                      title:
                        "Satın alma işlemini tamamlamak için giriş yapmalısınız.",
                      text: "Giriş yapmak düğmesine tıklayın.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "giriş yapmak",
                      cancelButtonText: "iptal etmek",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        history("/login");
                      }
                    });
                  }}
                >
                  ŞİMDİ ÖDEME YAP
                </Button>
              )}
              <Error id="loginErr2"></Error>
            </Summary>
          </Bottom>
        ) : (
          <>
            <NoUser>
              <LocalMallOutlined></LocalMallOutlined>
              <div>çantan boş</div>
              {!user && (
                <>
                  <div>giriş yapmak ve alışverişe başlayın!</div>
                  <ButtonLogin onClick={() => history("/login")}>
                    giriş yapmak
                  </ButtonLogin>
                </>
              )}
            </NoUser>
          </>
        )}
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Cart;
