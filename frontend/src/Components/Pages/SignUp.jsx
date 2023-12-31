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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import validator from "validator";

export default function Signup() {
  const toast = useToast();
  const [errorc, setErrorc] = useState(false);
  const [emailerror, setEmailerror] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mail, setMail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [Today, setToday] = useState("");
  const [age, setAge] = useState("");
  const [load, setLoad] = useState(false);

  const countries = ["India", "England", "Korea", "Spain"];

  const states = {
    India: ["UttarPradesh", "Maharashtra", "Delhi", "Punjab"],
    England: ["UnitedKingdom", "Borsto", "London", "GreaterLondon"],
    Korea: ["Benjao", "Tenjaku", "Wasaoi"],
    Spain: ["PortSpanio", "Velley", "CostaRica"],
  };

  const cities = {
    UttarPradesh: ["Meerut", "Ghaziabad", "Noida", "Lucknow", "Hapur"],
    Maharashtra: ["Mumbai", "Navi Mumbai", "Pune", "Thane"],
    Delhi: ["Dwarika", "Nirman Vihar", "Barah Khamba", "Rohini"],
    Punjab: ["Chandigarh", "Mohali", "Durga Puri", "Bhatinda"],
    UnitedKingdom: ["Menchaster City", "Brunick", "Peiso"],
    Borsto: ["Chelsei", "Manhaton", "Pallasio"],
    London: ["borough", "Square Mile", "Lambeth"],
    GreaterLondon: ["Lewisham", "Wandsworth ", "Westminster"],
    Benjao: ["Kurashiki", "Fukuyama", "Shimonoseki"],
    Tenjaku: ["Tokyo", "Yokohama", "Maebashi"],
    Wasaoi: ["Sapporo", "Hakodate", "Asahikawa"],
    Velley: ["Zeya", "Belogorsk", "Tynda"],
    PortSpanio: ["Arkhangelsk", "Murmansk", "Severodvinsk"],
    CostaRica: ["Astrakhan", "Vologda", "Veliky Novgorod"],
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

  const onLoadingPage = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setToday(`${year}-${month}-${day}`);
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

  const handlefname = (e) => {
    const regex = /^[A-Za-z]*$/;
    const value = e.target.value;
    if (regex.test(value)) {
      setFname(value);
    }
  };

  const handlelname = (e) => {
    const regex = /^[A-Za-z]*$/; // Regular expression to match alphabetic characters
    const value = e.target.value;
    if (regex.test(value)) {
      setLname(value);
    }
  };

  const handleemail = (e) => {
    let inputValue = e.target.value;
    setMail(e.target.value);
    if (validator.isEmail(inputValue)) {
      setEmailerror(false);
    } else {
      setEmailerror(true);
    }
    // console.log("email error", emailerror, "mail", mail);
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
      setErrorc(true);
      toast({
        title: "Error",
        description: "All credentials required to register !!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      if (emailerror) {
        setErrorc(true);
        toast({
          title: "Invalid Email Address",
          description: "Please enter valid email address to register !!",
          status: "error",
          duration: 3000,
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
          .post(`https://puce-zealous-pigeon.cyclic.app/user/add`, payload)
          .then((res) => {
            toast({
              title: "Successful !!",
              description: "User registered successfully.",
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
            setErrorc(false);
          })
          .catch((error) => {
            toast({
              title: "Error !!",
              description: error.response.data,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            setLoad(false);
          });
      }
    }
  };
  useEffect(() => {
    onLoadingPage();
  }, []);
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
                  <FormControl id="firstName" isRequired isInvalid={errorc}>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      focusBorderColor="#ff3b2b"
                      type="text"
                      name="fname"
                      value={fname}
                      onChange={handlefname}
                      placeholder="Enter first name"
                    />
                    {errorc && fname === "" ? (
                      <FormErrorMessage>Enter First Name</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName" isRequired isInvalid={errorc}>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      focusBorderColor="#ff3b2b"
                      type="text"
                      name="lname"
                      value={lname}
                      onChange={handlelname}
                      placeholder="Enter last name"
                    />
                    {errorc && lname === "" ? (
                      <FormErrorMessage>Enter Last Name</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Box>
              </HStack>
              <FormControl
                id="email"
                isRequired
                isInvalid={(emailerror, errorc)}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  focusBorderColor="#ff3b2b"
                  type="email"
                  name="mail"
                  value={mail}
                  onChange={handleemail}
                  placeholder="Enter email"
                />
                {emailerror ? (
                  <FormErrorMessage>
                    Enter Valid Email Address.
                  </FormErrorMessage>
                ) : mail === "" && errorc ? (
                  <FormErrorMessage>Enter Email Address</FormErrorMessage>
                ) : null}
              </FormControl>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <FormControl id="country" isRequired isInvalid={errorc}>
                    <FormLabel>Country</FormLabel>
                    <select
                      name="country"
                      id="country"
                      onChange={handleCountry}
                      required
                      value={country}
                    >
                      <option value="">Select Country</option>
                      {countries.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {errorc && country === "" ? (
                      <FormErrorMessage>Select Country</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="state" isRequired isInvalid={errorc}>
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
                    {errorc && state === "" ? (
                      <FormErrorMessage>Select State</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="city" isRequired isInvalid={errorc}>
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
                    {errorc && city === "" ? (
                      <FormErrorMessage>Select City</FormErrorMessage>
                    ) : null}
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
                    value={gender}
                    isRequired
                    isInvalid={errorc}
                  >
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup>
                      <Stack spacing={5} direction="row">
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                        <Radio value="Other">Other</Radio>
                      </Stack>
                    </RadioGroup>
                    {errorc && gender === "" ? (
                      <FormErrorMessage>Select Gender</FormErrorMessage>
                    ) : null}
                  </FormControl>
                </Box>
              </HStack>
              <HStack justifyContent={"space-between"}>
                <Box>
                  <FormControl id="dob" isRequired isInvalid={errorc}>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      focusBorderColor="#ff3b2b"
                      type="date"
                      name="dob"
                      value={dob}
                      onChange={handleDate}
                      min={"1922-12-31"}
                      max={Today}
                    />
                    {errorc && dob === "" ? (
                      <FormErrorMessage>Select Date of Birth</FormErrorMessage>
                    ) : null}
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
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
