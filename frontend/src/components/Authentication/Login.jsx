/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../../config/validation";

function Login() {
  const toast = useToast();
  const navigate = useNavigate();

  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {
      email: email,
      password: password,
    };
    setError(loginValidation(formData));
    setSubmit(true);
  };

  const submitHandler = async () => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        {
          email,
          password,
        }
      );
      toast({
        title: "Login Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Ocurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      submitHandler();
    }
  }, [error, submit]);

  return (
    <VStack spacing={"5px"}>
      <FormControl id="email" isRequired isInvalid={error.email}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        {error.email && (
          <FormErrorMessage m={0}>{error.email}</FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="password" isRequired isInvalid={error.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {error.password && (
          <FormErrorMessage m={0}>{error.password}</FormErrorMessage>
        )}
      </FormControl>

      <Button
        colorScheme={"blackAlpha"}
        width="100%"
        style={{ marginTop: 20 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Sign In
      </Button>
      <Button
        variant={"solid"}
        colorScheme="red"
        width={"100%"}
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("123456");
        }}
      >
        Guest User
      </Button>
    </VStack>
  );
}

export default Login;
