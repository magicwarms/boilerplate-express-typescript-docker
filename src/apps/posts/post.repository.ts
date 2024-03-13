import DBConnection from '../../config/dbConnection';

export const findAllPosts = async () => {
    return DBConnection.post.findMany({
        orderBy: {
            created_at: 'asc',
        },
    });
};