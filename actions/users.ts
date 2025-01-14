'use server'

import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export async function fetchAllTeamUsers() {
  return await prisma.user.findMany({ where: { role: UserRole.TEAM } })
}
