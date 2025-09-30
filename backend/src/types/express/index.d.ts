// backend/src/types/express/index.d.ts
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      email?: string;
      // agrega aquí cualquier otra propiedad que pongas en tu JWT
    };
  }
}
