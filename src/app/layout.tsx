import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Flow_Block, Nunito } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { CartContextProvider } from "@/contexts/CartContext";
import { QueryClientProvider } from "@/components/QueryClientProvider";

const nunito = Nunito({ subsets: ["latin"] });

const flowBlock = Flow_Block({
  subsets: ["latin"],
  variable: "--font-flow-block",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Coffee App",
  description: "Trabalho PIT 2 para a disciplina de Ciência da Computação",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryClientProvider>
        <UserProvider>
          <body
            className={`${nunito.className} ${flowBlock.variable} antialiased`}
          >
            <div className="flex min-h-screen flex-col justify-start gap-16 bg-orange-50 text-orange-950">
              <CartContextProvider>
                <Header />
                <div>{children}</div>
              </CartContextProvider>
            </div>
          </body>
        </UserProvider>
      </QueryClientProvider>
    </html>
  );
}
