const { MongoClient } = require("mongodb");
const db = require('../config/db');
const connectionString = process.env.DATABASE_URI || "";

async function performOperation(operation) {
  const client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });
  try {
      await client.connect();
      const db = client.db("app");
      const collection = await db.collection('notes');
      const result = await operation(collection);
      if (result) {
          return result;
      } else {
          throw new Error('No matching document found.');
      }
  } catch (error) {
      return 'An error occurred: ' + error.message;
  } finally {
      await client.close();
  }
}

export default db;