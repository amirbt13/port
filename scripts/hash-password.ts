// Generate a bcrypt hash for the admin password.
// Usage: npm run hash-password -- "yourPassword"
import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- "yourPassword"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
console.log("\nAdd this to .env.local (and your Vercel env vars):\n");
console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
