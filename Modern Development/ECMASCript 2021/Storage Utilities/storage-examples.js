// Small usage examples
// local store with prefix
const appStore = localStore('myapp:');
appStore.set('user', { id: 1, name: 'Alex' });
console.log(appStore.get('user')); // {id:1, name:'Alex'}

// session store
const sess = sessionStore('sess:');
sess.set('temp', { foo: 'bar' });
console.log(sess.get('temp'));

// remove and keys
appStore.remove('user');
console.log(sess.keys());
