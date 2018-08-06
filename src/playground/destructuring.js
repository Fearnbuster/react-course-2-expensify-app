
// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };

// const { publisher: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

const item = ['Coffee (iced)', '$3.00', '$3.50', '$4.00'];

const [beverage, smallCost, mediumCost, largeCost] = item;

console.log(`A medium ${beverage} costs ${mediumCost}`);