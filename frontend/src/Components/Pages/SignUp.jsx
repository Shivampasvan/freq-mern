import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Radio,
  RadioGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Signup() {
  const toast = useToast();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [load, setLoad] = useState(false);

  const countries = ["India", "Japan", "Russia"];

  const states = {
    India: ["UttarPradesh", "Delhi", "Maharashtra", "Kerala", "Punjab"],
    Japan: ["Chugoku", "Kanto", "Hokkaido"],
    Russia: ["Amur Region", "Arkhangelsk Region", "Altai Territory"],
  };

  const cities = {
    UttarPradesh: ["Meerut", "Ghaziabad", "Noida", "Lucknow"],
    Jharkhand: ["Dhanbad", "Nirsa", "Ranchi"],
    "West Bengal": ["Kolkata", "Asansol", "Howrah"],
    Chugoku: ["Kurashiki", "Fukuyama", "Shimonoseki"],
    Kanto: ["Tokyo", "Yokohama", "Maebashi"],
    Hokkaido: ["Sapporo", "Hakodate", "Asahikawa"],
    "Amur Region": ["Zeya", "Belogorsk", "Tynda"],
    "Arkhangelsk Region": ["Arkhangelsk", "Murmansk", "Severodvinsk"],
    "Altai Territory": ["Astrakhan", "Vologda", "Veliky Novgorod"],
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    setCity("");
    setState("");
  };
  const handleState = (e) => {
    setState(e.target.value);
    setCity("");
  };
  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleDate = (e) => {
    setDob(e.target.value);
    let value = calculateAge(e.target.value);
    if (value <= 14) {
      alert("Your age must be greater than 14 years");
      setDob("");
      setAge("");
    } else {
      setAge(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !fname ||
      !lname ||
      !mail ||
      !country ||
      !state ||
      !city ||
      !gender ||
      !dob
    ) {
      toast({
        title: "Error",
        description: "All credentials required to register !!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      const payload = {
        fname,
        lname,
        mail,
        country,
        state,
        city,
        gender,
        dob,
        age,
      };

      setLoad(!load);

      axios
        .post(`https://clever-teal-raincoat.cyclic.app/user/add`, payload)
        .then((res) => {
          toast({
            title: "Successful !!",
            description: "User's data registered successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setLname("");
          setFname("");
          setMail("");
          setGender("");
          setAge("");
          setCity("");
          setCountry("");
          setState("");
          setDob("");
          setLoad(false);
        })
        .catch((error) =>
          toast({
            title: "Error !!",
            description:
              "User Data couldn't Successfully Saved in the Database due to Some Error.",
            status: "error",
            duration: 5000,
            isClosable: true,
          })
        );
    }
  };
  return (
    <>
      <Navbar />
      <Flex
        minH={"60vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={8} px={6}>
          <Stack align={"center"}>
            <Heading
              fontSize={"4xl"}
              textAlign={"center"}
              color={"RGB(255 59 43)"}
            >
              User Registration
            </Heading>
            <Text fontSize={"lg"} color={"gray.800"} fontWeight={"600"}>
              Fill the details to register !!
            </Text>
          </Stack>
          <Box
            gap={20}
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            p={8}
            boxShadow={"rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}
          >
            <Stack spacing={6}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      focusBorderColor="#ff3b2b"
                      type="text"
                      name="fname"
                      value={fname}
                      onChange={(e) => {
                        setFname(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      focusBorderColor="#ff3b2b"
                      type="text"
                      name="lname"
                      value={lname}
                      onChange={(e) => {
                        setLname(e.target.value);
                      }}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  focusBorderColor="#ff3b2b"
                  type="email"
                  name="mail"
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                />
              </FormControl>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <FormControl id="country" isRequired>
                    <FormLabel>Country</FormLabel>
                    <select
                      name="country"
                      id="country"
                      onChange={handleCountry}
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="state" isRequired>
                    <FormLabel>State</FormLabel>
                    <select
                      name="state"
                      id="state"
                      onChange={handleState}
                      required
                    >
                      <option value="">Select State</option>
                      {states[country] &&
                        states[country].map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="city" isRequired>
                    <FormLabel>City</FormLabel>
                    <select
                      name="city"
                      id="city"
                      onChange={handleCity}
                      required
                    >
                      <option value="">Select City</option>
                      {cities[state] &&
                        cities[state].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                    </select>
                  </FormControl>
                </Box>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <FormControl
                    id="gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                    isRequired
                  >
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup>
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="red" value="Male">
                          Male
                        </Radio>
                        <Radio colorScheme="red" value="Female">
                          Female
                        </Radio>
                        <Radio colorScheme="red" value="Other">
                          Other
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                </Box>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <FormControl id="dob" isRequired>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      focusBorderColor="#ff3b2b"
                      type="date"
                      name="dob"
                      value={dob}
                      onChange={handleDate}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="age">
                    <FormLabel>Age</FormLabel>
                    <Input type="text" name="age" value={age} isDisabled />
                  </FormControl>
                </Box>
              </HStack>
              <Stack spacing={10} pt={2}>
                <Button
                  width={"35%"}
                  margin={"auto"}
                  loadingText="Submitting"
                  size="lg"
                  bg={"RGB(255 59 43)"}
                  color={"white"}
                  _hover={{
                    bg: "RGB(255 124 112)",
                  }}
                  isLoading={load}
                  onClick={(e) => handleSubmit(e)}
                >
                  Register
                </Button>
              </Stack>
              <Stack></Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
