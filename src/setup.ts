import userType from '@/rype/userType'
import db, { BloodGroup } from '@/service/db'
import argon2 from '@/utils/argon2'

for (const modelName of Object.keys(db).filter(
  (key) => typeof db[key]?.deleteMany === 'function'
)) {
  await db[modelName].deleteMany()
}
console.log('Database cleared')

const bangladeshiNames = [
  'Nazmus Sayad',
  'Fatima Khatun',
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
  data: bangladeshiNames.map((name, i) => {
    const accountType = i < 10 ? 'STUDENT' : i < 15 ? 'TEACHER' : 'GUEST'
    return {
      ...userType.parse({
        name,
        password,
        accountType,
        phone: '+8801711' + i.toString().padStart(6, '0'),
        bloodGroup: Object.keys(BloodGroup)[i % 8] as any,
        birthCertificateNumber: '1' + i.toString().padStart(9, '0'),
        nidNumber:
          accountType === 'STUDENT'
            ? undefined
            : '2' + i.toString().padStart(9, '0'),
      }),
      id: i,
      role:
        i < 5
          ? 'SUPER_ADMIN'
          : i < 10
          ? 'ADMIN'
          : i < 15
          ? 'MODERATOR'
          : 'MEMBER',
      avatar_url: `https://avatar.iran.liara.run/public/${i + 1}`,
    } as const
  }),
})
console.log('Users created')
