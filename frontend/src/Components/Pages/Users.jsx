import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  SkeletonText,
} from "@chakra-ui/react";
import Navbar from "./Navbar";

export const Users = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetData = () => {
    setLoading(true);

    axios
      .get(`https://calm-erin-oyster-sock.cyclic.app/user/get`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((res) => alert("Issue Faced"));
  };

  useEffect(() => {
    GetData();
  }, []);

  return loading ? (
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonText mt="4" noOfLines={20} spacing="10" skeletonHeight="10" />
    </Box>
  ) : (
    <div>
      <Navbar />
      <TableContainer>
        <Table>
          <Thead>
            <Tr fontWeight={"500"} fontSize={"80px"}>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Country</Th>
              <Th>State</Th>
              <Th>City</Th>
              <Th>Gender</Th>
              <Th>Date of Birth</Th>
              <Th isNumeric>Age</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id} bg={"RGB(255 86 71)"} fontWeight={"500"}>
                <Td>{item.fname}</Td>
                <Td>{item.lname}</Td>
                <Td>{item.mail}</Td>
                <Td>{item.country}</Td>
                <Td>{item.state}</Td>
                <Td>{item.city}</Td>
                <Td>{item.gender}</Td>
                <Td>{item.dob}</Td>
                <Td isNumeric>{item.age}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};
