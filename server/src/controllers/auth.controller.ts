import type { RequestHandler } from "express";

export const auth: RequestHandler = async function (req, res, next) {
  const jwtToken = req.signedCookies.access_token;
  const csrfToken = req.cookies.csrf;
  const headerCsrfToken = req.headers["x-csrf-token"];
  console.log("Jwt token: " + jwtToken);
  console.log("Csrf token: " + csrfToken);
  console.log("Token: " + headerCsrfToken);
};
