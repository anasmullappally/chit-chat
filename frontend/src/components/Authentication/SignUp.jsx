/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signUpValidation } from "../../config/validation";

function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const handleClick = () => setShow(!show);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    setError(signUpValidation(formData));
    setSubmit(true);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user`,
        {
          name,
          email,
          password,
          pic,
        }
      );

      toast({
        title: "Registration Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setLoading(false);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      if (error.response.status === 409) {
        toast({
          title: "User Already Exist!!",
          description: "Please Login",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
      } else {
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
    }
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      submitHandler();
    }
  }, [error, submit]);

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chit-chat");
      data.append("cloud_name", "do3u7f6dj");
      fetch(`${process.env.REACT_APP_CLOUDINARY}`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing={"5px"}>
      <form style={{ width: "100%" }}>
        <FormControl isRequired isInvalid={error.name}>
          <FormLabel>User Name</FormLabel>
          <Input
            placeholder="Enter Your User Name"
            onChange={(e) => setName(e.target.value)}
          ></Input>
          {error.name && (
            <FormErrorMessage m={0}>{error.name}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={error.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          {error.email && (
            <FormErrorMessage m={0}>{error.email}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={error.password}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
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
        <FormControl isRequired isInvalid={error.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Repeat Your Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>

            <InputRightElement width={"4.5rem"}>
              <Button h={"1.75rem"} size={"sm"} onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {error.confirmPassword && (
            <FormErrorMessage m={0}>{error.confirmPassword}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Upload Your Picture</FormLabel>
          <Input
            type={"file"}
            p={"1.5"}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          ></Input>
        </FormControl>
        <Button
          colorScheme={"blackAlpha"}
          width="100%"
          type="submit"
          style={{ marginTop: 20 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </form>
    </VStack>
  );
}

export default SignUp;
