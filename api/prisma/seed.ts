import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const genreRecords = [
  {
    name: "Fiction",
    description: "Novels, short stories, and imaginative literature.",
  },
  {
    name: "Science",
    description: "Books exploring scientific discoveries and ideas.",
  },
  {
    name: "History",
    description: "Books about historical events and human civilization.",
  },
  {
    name: "Technology",
    description: "Books about software, computing, and modern technology.",
  },
];

const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "9780061120084",
    description: "A novel exploring justice, morality, and childhood.",
    publishedAt: "1960-07-11",
    genre: "Fiction",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "9780141439518",
    description: "A classic novel about love, family, and social class.",
    publishedAt: "1813-01-28",
    genre: "Fiction",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "9780743273565",
    description: "A novel exploring ambition, wealth, and the American Dream.",
    publishedAt: "1925-04-10",
    genre: "Fiction",
  },
  {
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    isbn: "9780385474542",
    description: "A novel about Igbo society and the effects of colonialism.",
    publishedAt: "1958-06-17",
    genre: "Fiction",
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    isbn: "9780553380163",
    description: "An introduction to cosmology and the nature of the universe.",
    publishedAt: "1988-04-01",
    genre: "Science",
  },
  {
    title: "Cosmos",
    author: "Carl Sagan",
    isbn: "9780345539434",
    description: "An exploration of the universe and scientific discovery.",
    publishedAt: "1980-01-01",
    genre: "Science",
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    isbn: "9780198788607",
    description: "An influential explanation of evolution and gene-centered selection.",
    publishedAt: "1976-01-01",
    genre: "Science",
  },
  {
    title: "The Gene",
    author: "Siddhartha Mukherjee",
    isbn: "9781501127625",
    description: "A history of genetics and the science of heredity.",
    publishedAt: "2016-05-17",
    genre: "Science",
  },
  {
    title: "Guns, Germs, and Steel",
    author: "Jared Diamond",
    isbn: "9780393354324",
    description: "An examination of the factors shaping human societies.",
    publishedAt: "1997-03-01",
    genre: "History",
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    isbn: "9780062316097",
    description: "A history of humankind from early humans to modern society.",
    publishedAt: "2011-01-01",
    genre: "History",
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    isbn: "9780553296983",
    description: "The diary of a young girl during World War II.",
    publishedAt: "1947-06-25",
    genre: "History",
  },
  {
    title: "Long Walk to Freedom",
    author: "Nelson Mandela",
    isbn: "9780316548182",
    description: "Nelson Mandela's autobiography and account of his life.",
    publishedAt: "1994-01-01",
    genre: "History",
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    description: "Practical principles for writing readable and maintainable software.",
    publishedAt: "2008-08-01",
    genre: "Technology",
  },
  {
    title: "The Pragmatic Programmer",
    author: "David Thomas and Andrew Hunt",
    isbn: "9780135957059",
    description: "Guidance on software craftsmanship and professional programming.",
    publishedAt: "2019-09-13",
    genre: "Technology",
  },
  {
    title: "Code",
    author: "Charles Petzold",
    isbn: "9780735611313",
    description: "An explanation of how computers work from first principles.",
    publishedAt: "2000-10-11",
    genre: "Technology",
  },
];

async function main() {
  const genreIds = new Map<string, number>();

  for (const genre of genreRecords) {
    const savedGenre = await prisma.genre.upsert({
      where: { name: genre.name },
      update: { description: genre.description },
      create: genre,
    });

    genreIds.set(savedGenre.name, savedGenre.id);
  }

  for (const book of books) {
    const genreId = genreIds.get(book.genre);

    if (!genreId) {
      throw new Error(`Genre not found: ${book.genre}`);
    }

    const bookData = {
      title: book.title,
      author: book.author,
      description: book.description,
      publishedAt: new Date(book.publishedAt),
      genreId,
    };

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: bookData,
      create: {
        ...bookData,
        isbn: book.isbn,
      },
    });
  }

  const [genreCount, bookCount] = await Promise.all([
    prisma.genre.count(),
    prisma.book.count(),
  ]);

  console.log("Database seeding completed successfully!");
  console.log(`Genres in database: ${genreCount}`);
  console.log(`Books in database: ${bookCount}`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
