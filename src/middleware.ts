import createMiddleware from "next-intl/middleware";
import { routing } from "./routing";

export default createMiddleware(routing);

export const config = {
  // corre en todas las rutas menos assets estaticos y api
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};