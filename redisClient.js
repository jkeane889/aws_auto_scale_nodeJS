import { createClient } from 'redis';

export const client = createClient({
    host: 'localhost',
    port: 6379
});

export const startRedis = async() => {
    await client.connect();
    await client.ping();
}

export const addRedisUser = () => {
    return new Promise((resolve, reject) => {
        client.get('storedUsers', (error, users) => {
            if (users) {
                var oldUsers = JSON.parse(users);

                console.log('this is oldUsers: ', oldUsers)

                const index = oldUsers.findIndex((u) => u.id === user.id);

                if (index >= 0) {
                    oldUsers[index] = user;
                } else {
                    oldUsers.push(user);
                }

                client.set('storedUsers', JSON.stringify(oldUsers));

                return resolve({
                    users: oldUsers,
                });
            } else {
                return reject({
                    error: true,
                    message: error,
                });
            }
        });
    })
}

const setRedisUsers = (newArray) => {
    return new Promise((resolve, reject) => {
        client.set(
            'storedUsers',
            JSON.stringify(newArray),
            function (err, result) {
                if (err) {
                    return reject({
                        error: true,
                        message: err,
                    });
                }

                return resolve({
                    users: result,
                });
            }
        );
    })
}