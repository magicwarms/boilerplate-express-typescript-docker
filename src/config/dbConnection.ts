import { Prisma, PrismaClient } from '@prisma/client';

const getPrismaConnection = (): PrismaClient => {
    if (process.env.NODE_ENV === 'production') {
        const prismaProd = new PrismaClient();
        return prismaProd;
    }
    const prismaDev = new PrismaClient({
        log: [
            {
                emit: 'event',
                level: 'query',
            },
            {
                emit: 'stdout',
                level: 'error',
            },
            {
                emit: 'stdout',
                level: 'info',
            },
            {
                emit: 'stdout',
                level: 'warn',
            },
        ],
    });

    prismaDev.$on('query', (q: Prisma.QueryEvent) => {
        const queryLog = {
            query: q.query,
            params: q.params,
            duration: `${q.duration}ms`,
            timestamp: q.timestamp,
        };
        console.log({ queryLog });
    });

    return prismaDev;
};

export default getPrismaConnection();
