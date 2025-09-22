/* eslint-disable no-console */
const { PrismaClient } = require('../generated/prisma')

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        email: 'alice@example.com',
        passwordhash: 'hash-alice',
      },
      {
        name: 'Bob',
        email: 'bob@example.com',
        passwordhash: 'hash-bob',
      },
    ],
    skipDuplicates: true,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Seed completed')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


