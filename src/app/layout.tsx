import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { headers } from "next/headers";
import { CognitoIdTokenPayload } from "aws-jwt-verify/jwt-model";
import Auth from "./auth";
import Providers from "./providers";
import "@/utils/amplifyInit";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://canim-csr.vercel.app"),
  title: "Ethical Emporium - Shop & eCommerce React Template",
  description:
    "Buy Ethical Emporium - Shop & eCommerce Next.Js Template by Sahibzada Waseem Ahmad. Ethical Emporium | Shop & eCommerce Next.js Template - a responsive Next.js template with tailwind css. Ethical Emporium is built with the latest Next.Js 14 App Directory",
  openGraph: {
    title: "Ethical Emporium - Shop & eCommerce Next.js Template",
    description:
      "Buy Ethical Emporium - Shop & eCommerce Next.Js Template by Sahibzada Waseem Ahmad Islam. Ethical Emporium | Shop & eCommerce React Template - a responsive React template. Ethical Emporium is built with the latest Next.Js 13 App Directory",
    url: "https://canim-csr.vercel.app",
    siteName: "Ethical Emporium Template",
    images:
      "https://github.com/devhasibulislam/canim-ecommerce/blob/master/client/public/og.png?raw=true",
    locale: "en_US",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "@devhasibulislam",
  //   title: "Canim - Shop & eCommerce React Template",
  //   description:
  //     "Buy Canim - Shop & eCommerce Next.Js Template by Hasibul Islam. Canim | Shop & eCommerce React Template - a responsive React template. Canim is built with the latest Next.Js 13 App Directory",
  //   image:
  //     "https://github.com/devhasibulislam/canim-ecommerce/blob/master/client/public/og.png?raw=true",
  // },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const requestHeaders = await headers();
  const userData: CognitoIdTokenPayload = JSON.parse(
    requestHeaders.get("USER-DATA")
  );
  const jwtToken: string = requestHeaders.get("JWT-TOKEN");
  return (
    <html lang='en'>
      <body>
        <Providers>
          <Auth userData={userData} jwtToken={jwtToken}>
            {children}
          </Auth>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
