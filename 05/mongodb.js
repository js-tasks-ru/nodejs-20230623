const users = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Dmitry' },
  { id: 3, name: 'Anna' },
  { id: 4, name: 'Sergey' },
];

const usersByName = {
  Ivan: users[0],
  Dmitry: users[1],
  Anna: users[2],
  Sergey: users[3],
};

function findByName(name) {
  // return users.find(user => user.name === name);
  return usersByName[name];
}

console.log(findByName("Sergey"));
console.log(findByName("Alex"));