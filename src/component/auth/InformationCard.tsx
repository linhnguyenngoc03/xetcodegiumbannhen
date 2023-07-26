import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "@/feature/Hooks";
import StyledLink from "../theme/navLink/Link";
import StyledOutlinedInput from "../theme/input/StyledInput";
import StyledLoadingButton from "../theme/button/StyledLoadingButton";
import FlexBox from "../theme/flexbox/FlexBox";
import { setup } from "@/config/setup";
import AddressCard from "./Address";
import { auth } from "@/config/firebase";
import { ResponseBody } from "../../../package/model/api";
import { User } from "../../../package/model/user";
import { UseRegister } from "../../../package/function/auth/use-register";
import { setOpen } from "@/feature/Alert";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";


export default function InformationCard() {
  const { register, handleSubmit, formState: { errors }, } = useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [address, setAddress] = useState<any>("");
  const router = useRouter()
  useEffect(() => {
    return () => {
      signOut(auth)
    };
  }, []);

  const onSubmit = async (fields: any) => {
    try {
      setIsLoading(true)
      const data: ResponseBody<User> = await UseRegister({
        email: auth.currentUser?.email,
        auth: auth.currentUser?.uid,
        address: `${fields.address}, ${address}`,
        phoneNumber: fields.phone,
        userName: fields.userName
      })
      dispatch(setOpen({
        open: true,
        message: data.message,
        severity: data.status
      }))
      data.data ? router.push("/") : null
    } catch (error: any) {
      dispatch(setOpen({
        open: true,
        message: error.message,
        severity: "error"
      }))
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StyledOutlinedInput
        label="Tên khách hàng"
        id="3"
        error={errors.userName !== undefined}
        helperText={errors.userName !== undefined ? "bắt buộc" : ""}
        {...register("userName", { required: true })}
      />
      <StyledOutlinedInput
        label="Số điện thoại"
        id="4"
        error={errors.phone !== undefined}
        helperText={errors.phone !== undefined ? "bắt buộc" : ""}
        {...register("phone", { required: true })}
      />
      <AddressCard setAddress={setAddress} />
      <StyledOutlinedInput
        id="5"
        label="Số nhà tên đường"
        error={errors.address !== undefined}
        helperText={errors.address !== undefined ? "bắt buộc" : ""}
        {...register("address", { required: true })}
      />
      <StyledLoadingButton
        loading={isLoading}
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: setup.inside
        }}
      >
        Xác nhận
      </StyledLoadingButton>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <FlexBox>
          <StyledLink
            style={{
              color: "black",
            }}
            href="/"
          >
            Quay về
          </StyledLink>
        </FlexBox>
      </div>
    </form>
  );
}
