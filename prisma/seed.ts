import { env } from "@/env/index.js";
import { prisma } from "@/libs/prisma.js";
import { hash } from "bcryptjs";


export async function seed() {
    await prisma.user.upsert({
        where: {
            email: 'admin@example.com',
        },
        update: {},
        create: {
            publicID: '00000000-0000-0000-0000-000000000001',
            username: 'admin',
            email: 'admin@example.com',
            name: 'Admin',
            passwordHash: await hash('12345678', env.HASH_SALT_ROUNDS),
            role: 'ADMIN'
        },
    })

    console.log('Database seeded successfully!')
}

seed()
    .then(() => {
        prisma.$disconnect()
        process.exit(0)
    })
    .catch((error) => {
        console.error('Error seeding database:', error)
        prisma.$disconnect()
        process.exit(1)
    })