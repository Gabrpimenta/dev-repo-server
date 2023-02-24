import User from '../models/User';
import Repository from '../models/Repository';

class RepoController {
  async index(req, res) {
    try {
      const { user_id } = req.params;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const repositories = await Repository.find({ userId: user_id });
      return res.json(repositories);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async create(req, res) {
    try {
      const { user_id } = req.params;
      const { name, url } = req.body;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const repository = await Repository.findOne({ userId: user_id, name });
      if (repository) {
        return res
          .status(422)
          .json({ error: `Repository ${name} already exists.` });
      }
      const newRepository = await Repository.create({
        userId: user_id,
        name,
        url,
      });
      return res.status(201).json(newRepository);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async delete(req, res) {
    try {
      const { user_id, id } = req.params;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const repository = await Repository.findOne({ userId: user_id, id });
      if (!repository) {
        return res.status(404).json({ error: 'Repository not found' });
      }
      await repository.deleteOne();
      return res.status(204).send();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new RepoController();
