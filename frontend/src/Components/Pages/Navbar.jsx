import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: "20px",
        marginBottom: "10px",
        backgroundColor: "RGB(51 51 51)",
        color: "white",
      }}
    >
      <Link to={"/"}>
        <Text
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          }
          fontSize={"20px"}
          border={"2px solid white"}
          padding={"5px 30px"}
          bg={"RGB(255 59 43)"}
          color={"white"}
          borderRadius={"5px"}
          _hover={{
            bg: "RGB(255 124 112)",
          }}
        >
          SignUp
        </Text>
      </Link>
      <Link to={"/list"}>
        <Text
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          }
          fontSize={"20px"}
          border={"2px solid white"}
          padding={"5px 30px"}
          bg={"RGB(255 59 43)"}
          color={"white"}
          borderRadius={"5px"}
          _hover={{
            bg: "RGB(255 124 112)",
          }}
        >
          Users
        </Text>
      </Link>
    </div>
  );
};

export default Navbar;
