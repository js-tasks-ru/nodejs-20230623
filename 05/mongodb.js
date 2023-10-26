const users = [
  { id: 1, name: 'Ivan' },
  { id: 3, name: 'Anna111' },
  { id: 4, name: 'Sergey' },
  { id: 5, name: 'Alex' },
];

const usersByName = {
  Ivan: users[0],
  Anna111: users[1],
  Sergey: users[2],
  Alex: users[3],
};

function findByName(name) {
  // return users.find(user => user.name === name);
  return usersByName[name];
}

console.log(findByName('Ivan'));
console.log(findByName('Dmitry'));
