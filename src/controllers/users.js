import { registereUser } from '../services/users.js';

export const createUserController = async (req, res) => {
  const user = await registereUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
