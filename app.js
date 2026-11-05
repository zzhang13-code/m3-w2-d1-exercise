const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
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
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => client.close());
