import React, { useState } from "react";
import "./style.scss";
import { Divider, Paper } from "@mui/material";
import { Primary__Btn, Primary__Input } from "../../components";
import { Google } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
const Index = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
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

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/dashboard")

        localStorage.setItem("uid", user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="login__main">
      <Paper
        component={"form"}
        onSubmit={handleSubmit}
        elevation={6}
        sx={{ borderRadius: "20px", paddingX: "25px", paddingY: "15px" }}
      >
        <h1 className="main__heading">Login</h1>

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
            placeholder={"Enter username"}
            type={"password"}
            id={"password"}
            onchange={handleChange}
            value={data.password}
          />
        </div>
        <div>
          <Primary__Btn text={"Login"} type={"submit"} />
        </div>
        <Divider sx={{ marginY: "10px" }} />
        <div className="continue__google">
          <Primary__Btn bgnone type={"button"}>
            <Google /> Continue with Google
          </Primary__Btn>
        </div>
        <div className="login__para">
          <p>
            I don't have an account{" "}
            <Link className="para__inner" to={"/register"}>
              SignUp
            </Link>
          </p>
        </div>
      </Paper>
    </div>
  );
};

export default Index;
