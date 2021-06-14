export { };
import {
  User
} from 'api/models';
import {
  saveCreditTypes,
  saveSuperAdmin,
  userPermissions,
  listRoles
} from './saveSuperAdminInitData';

async function setup() {
  await listRoles();
  await userPermissions();
  await saveSuperAdmin();
  await saveCreditTypes();
}


async function checkIfCorporateConfigNotExistThenInitTheApp() {
  const user = await User.findOne();
  if (!user) {
    console.log('- New DB detected ===> Initializing Dev Data...');
    await setup();
  } else {
    console.log('- Skip Init Config Data For The App');
  }
}


checkIfCorporateConfigNotExistThenInitTheApp();
