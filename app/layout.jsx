import "./globals.css";

export const metadata = {
  title: "Camp for You",
  description: "Xalqaro va mahalliy grant, camp hamda volontyorlik dasturlari uchun markazlashgan platforma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
