import { Users } from '../model/user';

async function onGetUserById (req, res)  {
try {
      const user = await Users.getUserById(req.params.id);
      return res.status(200).json({ success: true, user });
      } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
}
const _onGetUserById = onGetUserById;
export { _onGetUserById as onGetUserById };