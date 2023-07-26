import { Paper, Typography, MenuItem } from "@mui/material";
import React from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from "next/router";
import StyledLink from "../theme/navLink/Link";
import FlexBox from "../theme/flexbox/FlexBox";
import { signOut } from "firebase/auth";
import { auth } from '@/config/firebase';
import { setup } from "@/config/setup";
export default function NavLeft() {
    const router = useRouter()
    return (
        <>
            <Paper
                sx={{
                    padding: "1rem",
                }}
            >
                <Typography
                    sx={{
                        paddingBottom: "0.5rem",
                        marginBottom: "0.5rem",
                        borderBottom: "1px solid gray",
                        fontWeight: "700"
                    }}
                >
                    Dashboard
                </Typography>
                <StyledLink href={`/order/${auth.currentUser?.uid}`}>
                    <MenuItem sx={{
                        fontWeight: "700",
                        color: "black"
                    }}>
                        <ShoppingBagIcon
                            sx={{
                                marginRight: "1rem",
                                color: setup.inside
                            }}
                        />
                        Order
                    </MenuItem>
                </StyledLink>
                <StyledLink href={`/profile/${auth.currentUser?.uid}`}>
                    <MenuItem sx={{
                        fontWeight: "700",
                        color: "black"
                    }}>
                        <PersonIcon
                            color="primary"
                            sx={{
                                marginRight: "1rem",
                                color: setup.inside
                            }}
                        />
                        Profile
                    </MenuItem>
                </StyledLink>
            </Paper>
            <Paper
                onClick={() => {
                    signOut(auth)
                    router.replace("/")
                }}
                sx={{
                    padding: "1rem",
                    marginTop: "1rem",
                    cursor: "pointer"
                }}
            >
                <FlexBox justifyContent=""
                >
                    <LogoutIcon
                        color="error"
                        sx={{
                            marginRight: "1rem",
                        }}
                    />
                    <Typography
                        sx={{
                            fontWeight: "700"
                        }}
                    >
                        Log out
                    </Typography>
                </FlexBox>
            </Paper>
        </>
    );
}
