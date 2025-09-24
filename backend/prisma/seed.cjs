/* eslint-disable no-console */
const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs')

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

  // Seed the data with properly hashed passwords - for development
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

  // Seed chart_data from dummy_data.json
  try {
    const dummyPath = path.resolve(__dirname, 'dummy_data.json')
    const raw = fs.readFileSync(dummyPath, 'utf8')
    const items = JSON.parse(raw)
    if (Array.isArray(items) && items.length > 0) {
      // Upsert each record to avoid duplicates
      for (const item of items) {
        await prisma.chart_data.upsert({
          where: { date: item.date },
          update: { people: item.people, companies: item.companies },
          create: { date: item.date, people: item.people, companies: item.companies },
        })
      }
      console.log('chart_data seeded from dummy_data.json')
    } else {
      console.log('dummy_data.json is empty or not an array')
    }
  } catch (err) {
    console.error('Failed to seed chart_data:', err)
  }
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


