import { IncomingMessage, ServerResponse } from "http";

export const setHeaders = (
	res: ServerResponse<IncomingMessage>,
	origin: string | null = null
) => {
	res.setHeader("Access-Control-Allow-Origin", origin || "*");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};
