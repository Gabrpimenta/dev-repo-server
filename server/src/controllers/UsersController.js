import User from '../models/User';
import { hashPassword } from '../services/auth';

class UsersController {
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async create(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        return res.status(422).json({ error: `User ${email} already exists.` });
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({
        email,
        password: hashedPassword,
      });
      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      const { email, password } = req.body;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const hashedPassword = await hashPassword(password);

      await user.updateOne({
        email,
        password: hashedPassword,
      });
      return res.status(200).json({ message: 'User updated' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await user.deleteOne();
      return res.status(200).json({ message: 'User deleted' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new UsersController();
