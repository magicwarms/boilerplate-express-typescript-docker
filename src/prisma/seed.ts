import PrismaConnection from './../config/dbConnection';

const prisma = PrismaConnection;

async function main() {
    await prisma.post.upsert({
        where: { id: 1 },
        update: {},
        create: {
            title: 'Introduction to SQL',
            description: 'Learn the basics of SQL',
            author: 'John Doe',
            content: 'SQL is a powerful language for managing relational databases.'
        },
    });
    await prisma.post.upsert({
        where: { id: 2 },
        update: {},
        create: {
            title: 'Web Development Tips',
            description: 'Tips for building modern web applications',
            author: 'Jane Thor',
            content: 'Stay updated with the latest web development trends and best practices.'
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
