/* const options = {
    apiVersion: 'v1',
    endpoint: 'http://127.0.0.1:8200',
    token: 's.e4QeGtlSeKDeptnEGOHbSZWN'
};

const vault = require("node-vault")(options);

if (!vault) {
    vault.init({secret_shares: 1, secret_threshold: 1})
        .then((result) => {
            const keys = result.keys;
            vault.token = result.root_token;
            return vault.unseal({secret_shares: 1, key: keys[0]})
        })
        .catch(console.error);
}

module.exports = vault */