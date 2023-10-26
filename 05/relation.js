const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.plugin(beautifyUnique);

mongoose.connect('mongodb://localhost/test');

const publisherSchema = new mongoose.Schema({
  name: {
    type: String
  },
  country: {
    type: String,
  }
});
const Publisher = mongoose.model('Publisher', publisherSchema);

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  publisher: {
    type: mongoose.Types.ObjectId,
    ref: 'Publisher'
  }
});
const Book = mongoose.model('Book', bookSchema);

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: [{
    type: mongoose.Types.ObjectId,
    ref: 'Book'
  }]
});
const Author = mongoose.model('Author', authorSchema);

(async function() {
  await Book.deleteMany({});
  await Author.deleteMany({});
  await Publisher.deleteMany({});

  const oreily = await Publisher.create({
    name: "O’Reilly Media, Inc.",
    country: "USA"
  });

  const warAndPeace = await Book.create({title: 'War And Peace', publisher: oreily});
  const annaKarenina = await Book.create({title: 'Anna Karenina', publisher: oreily});
  const hadjiMurad = await Book.create({title: 'Hadji Murad', publisher: oreily});

  const leo = await Author.create({
    name: 'Leo Tolstoy',
    books: [warAndPeace, annaKarenina, hadjiMurad]
  });

  const author = await Author.findOne({name: "Leo Tolstoy"}).populate({
    path: 'books',
    populate: {
      path: 'publisher'
    }
  });
  // const books = await Book.find({_id: {$in: author.books}});

  console.log(author);
  // console.log(books);

})().catch(console.error).then(() => mongoose.disconnect());
