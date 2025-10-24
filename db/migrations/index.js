import dbConnect from "../../src/config/index.js";
import createTable from "../db-table/createTable.js";

const migrations = async () => {
  console.log("Running migrations...");

  const client = await dbConnect.connect();

  try {
    client.query(createTable);
    console.log("Migrations completed successfully.");
  } catch (error) {
    console.error("Error running migrations:", error);
  } finally {
    client.release();
  }
};

export default migrations;
