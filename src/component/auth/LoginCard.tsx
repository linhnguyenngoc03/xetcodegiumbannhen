import React, { useContext, useState } from "react";
import { UserContext } from "./AuthContext";
import { useForm } from "react-hook-form";
import StyledLink from "../theme/navLink/Link";
import StyledOutlinedInput from "../theme/input/StyledInput";
import LineText from "../theme/text/LineText";
import { UseLogin } from "../../../package/function/auth/use-login";
import { auth } from "@/config/firebase";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import { setup } from "@/config/setup";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { ggProvider } from './../../config/firebase';
import { UseLoginGoogle } from "../../../package/function/auth/use-login-google";
import SocialButton from "./SocialButton";
import { StyledButton } from "../theme/button/StyledButton";

export default function LoginCard() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { setOpenLoading } = useContext(UserContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (fields: any) => {
    try {
      setOpenLoading(true);
      const data = await UseLogin({
        email: fields.email,
        password: fields.password,
        auth: auth
      });
      dispatch(setOpen({
        message: data.message,
        open: true,
        severity: data.status
      }))
      data.data !== null ? router.push("/") : router.push("/information")
    } catch (error: any) {
      dispatch(setOpen({
        message: error.message,
        open: true,
        severity: "error"
      }))
    } finally {
      setOpenLoading(false);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      setOpenLoading(true)
      const data = await UseLoginGoogle({ auth, provider: ggProvider })
      if (data.data === null) {
        router.push("/information")
      } else {
        dispatch(setOpen({
          message: data.message,
          open: true,
          severity: data.status
        }))
        data.data.userRole === 1 ? router.push("/admin") : router.push("/")
      }
    } catch (error: any) {
      dispatch(setOpen({
        message: error.message,
        open: true,
        severity: "error"
      }))
    } finally {
      setOpenLoading(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        label="Email"
        id="input-login"
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? "bắt buộc" : ""}
        // icon={<EmailIcon />}
        {...register("email", {
          required: true,
        })}
      />
      <br />
      <StyledOutlinedInput
        label="Password"
        id="input-login"
        error={errors.password !== undefined}
        helperText={errors.password !== undefined ? "bắt buộc" : ""}
        {...register("password", {
          required: true,
        })}
        type="password"
      />
      <StyledButton
        // loading={isLoading}
        sx={{
          backgroundColor: setup.inside
        }}
        type="submit"
        fullWidth
        variant="contained"
      >
        Đăng nhập
      </StyledButton>
      <Typography sx={{
        fontWeight: "500",
        textAlign: "center",
        fontSize: "0.9rem"
      }}>
        Chưa có tài khoản?{"  "}
        <StyledLink
          style={{
            color: "#1818ad",
            textDecoration: "underline",
            display: "inline",
            fontWeight: "600"
          }}
          href="/register"
        >
          đăng kí
        </StyledLink>
      </Typography>
      <LineText text="Or" />
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <SocialButton handleLoginGoogle={handleLoginGoogle}/>
        <StyledLink
          style={{
            fontSize: "0.9rem",
            color: "#1818ad",
            textDecoration: "underline",
            fontWeight: "600",
            textAlign: "center"
          }}
          href="/"
        >
          Trang chủ
        </StyledLink>
      </div>
    </form>
  );
}
