export * from '@prisma/client'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export default db
