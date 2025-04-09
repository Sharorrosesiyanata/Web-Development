// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const booksData = {
  "books":[
    {
      "title": "Peppa Pig: Practise with Peppa: Wipe-Clean First Writing",
      "link": "https://www.amazon.co.za/Peppa-Pig-Practise-Wipe-Clean-Writing/dp/0241254027/ref=sr_1_6?crid=25BUHNXAZT17U&dib=eyJ2IjoiMSJ9.hVBWxITdNjKbSC_kX5fJoT-wu2hLM-8ELvHBKFDSYwIyADNApNQfZrnRvhedE9XoOYzFAYX2OulLz_22jN3",
      "img": "https://m.media-amazon.com/images/I/81vcVXDvqmL._SL1500_.jpg"
    },
    {
      "title": "Philosophy & Education: An Introduction in Christian Perspective",
      "link": "https://www.amazon.co.za/Philosophy-Education-Introduction-Christian-Perspective/dp/1883925541/ref=sr_1_5?crid=25BUHNXAZT17U&dib=eyJ2IjoiMSJ9.hVBWxITdNjKbSC_kX5fJoT-wu2hLM-8ELvHBKFDSYwIyADNApNQfZrnRvhedE9XoOYzFA",
      "img": "https://m.media-amazon.com/images/I/41A3HF9KCNL.jpg"
    },
    {
      "title": "Educated: The international bestselling memoir",
      "link": "https://www.amazon.co.za/Educated-international-bestselling-Tara-Westover/dp/0099511029/ref=sr_1_3?crid=25BUHNXAZT17U&dib=eyJ2IjoiMSJ9.hVBWxITdNjKbSC_kX5fJoT-wu2hLM-8ELvHBKFDSYwIyADNApNQfZrnRvhedE9XoOYzFAYX2O",
      "img": "https://m.media-amazon.com/images/I/71N2HZwRo3L._SL1500_.jpg"
    }
  ]
};

async function main() {
  console.log('Start seeding...');
  
  // Delete existing data (optional)
  await prisma.book.deleteMany({});
  console.log('Deleted existing books');
  
  // Insert new data
  for (const book of booksData.books) {
    await prisma.book.create({
      data: book
    });
  }
  
  console.log('Seeding finished');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });