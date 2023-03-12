import mongoose from "mongoose";

// object that will hold connection
const connection = {};

// connections are async
async function connect() {
  if (connection.isConnected) {
    console.log("already connected");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("using previous connection");
      return;
    }
    // if it is not ready disconnect
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("new connection");
  connection.isConnected = db.connections[0].readyState;
}

// disconnect function
async function disconnect() {
  if (connection.isConnected) {
    // if in production, disconenct
    // if on local will skip
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = "false";
    } else {
      console.log("not disconnected");
    }
  }
}

// convert timestamps
function convertDocToObj(doc) {
  doc._id = doc.id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();

  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
