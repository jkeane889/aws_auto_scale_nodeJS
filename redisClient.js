const redis = require('redis');

class RedisManager {
    constructor() {
      this.HOST = 'redis-cluster-test.sufcdc.clustercfg.use1.cache.amazonaws.com';
      this.PORT = 6379;
      //this.AUTH_PASS = auth_pass;
  
      this.client = redis.createClient({
        host: this.HOST,
        port: this.PORT,
        //  auth_pass: this.AUTH_PASS
      });
    }

    addRedisUser(user) {
        return new Promise((resolve, reject) => {
            this.client.get('storedUsers', (error, users) => {
                if (users) {
                    var oldUsers = JSON.parse(users);

                    console.log('this is oldUsers: ', oldUsers)

                    const index = oldUsers.findIndex((u) => u.id === user.id);

                    if (index >= 0) {
                        oldUsers[index] = user;
                    } else {
                        oldUsers.push(user);
                    }

                    this.client.set('storedUsers', JSON.stringify(oldUsers));

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

    setRedisUsers(newArray) {
        return new Promise((resolve, reject) => {
            this.client.set(
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
}

module.exports = RedisManager;