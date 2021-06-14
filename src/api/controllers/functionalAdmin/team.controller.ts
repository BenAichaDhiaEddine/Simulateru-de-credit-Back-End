export {};
import { NextFunction, Request, Response } from 'express';
const httpStatus = require('http-status');

const { pick } = require('lodash');
const APIError = require('api/utils/APIError');
import { apiJson, startTimer } from '../../utils/Utils';
import { Team, Corporate, User, CreditType } from 'api/models';

const { handler: errorHandler } = require('api/middlewares/error');

/**
 * Load team and append to req.
 * @apiPermission admin
 */
exports.load = async (req: Request, res: Response, next: NextFunction, id: any) => {
  try {
    const team = await Team.get(id);
    req.route.meta = req.route.meta || {};
    req.route.meta.team = team;
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
* @api {get} /teams get all teams
* @apiPermission functionalAdmin
**/
exports.list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    startTimer({ req })
    req.query.corporate = req.route.meta.user.role?.corporate;    
    const data = (await CreditType.list(req)).transform(req)
    apiJson({ req, res, data, model: CreditType })
    res.status(httpStatus.OK)
  } catch (error) {
    return errorHandler(error, req, res)
  }
}

/**
 * create team
 * @apiPermission admin
 */
exports.create = async (req: any, res: Response, next: NextFunction) => {
  try {
    const admin = req.route.meta.user;

    let team = pick(req.body, ['creditType', 'teamLeader', 'members']);

    //check if admin has already a corporate
    const corporate = await Corporate.findOne({ manager: admin._id });

    if (corporate) {
      team.corporate = corporate._id;

      //check if exist team with the same creditType

      const checkCreditType = await Team.getByCategoryId(team.creditType);

      if (!checkCreditType) {
        if (team.members) {
          //remove teamLeader from member if exist
          const index = team.members.indexOf(team.teamLeader);
          if (index > -1) {
            team.members.splice(index, 1);
          }
        }
        console.log({ team });

        // Create a team
        const teamObj = new Team({ ...team });
        //save the team
        const saveTeam = await teamObj.save();

        //add team in list teams of members
        saveTeam.members.forEach(async (element: any) => {
          const user = await User.findById(element);
          if (user) {
            user.teams.push(saveTeam._id);
            user.save();
          }
        });
        const leader = await User.findById(saveTeam.teamLeader);
        if (leader) {
          leader.teams.push(saveTeam._id);
          leader.save();
        }
        Team.populate(saveTeam, ['creditType', 'teamLeader', 'members'], (err: any, saveTeam: any) => {
          if (err) errorHandler(err, req, res);

          return res.json(saveTeam.transform());
        });
      } else {
        throw new APIError({
          message: 'Exist team with the same category',
          status: httpStatus.UNAUTHORIZED
        });
      }
    } else {
      throw new APIError({
        message: 'admin must be assigned to corporate ',
        status: httpStatus.NOT_ACCEPTABLE
      });
    }
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * @api /teams/:id update a team
 * @apiPermission admin
 **/

exports.update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { team } = req.route.meta;
    const body = pick(req.body, ['teamLeader', 'members', 'isEnabled']);
    const ids = team.members.map((item: any) => item._id && item._id.toString());
    const oldLeader = team.teamLeader;

    //update object team
    let updatedTeam = Object.assign(team, body);

    //remove teamLeader from member if exist
    updatedTeam.members = updatedTeam.members.filter((member: any) => {
      return member.toString() != updatedTeam.teamLeader.toString();
    });

    //updateOldLeader
    if (oldLeader._id.toString() != req.body.teamLeader.toString()) {
      const leader = await User.findById(updatedTeam.teamLeader);
      if (leader) {
        if (leader.teams.indexOf(updatedTeam._id) == -1) {
          leader.teams.push(updatedTeam._id);
          leader.save();
        }
      }
      await User.findOneAndUpdate({ _id: oldLeader._id }, { $pull: { teams: team._id } });
    }

    let dataMembers: any[] = [];

    //update members
    if (body.members) {
      let oldMembers = new Set(ids);
      //add team in list teams of members
      updatedTeam.members.forEach(async (element: any) => {
        dataMembers.push(
          new Promise(async (resolve, reject) => {
            if (oldMembers.has(element.toString())) {
              oldMembers.delete(element.toString());
              return;
            }
            const user = await User.findById(element);
            if (user && user.teams.indexOf(updatedTeam._id) == -1) {
              user.teams.push(updatedTeam._id);
              const result = user.save();
              resolve(result);
            }
          })
        );
      });

      Promise.all(dataMembers);
      for (let member of oldMembers) {
        if (member != updatedTeam.teamLeader.toString()) {
          await User.findOneAndUpdate({ _id: member }, { $pull: { teams: team._id } });
        }
      }
    }

    Team.populate(updatedTeam, ['creditType', 'teamLeader', 'members'], (err: any, updatedTeam: any) => {
      if (err) return errorHandler(err, req, res);

      //remove teamLeader from member if exist
      updatedTeam.members = updatedTeam.members.filter((member: any) => {
        return member._id.toString() != updatedTeam.teamLeader._id.toString();
      });

      updatedTeam.save().then((savedTeam: any) => res.json(savedTeam.transform()));
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * @api /teams/:id remove a team
 * @apiPermission admin
 **/

exports.remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { team } = req.route.meta;
    console.log({ team });

    await team.remove();
    return res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

