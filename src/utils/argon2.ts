import argon2 from 'argon2'

export default {
  generate(input: string) {
    return argon2.hash(input, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
    })
  },

  async check(hash: string, input: string) {
    try {
      return await argon2.verify(hash, input)
    } catch (err) {
      return false
    }
  },
}
