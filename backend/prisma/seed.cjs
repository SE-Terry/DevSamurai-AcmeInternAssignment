/* eslint-disable no-console */
const { PrismaClient } = require('../generated/prisma')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

async function main() {
  try {
    // Check if database tables exist by trying to query the user table
    await prisma.user.findFirst()
    console.log('Database tables already exist')
  } catch (error) {
    console.log('Database tables do not exist, creating them...')
    // If tables don't exist, create them using Prisma's push command
    const { execSync } = require('child_process')
    execSync('npx prisma db push', { stdio: 'inherit' })
    console.log('Database tables created successfully')
  }

  // Now seed the data with properly hashed passwords
  const saltRounds = 10
  const devsamuraiPasswordHash = await bcrypt.hash('password123', saltRounds)
  const terryPasswordHash = await bcrypt.hash('password123', saltRounds)
  
  await prisma.user.createMany({
    data: [
      {
        name: 'DevSamurai',
        email: 'devsamurai@devsamurai.com',
        passwordhash: devsamuraiPasswordHash,
      },
      {
        name: 'Terry',
        email: 'se.terry.2004.career@gmail.com',
        passwordhash: terryPasswordHash,
      },
    ],
    skipDuplicates: true,
  })
  console.log('Seed data inserted successfully')
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


