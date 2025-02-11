import Script from "next/script";
import React from "react";

interface Props extends React.PropsWithChildren {}

export default function RootLayout({ children }: Props): JSX.Element {
  return (
    <html>
      <body>{children}</body>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-7Z0075QZ3C"
        strategy="afterInteractive"
      />
      <Script
        id="gtag"
        // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7Z0075QZ3C');
          `,
        }}
      />
    </html>
  );
}
