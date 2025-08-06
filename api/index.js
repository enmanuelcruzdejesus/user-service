// File: src/index.js
// -----------------------------------------------------------
// Single entry point that satisfies all requirements:
//   • Sets up middleware
//   • Mounts CRUD routes under /users
//   • Listens on configurable PORT
// -----------------------------------------------------------

require('dotenv').config();            // .env ➜ process.env.*
const express = require('express');
const cors = require('cors');

const app = express();

// Global middleware
app.use(cors());                       // Allow React front-end origin
app.use(express.json());               // Parse JSON request bodies

// Health-check / greeting
app.get('/', (_req, res) =>
  res.send('Welcome to the RentRedi User API!')
);

// Mount User CRUD endpoints
const usersRouter = require('./src/routes/user.route')


app.use('/users', usersRouter);

// ---- Start HTTP server ------------------------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`🚀  API server ready at http://localhost:${PORT}`)
);

// Optional: log truly unhandled errors
process.on('unhandledRejection', (reason) =>
  console.error('[UNHANDLED PROMISE]', reason)
);
process.on('uncaughtException', (err) => {
  console.error('[UNCAUGHT EXCEPTION]', err);
  process.exit(1);
});
