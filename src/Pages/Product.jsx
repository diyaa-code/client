import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select";
import chroma from "chroma-js";

const Container = styled.div``;

const WrapperGlo = styled.div`
  background-color: #f5fafd;
  padding: 50px;
  display: flex;
  /* flex-wrap: wrap; */
  /* flex-direction: column; */

  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;

  margin: 20px 0px;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 10px;
`;

const StylesColor = styled.div`
  width: 200px;
`;

const StylesSize = styled.div`
  width: 200px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  color: #fff;
  background-color: teal;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #f8f4f4;
    color: black;
  }
`;

const Arrow = styled.div`
  width: 25px;
  height: 25px;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.7;
  z-index: 2;
  ${mobile({ top: "0" })};
`;

const ImgContainer = styled.div`
  flex: 1;
  overflow: hidden;
  width: 43vw;
  height: 85vh;
  position: relative;

  //padding: 0px 50px;
  ${mobile({ height: "100%", width: "100%" })}
`;

const Image = styled.img`
  width: 43vw;
  height: 85vh;

  display: flex;

  ${mobile({ height: "100%", width: "100vw" })};
`;

const Wrapper = styled.div`
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.currentIndex * -100}%);
`;

const Slide = styled.div`
  border-radius: 2rem;
  //display: flex;
  height: 100vh;
  width: 100%;
  ${mobile({ height: "40vh", width: "100%" })};
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [count, setcount] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  // let userId;
  // if (user) {
  //   userId = user._id;
  // }
  ///const productId = id;
  //console.log(userId);
  //const { products } = useSelector((state) => state.cart);
  //const cart = useSelector((state) => state.cart);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? product.imgs.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === product.imgs.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(addProduct({ ...product, quantity, color, size }));
    setcount(count + 1);
    // const ProductId = product._id;
    // console.log(ProductId);

    // try {
    //   const res = await userRequest.post("/cart", {
    //     userId: userId,
    //     products: cart.products.map((item) => ({
    //       productId: item._id,
    //       quantity: item.quantity,
    //     })),
    //   });
    // } catch {
    //   console.log("err");
    // }
  };

  // useEffect(() => {
  //   const addProductCartBD = async () => {
  //     try {
  //       if (count) {
  //         //await userRequest.delete("/carts/delete/" + userId);
  //         const userCart = await userRequest.get("/carts/find/" + userId);
  //         if (userCart.data) {
  //           const res = await userRequest.put("/carts/" + userCart.data._id, {
  //             products: { ...product, quantity, color, size },
  //           });
  //         } else {
  //           const res2 = await userRequest.post("/carts", {
  //             userId: userId,
  //             products: { ...product, quantity, color, size },
  //             // products: cart.products.map((item) => ({
  //             //   productId: item._id,
  //             //   quantity: item.quantity,
  //             // })),
  //           });
  //         }
  //       }
  //     } catch {}
  //   };
  //   addProductCartBD();
  // }, [count]);

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });
  const optionsColor = product.color?.map((c) => ({
    value: c,
    label: c,
    color: c,
  }));
  const optionsSize = product.size?.map((c) => ({
    value: c,
    label: c,
  }));
  const colorStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      borderColor: "teal",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      let color = chroma("teal");

      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };
  const colorStylesSize = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      borderColor: "teal",
    }),
  };
  var imgs = product.imgs ? product.imgs : 1;
  return (
    <Container>
      <Announcement />
      <Navbar />
      <WrapperGlo>
        <ImgContainer>
          {imgs.length > 1 && (
            <Arrow direction="left" onClick={prevSlide}>
              <ArrowLeftOutlined />
            </Arrow>
          )}
          <Wrapper currentIndex={currentIndex}>
            {product.imgs &&
              product.imgs.map((item) => (
                <Slide key={item._id}>
                  <Image src={item.img} />
                </Slide>
              ))}
          </Wrapper>
          {/* {console.log("product lenghth", imgs.length)}
          {console.log("currentIndexh", currentIndex)} */}

          {imgs.length > 1 && (
            <Arrow direction="right" onClick={nextSlide}>
              <ArrowRightOutlined />
            </Arrow>
          )}

          {/* <Image src={product.img} /> */}
          {/* <video width="100%" height="100%" controls>
            <source src={product.img} type="video/mp4" />
          </video> */}
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>{product.price} TL</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <StylesColor>
                <CreatableSelect
                  options={optionsColor}
                  styles={colorStyles}
                  onChange={(selectedOption, actionMeta) => {
                    setColor(selectedOption.value);
                  }}
                />
              </StylesColor>
            </Filter>

            <Filter>
              <FilterTitle>Size</FilterTitle>
              <StylesSize>
                <CreatableSelect
                  options={optionsSize}
                  styles={colorStylesSize}
                  onChange={(selectedOption, actionMeta) => {
                    setSize(selectedOption.value);
                  }}
                />
              </StylesSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            {user ? (
              <Button onClick={handleClick}>ADD TO CART</Button>
            ) : (
              <Link to={`/login`}>
                <Button>ADD TO CART</Button>
              </Link>
            )}
          </AddContainer>
        </InfoContainer>
      </WrapperGlo>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
