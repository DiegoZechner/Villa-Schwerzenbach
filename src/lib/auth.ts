import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Fallbacks so it works out-of-the-box on Vercel without environment variables
        const expectedEmail = process.env.ADMIN_EMAIL || 'admin@villa-schwerzenbach.ch';
        const expectedPassword = process.env.ADMIN_PASSWORD || 'VillaAdmin2024!';

        if (
          credentials?.email === expectedEmail &&
          credentials?.password === expectedPassword
        ) {
          return { id: 'admin', email: credentials.email as string, name: 'Admin' };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  // Fallback secret for Vercel mockup
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-vercel-mockup-do-not-use-in-prod-12345',
  pages: {
    signIn: '/admin/login',
  },
});
