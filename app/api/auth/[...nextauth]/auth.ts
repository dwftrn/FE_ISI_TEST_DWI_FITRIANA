import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const { username, password } = credentials as { username: string; password: string }

          const user = await prisma.user.findFirst({ where: { username } })

          if (!user) return null

          const pwdMatch = await bcrypt.compare(password, user.password)

          if (!pwdMatch) return null

          const { password: _, ...rest } = user

          return rest
        } catch (_error) {
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token, user: _user }) => {
      if (!session) return session

      const user = await prisma.user.findFirst({ where: { id: token.sub } })

      if (user) {
        const { password: _, ...rest } = user
        session.user = rest
      }

      return session
    }
  }
}
