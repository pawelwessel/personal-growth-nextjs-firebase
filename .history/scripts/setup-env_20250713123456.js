#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log(
  "🚀 Setting up environment variables for Personal Growth Next.js Firebase project...\n"
);

// Check if .env.local already exists
const envLocalPath = path.join(process.cwd(), ".env.local");
const envExamplePath = path.join(process.cwd(), "env.example");

if (fs.existsSync(envLocalPath)) {
  console.log("⚠️  .env.local already exists!");
  console.log(
    "   If you want to start fresh, delete .env.local and run this script again.\n"
  );
} else {
  // Check if env.example exists
  if (!fs.existsSync(envExamplePath)) {
    console.log("❌ env.example file not found!");
    console.log(
      "   Please make sure the env.example file exists in the project root.\n"
    );
    process.exit(1);
  }

  try {
    // Copy env.example to .env.local
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log("✅ Successfully created .env.local from env.example");
    console.log("📝 Please edit .env.local with your actual values\n");
  } catch (error) {
    console.log("❌ Error creating .env.local:", error.message);
    process.exit(1);
  }
}

console.log("📋 Next steps:");
console.log(
  "   1. Edit .env.local with your actual API keys and configuration"
);
console.log(
  "   2. Get Firebase config from: https://console.firebase.google.com/"
);
console.log("   3. Get Stripe keys from: https://dashboard.stripe.com/");
console.log("   4. Get OpenAI key from: https://platform.openai.com/");
console.log("   5. Update the site URLs to match your domain");
console.log("\n📖 For detailed instructions, see: ENVIRONMENT_SETUP.md");
console.log(
  "\n🔒 Remember: .env.local is already in .gitignore and will not be committed to version control"
);
