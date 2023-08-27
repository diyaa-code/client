import { useEffect, useState } from "react";
import styled from "styled-components";

import { mobile } from "../../responsive";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import "./myAccount.css";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Error,
  ErrorOutline,
} from "@material-ui/icons";
import { userRequest } from "../../requestMethods";

import Swal from "sweetalert2";

import { logout } from "../../redux/userRedux";

const Container = styled.div``;
const ComponentDiv = styled.div`
  width: 100%;
  /* height: 150vh; */
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
  position: relative;
`;

const Button = styled.button`
  /* width: 40%; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 90%;
  right: 50%;
  left: auto;
  margin-top: 5px;
  border: none;
  padding: 15px 20px;
  background-color: #b90000;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #570707;
  }
`;

const ErrorMass = styled.span`
  color: red;
`;

const MyAccount = () => {
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({});

  const dispatch = useDispatch();
  console.log(user);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const userInfo = {
      ...inputs,
    };

    try {
      // update
      const res = await userRequest.put(`/users/${user._id}`, userInfo);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "warning",
        text: "bir hata oluştu!",
      });
    }
  };

  return (
    <Container>
      <Navbar />
      <ComponentDiv>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <div className="userShowTopTitle">
                <span className="userShowUsername">{user.username}</span>
                {/* <span className="userShowUserTitle">Software Engineer</span> */}
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Details</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">{user.username}</span>
              </div>
              <div className="userShowInfo">
                <CalendarToday className="userShowIcon" />
                <span className="userShowInfoTitle">10.12.1999</span>
              </div>
              <span className="userShowTitle">Contact Details</span>
              <div className="userShowInfo">
                <PhoneAndroid className="userShowIcon" />
                <span className="userShowInfoTitle">+1 123 456 67</span>
              </div>
              <div className="userShowInfo">
                <MailOutline className="userShowIcon" />
                <span className="userShowInfoTitle">{user.email}</span>
              </div>
              <div className="userShowInfo">
                <LocationSearching className="userShowIcon" />
                <span className="userShowInfoTitle">New York | USA</span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm">
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder={user.username}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                {/* <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Anna Becker"
                  className="userUpdateInput"
                />
              </div> */}
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder={user.email}
                    onChange={handleChange}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="+1 123 456 67"
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="New York | USA"
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <button className="userUpdateButton" onClick={handleClick}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              Swal.fire({
                title: "Emin misin?",
                text: "Bunu geri alamazsınız!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "teal",
                cancelButtonColor: "#d33",
                confirmButtonText: "Evet, silin!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    const res = await userRequest.delete(`/users/${user._id}`);

                    Swal.fire("Silindi!", "Hesabınız silinmiştir.", "başarı");
                    dispatch(logout());
                  } catch (err) {
                    Swal.fire({
                      icon: "warning",
                      text: "bir hata oluştu!",
                    });
                  }
                }
              });
            }}
          >
            <ErrorOutline /> Delete account{" "}
          </Button>
        </div>
      </ComponentDiv>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default MyAccount;
