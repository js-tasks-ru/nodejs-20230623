const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique);

mongoose.connect('mongodb://localhost/test');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }]
});

const Book = mongoose.model('Book', bookSchema);

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Author = mongoose.model('Author', authorSchema);

(async function() {
  await Book.deleteMany({});
  await Author.deleteMany({});

  const leo = await Author.create({
    name: 'Leo Tolstoy',
    // books: [warAndPeace, annaKarenina, hadjiMurad]
  });

  const warAndPeace = await Book.create({title: 'War And Peace', author: leo});
  const annaKarenina = await Book.create({title: 'Anna Karenina', author: leo});
  const hadjiMurad = await Book.create({title: 'Hadji Murad', author: leo});

  // const book = await Book.find({ title: 'War And Peace' }).populate('author');
  // console.log(book);

  // const author = await Author.findOne({name: "Leo Tolstoy"}).populate('books');
  // console.log(author);

})().catch(console.error).then(() => mongoose.disconnect());
