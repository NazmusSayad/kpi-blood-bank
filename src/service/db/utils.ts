import { BloodGroup } from '@prisma/client'

export function convertBloodGroupToNormal(group: BloodGroup) {
  return group.replace('_POSITIVE', '+').replace('_NEGATIVE', '-')
}
