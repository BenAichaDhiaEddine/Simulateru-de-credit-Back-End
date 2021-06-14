export { };
import { Role } from 'api/models';

export const can = (roles: any = '') => async (req: any, res: any, next: any) => {
  try {
    const methode = roles.split('_')[0]
    const entity = roles.split('_')[1]

    const role = await Role.findById(req.route.meta.user.role, { permission: 1 }).populate('permission')
    if (role.permission[entity][methode]) {
      return next();
    } else {
      res.status(415).send("u can't do that contact your superiors");
    }

  } catch (error) {
    console.error('pass your permission to the middleware can', error)
  }
};
