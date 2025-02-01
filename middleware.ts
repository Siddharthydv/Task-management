import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect to login if not authenticated
  },
});

// Apply middleware to secure API routes
export const config = {
  matcher: ["/api/protected/:path*"], // Protect all routes inside `/api/protected`
};
