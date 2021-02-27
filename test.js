const handler = require('./index');

let promise = (async () => {
    return await handler('', {});
})();
promise.then(console.log).catch(console.error);

let promise2 = (async () => {
    return await handler('', {});
})();
promise2.then(console.log).catch(console.error);
