import styled from "styled-components";

import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(
          `https://nice-plum-swallow-fez.cyclic.app/api/categories`
        );
        // const res = await axios.get(
        //   `https://taaclandapi.onrender.com/api/categories`
        // );
        setCategories(res.data);
      } catch (err) {}
    };
    getCategory();
  }, []);
  //console.log("categories" + categories);
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item._id} />
      ))}
    </Container>
  );
};

export default Categories;
