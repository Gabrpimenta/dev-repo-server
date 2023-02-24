import jwt from 'jsonwebtoken';
import User from '../models/User';
import { comparePassword } from '../services/auth';
import authConfig from '../config/auth';

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User / password invalid.' });
    }
    if (!comparePassword(user, password)) {
      return res.status(400).json({ error: 'User / password invalid.' });
    }
    const { id } = user;
    return res.json({
      user: {
        id,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
