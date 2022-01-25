const redis = require('redis');

const client = redis.createClient({
    host: 'redis-cluster-test.sufcdc.clustercfg.use1.cache.amazonaws.com',
    port: 6379,
});

client.on('error', err => {
    console.log('Error ' + err);
});

export function addRedisUser(user) {
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
    });
}

export function setRedisUsers(newArray) {
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
    });
}