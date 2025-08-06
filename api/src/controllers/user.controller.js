const userService = require('../services/user.service');

/**
 * GET /users
 */
exports.listUsers = async (_req, res) => {
  const users = await userService.listUsers();
  res.json(users);
};

/**
 * GET /users/:id
 */
exports.getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};

/**
 * POST /users
 * (body validated by validateSchema middleware)
 */
exports.createUser = async (req, res) => {
  const newUser = await userService.createUser(req.body);
  res.status(201).json(newUser);
};

/**
 * PUT /users/:id
 */
exports.updateUser = async (req, res) => {
  const updated = await userService.updateUser(req.params.id, req.body);
  res.json(updated);
};

/**
 * DELETE /users/:id
 */
exports.deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).end();
};

/**
 * GET /users/:id/localtime
 * Returns current local time in user’s timezone.
 */
exports.getLocalTime = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  const iso = new Date(Date.now() + user.timezone * 1000).toISOString();
  res.json({ localTime: iso });
};