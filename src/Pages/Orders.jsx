import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { userRequest } from "../requestMethods";
import { CircularProgress } from "@material-ui/core";
import { LocalMallOutlined, Close } from "@material-ui/icons";
// import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Container = styled.div``;
const ComponentDiv = styled.div`
  width: 100%;
  /* height: 100%; */
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    center;
  background-color: #f5fafd;
  background-size: cover;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  position: relative;
`;
const LodingIcon = styled.div`
  margin: 100px 50%;
`;
const Title = styled.h1`
  text-align: center;
  /* font-size: 30px; */
  font-weight: 600;
  margin: 15px auto;
`;
const TitleOrders = styled.div`
  padding: 10px;
  margin: auto;
  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

const TableOrders = styled.div`
  padding: 0px 20px 20px 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: auto 20px;
  display: flex;
  flex-direction: column;
  position: relative;
  /* width: 250px; */
`;
const TableOrdersInfo = styled.div`
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: auto 20px;
  @media (max-width: 400px) {
    font-size: 12px;
    margin: auto 0px;
  }
`;
const TableOrdersProduct = styled.div`
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  margin: auto 20px;
  @media (max-width: 400px) {
    font-size: 12px;
    margin: auto 0px;
  }
`;
// const DeletOrder = styled.span`
//   display: flex;
//   position: absolute;
//   right: 0%;
// `;
const OrderTopRightImg = styled.div`
  flex: 2;
  display: flex;
`;
const ProductImg = styled.img`
  width: 70px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const OrderId = styled.span`
  @media (max-width: 400px) {
    font-size: 10px;
  }
`;
const Orders = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      try {
        // const res = await axios.get(
        //   `http://localhost:5000/api/orders/find/${user._id}`
        // );
        const res = await userRequest.get(
          `https://nice-plum-swallow-fez.cyclic.app/api/orders/find/${user._id}`
        );
        setLoading(false);
        setOrders(res.data);
      } catch (err) {
        setLoading(false);
      }
    };
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://nice-plum-swallow-fez.cyclic.app/api/products"
          //   ?  `http://localhost:5000/api/products/?category=${cat}`
          // : `http://localhost:5000/api/products?new=true`
        );
        setLoading(false);
        setProducts(res.data);
      } catch (err) {
        setLoading(false);
      }
    };
    getProducts();
    getOrders();
  }, []);

  //   const deleteOrder = (id) => {
  //     Swal.fire({
  //       title: "Are you sure to delete this order?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then(async (result) => {
  //       if (result.isConfirmed) {
  //         try {
  //           const res = await userRequest.delete(`/orders/${id}`);
  //           Swal.fire({
  //             position: "center",
  //             icon: "success",
  //             title: "the order has been deleted.",
  //             timer: 1500,
  //           });
  //         } catch (err) {
  //           Swal.fire({
  //             icon: "error",
  //             title: "Oops...",
  //             text: "Something went wrong!",
  //           });
  //         }
  //       }
  //     });
  //   };
  orders?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <Container>
      <Navbar />

      <ComponentDiv>
        {loading ? (
          <LodingIcon>
            <CircularProgress size="100px" color="inherit" />
          </LodingIcon>
        ) : (
          <>
            <Title>Emirler</Title>
            {orders.length > 0 ? (
              <div>
                {orders?.map((order, index) => (
                  <TableOrders key={index} style={{ marginBottom: "20px" }}>
                    {/* <DeletOrder>
                        <Close
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteOrder(order._id)}
                        />
                      </DeletOrder> */}
                    <TitleOrders>
                      <div>
                        <span>
                          <b>Emir </b> {index + 1}
                        </span>
                      </div>
                      <div>
                        <span>
                          <b>Tarih </b> {order?.updatedAt}
                        </span>
                      </div>
                      <div>
                        <span>
                          <b>
                            {" "}
                            {order?.delivery
                              ? "Ürün siparişi kargoya verildi"
                              : "Ürün siparişi henüz gönderilmedi"}
                          </b>
                        </span>
                      </div>
                    </TitleOrders>
                    <TableOrdersInfo>
                      <div className="orderInfoBottom">
                        <div>
                          <span>
                            <b>Emir id:</b> <OrderId>{order?._id}</OrderId>
                          </span>
                        </div>

                        <div>
                          <span>
                            <b>fiyat:</b> {order?.amount}TL
                          </span>
                        </div>
                        <div>
                          <span>
                            <b>şehir: </b>
                            {order?.address?.city}
                          </span>
                        </div>
                        <div>
                          <span>
                            <b>ülke: </b>
                            {order?.address?.country}
                          </span>
                        </div>
                        <div>
                          <span>
                            <b>satır 1: </b>
                            {order?.address?.line1}
                          </span>
                        </div>
                        {order?.address?.line2 && (
                          <div>
                            <span>
                              <b>satır 2: </b>
                              {order?.address?.line2}
                            </span>
                          </div>
                        )}
                        <div>
                          <span>
                            <b>Posta Kodu: </b>
                            {order?.address?.postal_code}
                          </span>
                        </div>
                      </div>
                    </TableOrdersInfo>{" "}
                    {order?.products?.map((item) => (
                      <TableOrdersProduct key={item?._id}>
                        <OrderTopRightImg item={item} key={item?._id}>
                          {products?.map((item2) => (
                            <span key={item2?._id}>
                              {item2?._id === item?.productId && (
                                <Link to={`/product/${item2?._id}`}>
                                  <ProductImg src={item2?.imgs[0]?.img} />
                                </Link>
                              )}
                            </span>
                          ))}
                          <Details>
                            <span>
                              <b>Ölçek: </b> {item?.size}
                            </span>

                            <span>
                              {" "}
                              <b>Miktar: </b>
                              {item?.quantity}
                            </span>
                          </Details>
                        </OrderTopRightImg>
                      </TableOrdersProduct>
                    ))}
                  </TableOrders>
                ))}
              </div>
            ) : (
              <>
                <SummaryTitle
                  style={{
                    textAlign: "center ",
                    margin: "100px",
                    fontSize: "25px",
                  }}
                >
                  <LocalMallOutlined></LocalMallOutlined>
                  <div>Ürün siparişi yok</div>
                </SummaryTitle>
              </>
            )}
          </>
        )}
      </ComponentDiv>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Orders;
