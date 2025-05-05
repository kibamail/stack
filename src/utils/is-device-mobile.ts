import { headers } from "next/headers";

export async function isDeviceMobile() {
	const headersList = await headers();
	const userAgent = headersList.get("user-agent") || "";

	return /mobile|android|iphone|ipad|phone/i.test(userAgent);
}
