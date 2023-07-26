import { Grid } from "@mui/material";
import React, { useContext } from "react";
import Layout1 from "./Layout1";
import NavLeft from "@/component/navigation/NavigationLeft";
export default function Layout2({children} : any) {
    return (
        <Layout1>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <NavLeft />
                </Grid>
                <Grid item xs={9}>
                    {children}
                </Grid>
            </Grid>
        </Layout1>
    );
}
 