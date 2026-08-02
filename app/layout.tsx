import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-jakarta",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Everweight",
	description: "A simple, private weight-tracking app.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${jakarta.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col font-sans">
				{children}
			</body>
		</html>
	);
}
