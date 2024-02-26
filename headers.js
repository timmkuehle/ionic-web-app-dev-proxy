export const setHeaders = (res, origin = null) => {
	res.setHeader("Access-Control-Allow-Origin", origin || "*");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
};
