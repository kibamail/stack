import React from "react";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { ApplicationLayout } from "@/components/layout/application-layout";
import { isDeviceMobile } from "@/utils/is-device-mobile";

import "./styles/globals.css";

const manropeSans = Manrope({
	variable: "--font-manrope",
});

export const metadata: Metadata = {
	title: "Kibamail stack",
	description:
		"A starter template for all new projects kickstarted by the kibamail organization.",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isMobile = await isDeviceMobile();

	return (
		<html lang="en" className="kb-background-secondary">
			<body className={`${manropeSans.variable} antialiased`}>
				<div className="w-full h-screen border-l border-r kb-border-tertiary">
					<ApplicationLayout isMobile={isMobile}>{children}</ApplicationLayout>
				</div>
			</body>
		</html>
	);
}
