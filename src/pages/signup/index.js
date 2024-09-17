import React, { useState } from "react";
import "./style.scss";
import { Divider, Paper } from "@mui/material";
import { Primary__Btn, Primary__Input } from "../../components";
import { Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
const Index = () => {
    const navigate = useNavigate()
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, id } = e.target;

    setData({ ...data, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        navigate("/login")
        setData({
          username: "",
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  };

  return (
    <div className="signup__main">
      <Paper
        elevation={6}
        component={"form"}
        onSubmit={handleSubmit}
        sx={{ borderRadius: "20px", paddingX: "25px", paddingY: "15px" }}
      >
        <h1 className="main__heading">Signup</h1>
        <div>
          <Primary__Input
            placeholder={"Enter username"}
            type={"text"}
            id={"username"}
            onchange={handleChange}
            value={data.username}
          />
        </div>
        <div>
          <Primary__Input
            placeholder={"Enter Email"}
            type={"email"}
            id={"email"}
            onchange={handleChange}
            value={data.email}
          />
        </div>
        <div>
          <Primary__Input
            placeholder={"Enter Password"}
            type={"password"}
            id={"password"}
            onchange={handleChange}
            value={data.password}
          />
        </div>
        <div>
          <Primary__Btn text={"Signup"} type={"submit"} />
        </div>
        <Divider sx={{ marginY: "10px" }} />
        <div className="continue__google">
          <Primary__Btn bgnone type={"button"}>
            <Google /> Continue with Google
          </Primary__Btn>
        </div>
        <div className="signup__para">
          <p>
            I already have an account{" "}
            <Link className="para__inner" to={"/login"}>
              Login
            </Link>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default Index;
