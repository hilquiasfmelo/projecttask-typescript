import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';

import Users from '../models/Users';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const userRouter = Router();
const upload = multer(uploadConfig);

interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  created_at: Date;
  updated_at: Date;
}

userRouter.get('/', async (request, response) => {
  const usersRepository = getRepository(Users);
  const users = await usersRepository.find();

  return response.json(users);
});

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  const updateUser: IUser = { ...user };

  delete updateUser.password;

  return response.json(updateUser);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    const updateUser: IUser = { ...user };

    delete updateUser.password;

    return response.json(updateUser);
  },
);

export default userRouter;
