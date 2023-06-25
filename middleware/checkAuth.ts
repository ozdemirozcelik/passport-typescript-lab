/*
FIX ME (types) 😭
*/

// "@types/express": "^4.17.16", installs types for express, we already imported this through package.json
import { NextFunction, Request, Response } from "express";

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
}

/*
FIX ME (types) 😭
*/
export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/dashboard");
}

// for admin page
export const ensureAuthenticatedAsAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {

    if (req.user.role === "admin")
      return next();

  }
  res.redirect("/auth/login");
}