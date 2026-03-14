const fs = require("fs");
const path = require("path");

async function runMigrations() {

  try {

    console.log("Running migrations...");

    const migrationsPath = path.join(__dirname, "migrations");
    const files = fs.readdirSync(migrationsPath).sort();

    for (const file of files) {

      console.log(`Running migration: ${file}`);

      const migration = require(`./migrations/${file}`);

      if (migration.up) {
        await migration.up();
      }

    }

    console.log("✅ All migrations completed");

  } catch (error) {

    console.error("❌ Migration failed:", error);

  }

}

runMigrations();