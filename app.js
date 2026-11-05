const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const customers = [
  { name: 'John', address: 'Highway 71'},
  { name: 'Peter', address: 'Lowstreet 4'},
  { name: 'Amy', address: 'Apple st 652'},
  { name: 'Hannah', address: 'Mountain 21'},
  { name: 'Michael', address: 'Valley 345'},
  { name: 'Sandy', address: 'Ocean blvd 2'},
  { name: 'Betty', address: 'Green Grass 1'},
  { name: 'Richard', address: 'Sky st 331'},
  { name: 'Susan', address: 'One way 98'},
  { name: 'Vicky', address: 'Yellow Garden 2'},
  { name: 'Ben', address: 'Park Lane 38'},
  { name: 'William', address: 'Central st 954'},
  { name: 'Chuck', address: 'Main Road 989'},
  { name: 'Viola', address: 'Sideway 1633'},
];

async function main() {
  await client.connect();
  const db = client.db('nodemongo');

  const existing = await db.listCollections({ name: 'customers' }).toArray();
  if (existing.length === 0) {
    await db.createCollection('customers');
    console.log('Database created!');
    console.log('Collection created!');
  }
  const collection = db.collection('customers');

  await collection.insertOne({ name: 'Westcliff Inc', address: 'Irvine, CA' });
  console.log('1 document inserted');

  const inserted = await collection.insertMany(customers);
  console.log(`Number of documents inserted: ${inserted.insertedCount}`);

  const first = await collection.findOne({ name: 'Westcliff Inc' });
  console.log(first.name);

  const matches = await collection.find({ address: 'Park Lane 38' }).toArray();
  console.log(matches);

  const sorted = await collection.find().sort({ name: 1 }).toArray();
  console.log(sorted);

 }

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => client.close());
