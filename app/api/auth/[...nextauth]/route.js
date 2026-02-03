import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})

export const authOptions = {
  callbacks: {
    async session({ session, user, token }) {
      // DB session
      if (user) {
        session.user.id = user.id
      }

      // JWT session
      if (token?.sub) {
        session.user.id = token.sub
      }

      return session
    },
  },
}

export { handler as GET, handler as POST }
