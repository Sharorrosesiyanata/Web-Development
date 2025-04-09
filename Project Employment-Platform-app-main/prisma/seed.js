const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const applicationsData = {
  "applications":[
    {
      "name": "Samantha Wit",
      "application": "As an educator i am very passionate whin it comes to taking students to the next level. If you are intrested please contact me on this number 111-456-456"
    },
    {
      "name": "Jack Pitt",
      "application": "I am a mechanic operator who team player with unbeated attitude and a willingness until the work is done."
    },
    {
      "name": "Courtney Collens",
      "application": "A personal nurse who is dedicated with expertise in patient-recovery."
    }
  ]
};

async function main() {
  console.log('Start seeding...');
  
  // Delete existing data (optional)
  await prisma.application.deleteMany({});
  console.log('Deleted existing applications');
  
  // Insert new data
  for (const application of applicationsData.applications) {
    await prisma.application.create({
      data: application
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