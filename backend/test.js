import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    // Create a new user
    const newUser = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            image: 'https://example.com/john.jpg',
            bookedVisits: [],
            favResidenciesID: []
        }
    });
    console.log('New User:', newUser);

    // Create a new residency
    const newResidency = await prisma.residency.create({
        data: {
            title: 'Beautiful Apartment',
            description: 'A beautiful apartment in the city center.',
            price: 1200,
            address: '123 Main St',
            city: 'Nairobi',
            country: 'Kenya',
            image: 'https://example.com/apartment.jpg',
            facilities: { wifi: true, parking: true },
            userEmail: newUser.email
        }
    });
    console.log('New Residency:', newResidency);

    // Fetch all residencies
    const allResidencies = await prisma.residency.findMany();
    console.log('All Residencies:', allResidencies);
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });