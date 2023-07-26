import Footer from "@/component/footer";
import Navigation1 from "@/component/navigation/Navigation1";
import { setup } from "@/config/setup";
import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Layout1({ children }: any) {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>{setup.name}</title>
      </Head>
      <Navigation1/>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "30rem",
          marginTop: router.asPath !== "/" ? "9rem" : "0rem",
          marginBottom: "5rem",
        }}
      >
        {children}
      </Container>
      <Footer/>
    </>
  );
}
