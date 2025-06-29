// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendApiResponse } from "../utils/apiResponse";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your_super_strong_jwt_secret_key_please_change_this_in_production";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header("Authorization");
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

  if (!token) {
    // JANGAN gunakan 'return res.status(...)' jika tidak ada 'void' yang eksplisit.
    sendApiResponse(res, 401, false, "Access denied. No token provided.");
    return;
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // Cukup 'return;' untuk keluar dari fungsi tanpa melanjutkan.
  }

  try {
    console.log("token:", token);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (
      typeof decoded !== "object" ||
      !decoded ||
      !("userId" in decoded) ||
      typeof decoded.userId !== "string"
    ) {
      // JANGAN gunakan 'return res.status(...)' jika tidak ada 'void' yang eksplisit.
      sendApiResponse(
        res,
        401,
        false,
        "Invalid token payload or userId type mismatch."
      );
      return;
      res
        .status(401)
        .json({ message: "Invalid token payload or userId type mismatch." });
      return; // Cukup 'return;'
    }

    req.userId = decoded.userId;
    req.role = (decoded as any).role || "user";

    next();
  } catch (e) {
    console.error("JWT verification error:", e);
    // JANGAN gunakan 'return res.status(...)' jika tidak ada 'void' yang eksplisit.
    sendApiResponse(res, 401, false, "Invalid or expired token.");
    return;
    res.status(401).json({ message: "Invalid or expired token." });
    return; // Cukup 'return;'
  }
}

// Untuk verifySeller (dan authorizeRoles), jika Anda juga mengembalikan nilai, lakukan koreksi yang sama.
// Contoh authorizeRoles yang dikoreksi:
export function authorizeRoles(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      sendApiResponse(
        res,
        403,
        false,
        "Forbidden: Insufficient role permissions."
      );
      return;
      res
        .status(403)
        .json({ message: "Forbidden: Insufficient role permissions." });
      return; // Cukup 'return;'
    }
    next();
  };
}
