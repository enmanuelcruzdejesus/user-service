const db = require("./config/firebase.js");

async function getAllUsers() {
  const snapshot = await db.ref("users").once("value");
  if (!snapshot.exists()) return [];
  return Object.values(snapshot.val());
}

// Option A: async IIFE
(async () => {
  try {
    const users = await getAllUsers();
    console.log(JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error fetching users:", err);
  }
})();

/* Option B: Promise chain
getAllUsers()
  .then(users => console.log(JSON.stringify(users, null, 2)))
  .catch(err => console.error(err));
*/
