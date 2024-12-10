export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale}>
      <body>{children}</body>
    </html>
  );
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}
