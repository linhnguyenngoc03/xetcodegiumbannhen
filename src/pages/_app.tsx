import "../styles/global.scss";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/Theme";
import { store } from "@/feature/ReduxStore";
import { Provider } from "react-redux";
import { NextSeo } from "next-seo";
import Loading from "@/component/theme/loading/Loading";
import { CssBaseline } from "@mui/material";
import AuthProvider from "@/component/auth/AuthContext";
import { AlertPopup } from "@/component/theme/alert/AlertPopup";

function MyApp({ Component, pageProps }: any) {
  return (
    // 2. Use at the root of your app
    <Provider store={store}>
      <NextSeo
        title="TiemHommie"
        description="Decoration and Gift"
        openGraph={{
          images: [
            {
              url: "https://group-7-swp.vercel.app/assets/images/banner.jpg",
            },
          ],
        }}
      />
      <ThemeProvider theme={theme}>
        <AuthProvider>
        <CssBaseline />
        <Loading />
        <AlertPopup>
        <div style={{ backgroundColor: "#F6F9FC" }}>
          <Component {...pageProps} />
        </div>
        </AlertPopup>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
