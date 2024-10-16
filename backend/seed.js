import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function main() {
    // Read the residency data from the JSON file
    const dataPath = join(__dirname, 'data', 'residency.json');
    const residencyData = JSON.parse(await fs.readFile(dataPath, 'utf-8'));

    // Transform the data to use `id` instead of `_id`
    const transformedData = residencyData.map(residency => {
        return {
            ...residency,
            id: residency._id?.$oid || residency.id, // Handle cases where `_id` or `$oid` might be missing
            createdAt: new Date(residency.createdAt?.$date || residency.createdAt),
            updatedAt: new Date(residency.updatedAt?.$date || residency.updatedAt)
        };
    });

    // Insert the transformed residency data into the database
    for (const residency of transformedData) {
        try {
            await prisma.residency.create({
                data: {
                    id: residency.id,
                    title: residency.title,
                    description: residency.description,
                    price: residency.price,
                    address: residency.address,
                    city: residency.city,
                    country: residency.country,
                    image: residency.image,
                    userEmail: residency.userEmail,
                    createdAt: residency.createdAt,
                    updatedAt: residency.updatedAt,
                    facilities: residency.facilities
                }
            });
        } catch (error) {
            if (error.code === 'P2002') {
                console.error(`Unique constraint failed for residency with id: ${residency.id}`);
            } else {
                throw error;
            }
        }
    }

    console.log('Residency data has been loaded into the database.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });