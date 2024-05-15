import type { Metadata } from "next";
import { fonts } from "./fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Mi Pichanga",
  description: "Crea y comparte tus partidos de fútbol.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={fonts.nunitoSans.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
