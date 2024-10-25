import db from '@/service/db'
import argon2 from '@/utils/argon2'
import userType from '@/rype/userType'
import { BloodGroup } from '@prisma/client'

for (const modelName of Object.keys(db).filter(
  (key) => typeof db[key]?.deleteMany === 'function'
)) {
  await db[modelName].deleteMany()
}
console.log('Database cleared')

const bangladeshiNames = [
  'Nazmus Sayad',
  'Mohammad Nafees',
  'Rakib Ahmed',
  'Ayesha Akhter',
  'Shafiul Islam',
  'Taslima Begum',
  'Rashedul Karim',
  'Nusrat Jahan',
  'Md. Abdullah',
  'Rumana Parvin',
  'Kamal Hossain',
  'Sharmin Sultana',
  'Imran Hossain',
  'Shamima Akhter',
  'Ashraful Alam',
  'Farhana Islam',
  'Habib Rahman',
  'Jannatul Ferdous',
  'Md. Sadiqur Rahman',
  'Meherun Nesa',
]

const password = await argon2.generate('superhero')
await db.user.createMany({
  data: [
    ...bangladeshiNames,
    ...bangladeshiNames,
    ...bangladeshiNames,
    ...bangladeshiNames,
    ...bangladeshiNames,
  ].map((name, i) => {
    const accountType = i < 10 ? 'STUDENT' : i < 15 ? 'TEACHER' : 'GUEST'
    return {
      ...userType.parse({
        name,
        password,
        accountType,
        phone: '+8801711' + i.toString().padStart(6, '0'),
        bloodGroup: Object.keys(BloodGroup)[i % 8] as any,
        birthCertificateNumber: '1' + i.toString().padStart(9, '0'),
        nidNumber: accountType === 'STUDENT' ? undefined : '2' + i.toString().padStart(9, '0'),
      }),
      id: i + 1,
      avatar_url: `https://avatar.iran.liara.run/public/${i + 1}`,
      role: i < 5 ? 'SUPER_ADMIN' : i < 10 ? 'ADMIN' : i < 15 ? 'MODERATOR' : 'MEMBER',
    } as const
  }),
})

const users = await db.user.findMany()
await db.bloodDonation.createMany({
  data: users
    .map((user) =>
      new Array(10).fill(0).map((_, i) => ({
        userId: user.id,
        createdById: 1,
        statusUpdatedById: 1,
        statusUpdatedAt: new Date(),
        statusUpdateComment: 'Auto Setup, ' + i,
        bloodGroup: Object.keys(BloodGroup)[i % 8] as any,
      }))
    )
    .flat(),
})

console.log('Database seeded')
