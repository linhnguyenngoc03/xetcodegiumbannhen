import React, { useContext, useState } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { UserContext } from "./AuthContext";
import { useAppDispatch } from "@/feature/Hooks";
import { setOpen } from "@/feature/Alert";
import StyledLink from "../theme/navLink/Link";
import { StyledButton } from "../theme/button/StyledButton";
import LineText from "../theme/text/LineText";
import StyledOutlinedInput from "../theme/input/StyledInput";
import { setup } from "@/config/setup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, ggProvider } from "@/config/firebase";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { UseLoginGoogle } from "../../../package/function/auth/use-login-google";
import SocialButton from "./SocialButton";
export default function RegisterCard() {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { setOpenLoading } = useContext(UserContext)
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
        router.push("/")
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

  const onSubmit = async (fields: any) => {
    try {
      setOpenLoading(true)
      await createUserWithEmailAndPassword(auth, fields.email, fields.password)
      dispatch(setOpen({
        message: "Success, Tạo tài khoản thành công",
        open: true,
        severity: "success"
      }))
      router.push("/information")
    } catch (error: any) {
      dispatch(setOpen({
        message: error.message,
        open: true,
        severity: "error"
      }))
    } finally {
      setOpenLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        id="login"
        label="Email"
        error={errors.email !== undefined}
        helperText={errors.email !== undefined ? "bắt buộc" : ""}
        {...register("email", {
          required: true
        })}
      />
      <StyledOutlinedInput
        label="Password"
        error={errors.password !== undefined}
        helperText={errors.password !== undefined ? "bắt buộc ít nhất 6 kí tự" : ""}
        id="2"
        {...register("password", {
          required: true,
          minLength: 6
        })}
      />
      <StyledButton
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: setup.inside
        }}
      >
        Đăng kí
      </StyledButton>
      <Typography sx={{
        fontWeight: "500",
        textAlign: "center",
        fontSize: "0.9rem"
      }}>
        Đã có tài khoản?{"  "}
        <StyledLink
          style={{
            color: "#1818ad",
            textDecoration: "underline",
            display: "inline",
            fontWeight: "600"
          }}
          href="/login"
        >
          đăng nhập
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
