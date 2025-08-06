const { usersRef } = require('../config/firebase');
const { enrichLocation } = require('./geocode.service');

/** List all users */
async function listUsers() {
  const snap = await usersRef.once('value');
  return Object.values(snap.val() || {});
}

/** Get a single user (returns null if not found) */
async function getUserById(id) {
  const snap = await usersRef.child(id).once('value');
  return snap.exists() ? snap.val() : null;
}

/** Create user — payload should contain { name, zip } */
async function createUser({ name, zip }) {
  if (!name || !zip) {
    const err = new Error('Both name and zip are required');
    err.status = 400;
    throw err;
  }

  // Enrich with lat, lon, timezone
  const location = await enrichLocation(zip);

  // Let Firebase assign the ID
  const ref = usersRef.push();
  const id = ref.key;

  const user = {
    id,
    name,
    zipCode: zip,
    ...location,
  };

  await ref.set(user);
  return user;
}

/** Update user — payload may include name and/or zip */
async function updateUser(id, payload) {
  const snap = await usersRef.child(id).once('value');
  if (!snap.exists()) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  let updated = { ...snap.val() };

  if (payload.name) updated.name = payload.name;
  if (payload.zip) {
    updated.zipCode = payload.zip;
    const loc = await enrichLocation(payload.zip);
    updated = { ...updated, ...loc };
  }

  await usersRef.child(id).update(updated);
  return updated;
}

/** Delete a user */
async function deleteUser(id) {
  await usersRef.child(id).remove();
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};