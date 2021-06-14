export { };

import {
  CreditType,
  Role,
  Permission,
  SuperAdmin,
  CorporateConfig
} from 'api/models';
import {
  LIST_TEAM_CATEGORIES,
  SUPER_ADMIN_ACCOUNT,
  CORPORATE_CONFIG_DATA,

  //
  PERMISSIONS,
  LIST_ROLE
} from './SuperAdminConfigData';

export async function userPermissions() {
  const permission = new Permission(PERMISSIONS);
  await permission.save();
}

export async function listRoles() {
  Role.insertMany(LIST_ROLE);
}

export async function saveCorporateConfig() {
  await CorporateConfig.insertMany(CORPORATE_CONFIG_DATA);
}

export async function saveCreditTypes() {
  for (const oneCreditType of LIST_TEAM_CATEGORIES) {
    const creditType = new CreditType(oneCreditType);
    await creditType.save();
  }
}

export async function saveSuperAdmin() {
  const superAdmin = new SuperAdmin(SUPER_ADMIN_ACCOUNT);
  await superAdmin.save();
}
