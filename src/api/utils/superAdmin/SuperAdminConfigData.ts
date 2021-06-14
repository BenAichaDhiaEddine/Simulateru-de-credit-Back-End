/***
 *  In This File i save all the initial Data to start the app.
 */

const { SUPER_ADMIN_AUTH_EMAIL, SUPER_ADMIN_AUTH_PASSWORD } = require('config/vars');
const { SUPER_ADMIN } = require('../Const')
/******************************************************************
 *  Features Items Model
 *******************************************************************/

export const SFTP_CONFIG_SERVER_TEST = {
  name: 'test_sftp_server',
  ip: '0.0.0.0',
  port: '22',
  customId: 'SFTP_CONFIG_SERVER_TEST'
};
export const ID_SFTP_CONFIG_SERVER_TEST = 'SFTP_CONFIG_SERVER_TEST';

/******************************************************************
 *  Permission Model
 *******************************************************************/

export const PERMISSIONS = {
  user: {
    create: true,
    read: true,
    update: true,
    delete: true
  },
  corporate: {
    create: true,
    read: true,
    update: true,
    delete: true
  },
  corporateConfig: {
    create: true,
    read: true,
    update: true,
    delete: true
  },
  corporateGeographies: {
    create: true,
    read: true,
    update: true,
    delete: true
  },
  creditTypes: {
    create: true,
    read: true,
    update: true,
    delete: true
  },
  permissions: {
    create: true,
    read: true,
    update: true,
    delete: true
  }
};

/******************************************************************
 *  Permission Model
 *******************************************************************/

export const LIST_ROLE = [
  {
    slug: 'admin-fonctionnel',
    name: {
      ar: 'Admin fonctionnel AR',
      fr: 'Admin fonctionnel'
    }
  },
  {
    slug: 'citoyen',
    name: {
      ar: 'Citoyen AR',
      fr: 'Citoyen'
    }
  },
  {
    slug: 'citoyen-pro',
    name: {
      ar: 'Citoyen Pro AR',
      fr: 'Citoyen Pro'
    }
  },
  {
    slug: 'guichet-unique',
    name: {
      ar: 'Guichet Unique AR',
      fr: 'Guichet Unique'
    }
  },
  {
    slug: 'services',
    name: {
      ar: 'Services AR',
      fr: 'Services'
    }
  },
  {
    slug: 'maire',
    name: {
      ar: 'Maire AR',
      fr: 'Maire'
    }
  }
];

/******************************************************************
 *  Features Items Model
 *******************************************************************/

export const FEATURE_ITEM_SIGNS = {
  name: {
    ar: 'يعلم',
    fr: 'Signs'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  type: 'featureItems',
  customId: 'FEATURE_ITEM_SIGNS'
};

export const FEATURE_ITEM_TERRACES = {
  name: {
    ar: 'التراسات',
    fr: 'Terrasses'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  type: 'featureItems',
  customId: 'FEATURE_ITEM_TERRACES'

};

export const FEATURE_ITEM_SINGLE_WINDOW = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Single Window'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  type: 'featureItems',
  customId: 'FEATURE_ITEM_SINGLE_WINDOW'

};

export const FEATURE_ITEM_CITZEN_PRO = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Citizesn Pro'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  type: 'featureItems',
  customId: 'FEATURE_ITEM_CITZEN_PRO'
};

export const FEATURE_ITEM_ORGANISATION = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Organizations'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  type: 'featureItems',
  customId: 'FEATURE_ITEM_ORGANISATION'
};

export const FEATURE_ITEM_INVOICES = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Invoices'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  type: 'featureItems',
  customId: 'FEATURE_ITEM_INVOICES'
};

export const FEATURE_ITEM_PERMIT = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Invoices'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  type: 'featureItems',
  customId: 'FEATURE_ITEM_PERMIT'
};

export const FEATURES_ITEMS = [
  FEATURE_ITEM_SIGNS,
  FEATURE_ITEM_TERRACES,
  FEATURE_ITEM_SINGLE_WINDOW,
  FEATURE_ITEM_CITZEN_PRO,
  FEATURE_ITEM_ORGANISATION,
  FEATURE_ITEM_INVOICES,
  FEATURE_ITEM_PERMIT
] as const;

/*******************************************************************
 *  FeatureItemCategory Model
 *******************************************************************/

export const FEATURE_CATEGORY_DOMAIN_PUBLIC = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Domaine Public'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  subFeatures: [],
  type: 'featureItemCategories',
  customId: 'FEATURE_CATEGORY_DOMAIN_PUBLIC'
};

export const FEATURE_CATEGORY_CRUD = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'CRUD'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  subFeatures: [],
  type: 'featureItemCategories',
  customId: 'FEATURE_CATEGORY_CRUD'
};

export const FEATURE_ITEMS_OF_CATEGORY_PUBLIC = [
  FEATURE_ITEM_SIGNS,
  FEATURE_ITEM_TERRACES
] as const;

export const FEATURE_ITEMS_OF_CATEGORY_CRUD = [
  FEATURE_ITEM_SINGLE_WINDOW,
  FEATURE_ITEM_CITZEN_PRO,
  FEATURE_ITEM_ORGANISATION,
  FEATURE_ITEM_INVOICES,
  FEATURE_ITEM_PERMIT
] as const;

/*****************************************************************
 * SubFeatures Model
 *****************************************************************/
export const SUB_FEATURE_REQUEST_SYSTEM = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Request System'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  subFeatures: [],
  type: 'subFeatures',
  customId: 'SUB_FEATURE_REQUEST_SYSTEM'

};

export const SUB_FEATURE_PERMIT_MANAGEMENT = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Permit Management'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  subFeatures: [],
  type: 'subFeatures',
  customId: 'SUB_FEATURE_PERMIT_MANAGEMENT'
};

export const SUB_FEATURE_STATISTIC = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Statistics'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  subFeatures: [],
  type: 'subFeatures',
  customId: 'SUB_FEATURE_STATISTIC'
};

export const SUB_FEATURE_E_PAYMENT = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'e-Payment'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  subFeatures: [],
  type: 'subFeatures',
  customId: 'SUB_FEATURE_E_PAYMENT'
};

export const SUB_FEATURE_DIGITAL_SIGN = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Digital Sign'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  subFeatures: [],
  type: 'subFeatures',
  customId: 'SUB_FEATURE_DIGITAL_SIGN'
};

export const SUB_FEATURES = [
  SUB_FEATURE_REQUEST_SYSTEM,
  SUB_FEATURE_PERMIT_MANAGEMENT,
  SUB_FEATURE_STATISTIC,
  SUB_FEATURE_E_PAYMENT,
  SUB_FEATURE_DIGITAL_SIGN
];
export const IDS_SUB_FEATURES = [

  'SUB_FEATURE_PERMIT_MANAGEMENT',
  'SUB_FEATURE_STATISTIC',
  'SUB_FEATURE_E_PAYMENT',
  'SUB_FEATURE_DIGITAL_SIGN',
  'SUB_FEATURE_REQUEST_SYSTEM'
];

export const IDS_CATEGORIES_SUB_FEATURE_REQUEST_SYSTEM = [
  'FEATURE_CATEGORY_DOMAIN_PUBLIC'
];

export const IDS_CATEGORIES_SUB_FEATURE_PERMIT_MANAGEMENT = [
  'FEATURE_CATEGORY_CRUD'
];

/*****************************************************************
 * Features Model
 *****************************************************************/
export const FEATURE_PERMIT_SYSTEM = {
  name: {
    ar: 'لتغيير هذا الوصف',
    fr: 'Permit System'
  },
  description: {
    ar: 'لتغيير هذا الوصف',
    fr: 'to change this discription '
  },
  available: true,
  subFeatures: [],
  type: 'features',
  customId: 'FEATURE_PERMIT_SYSTEM'
};

export const ID_FEATURE_PERMIT_SYSTEM = 'FEATURE_PERMIT_SYSTEM';

/*****************************************************************
 * CorporateConfig Model
 *****************************************************************/
export const CORPORATE_CONFIG = {
  name: {
    fr: 'Golbal Corporate Config',
    ar: 'Golbal Corporate Config Ar'
  },
  description: 'this is the global File of the standart Corporate',
  features: [],
  customId: 'CORPORATE_CONFIG',

};

/*****************************************************************
 *  Organisation Type Model
 ******************************************ID_ORGANISATION_TYPE_1***********************/
export const ORGANISATION_TYPE_1 = {
  name: {
    ar: 'شركة',
    fr: 'society'
  },
  description: 'this is the global File of the Corporate',
  categories: [],
  customId: 'ORGANISATION_TYPE_1'
};

export const ID_ORGANISATION_TYPE_1 = 'ORGANISATION_TYPE_1';

/*****************************************************************
 *  Organisation Category Model
 *****************************************************************/

export const ORGANISATION_CATEGORY_1 = {
  name: {
    ar: 'مجوهرات',
    fr: 'jewellery'
  },
  description: 'specialty coffee',
  customId: 'ORGANISATION_CATEGORY_1'
};

export const ORGANISATION_CATEGORY_2 = {
  name: {
    ar: 'رعاية الطفل',
    fr: 'specialty shop'
  },
  description: 'specialty shop',
  customId: 'ORGANISATION_CATEGORY_2'
};

export const LIST_ORGANISATION_CATEGORIES = [
  ORGANISATION_CATEGORY_1,
  ORGANISATION_CATEGORY_2
];

/*****************************************************************
 *  Team Category Model
 *****************************************************************/
export const TEAM_CATEGORY_1 = {
  name: {
    ar: 'فريق الدعم',
    fr: 'support-Team'
  },
  description: 'support',
  customId: 'TEAM_CATEGORY_1',
  iconPath: '/path/to/icon',
  enabled: true
};

export const TEAM_CATEGORY_2 = {
  name: {
    ar: 'فريق التطوير',
    fr: 'dev-Team'
  },
  description: 'dev-Team',
  customId: 'TEAM_CATEGORY_2',
  iconPath: '/path/to/this/iconPath',
  enabled: false
};

export const LIST_TEAM_CATEGORIES = [
  TEAM_CATEGORY_1,
  TEAM_CATEGORY_2
];
/*****************************************************************
 *  Request Status Model
 *****************************************************************/
export const STATUS_REQUEST_1 = {
  name: {
    ar: 'رفض',
    fr: 'denied'
  },
  color: '#FFF',
  icon: '/path',
  customId: 'STATUS_REQUEST_1'
};

export const STATUS_REQUEST_2 = {
  name: {
    ar: 'قبلت',
    fr: 'accepted'
  },
  color: '#FFF',
  icon: '/path',
  customId: 'STATUS_REQUEST_2'
};

export const LIST_STATUS_REQUEST = [
  STATUS_REQUEST_1,
  STATUS_REQUEST_2
];

export const SUPER_ADMIN_ACCOUNT = {
  email: SUPER_ADMIN_AUTH_EMAIL, //go to .env
  password: SUPER_ADMIN_AUTH_PASSWORD,
  type: SUPER_ADMIN
};

/*****************************************************************
 *  Request Super Config Model
 *****************************************************************/

export const REQUEST_SUPER_CONFIG_TO_MANAGE_SIGNS = {
  featureItem: null,
  name: {
    ar: 'Request Super Config manage Sign',
    fr: 'Request Super Config manage Sign'
  },
  processConfig: null,
  citizenRequestOwner: true,
  organisationRequestOwner: false,
  citizenRequestIssuer: true,
  organisationRequestIssuer: false,
  defaultDeadLinePeriod: Date.now(),
  defaultPermitExpirationPeriod: Date.now(),
  defaultInvoiceDuePeriod: Date.now(),
  defaultMessengerIsActive: true,
  defaultUploadFilesIsActive: true,
  defaultUploadMaxSize: '200',
  customId: 'REQUEST_SUPER_CONFIG_TO_MANAGE_SIGNS'
};

/*****************************************************************
 *  Route List
 *****************************************************************/

export const ROUTE_LIST = [
  {
    slug: 'employee-login',
    name: ' Employee Login',
    description: 'Get an accessToken',
    apiUrl: '/admin/auth/login',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  },
  {
    slug: 'employee-refresh-token',
    name: 'Employee Refresh Token',
    description: 'Refresh expired accessToken',
    apiUrl: '/admin/auth/refresh-token',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  },
  {
    slug: 'employee-forget-password',
    name: 'Employee Forget Password',
    description: 'Receive a new temporary password',
    apiUrl: '/admin/auth/forgot-password',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  },
  {
    slug: 'citizen-login',
    name: ' Citizen Login',
    description: 'Get an accessToken',
    apiUrl: '/citizen/auth/login',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'citizen',
    active: true
  },
  {
    slug: 'citizen-refresh-token',
    name: 'Citizen Refresh Token',
    description: 'Refresh expired accessToken',
    apiUrl: '/citizen/auth/refresh-token',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'citizen',
    active: true
  },
  {
    slug: 'citizen-forget-password',
    name: 'Citizen Forget Password',
    description: 'Receive a new temporary password',
    apiUrl: '/citizen/auth/forgot-password',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'citizen',
    active: true
  },
  {
    slug: 'citizen-register',
    name: 'Citizen Register',
    description: 'Register a new user',
    apiUrl: '/citizen/auth/register',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'citizen',
    active: true
  },
  {
    slug: 'Google-login',
    name: 'Google Login',
    description: 'Login with google. Creates a new user if it does not exist',
    apiUrl: '/citizen/auth/google',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'citizen',
    active: true
  },
  {
    slug: 'facebook-login',
    name: 'Facebook Login',
    description: 'Login with facebook. Creates a new user if it does not exist',
    apiUrl: '/citizen/auth/facebook',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'citizen',
    active: true
  },
  {
    slug: 'create-user',
    name: 'Create User',
    description: 'Create a new user',
    apiUrl: '/admin/users',
    frontUrl: '',
    method: 'POST',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  },
  {
    slug: 'delete-user',
    name: 'Delete User',
    description: 'Delete a user',
    apiUrl: '/admin/users/:id',
    frontUrl: '',
    method: 'DELETE',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  },
  {
    slug: 'get-user',
    name: 'Get User',
    description: 'Get a User',
    apiUrl: '/admin/users/:id',
    frontUrl: '',
    method: 'GET',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  },
  {
    slug: 'list-user',
    name: 'List Users',
    description: 'Get a list of users',
    apiUrl: '/admin/users',
    frontUrl: '',
    method: 'GET',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  },
  {
    slug: 'update-user',
    name: 'Update User',
    description: 'Update some fields of a user document',
    apiUrl: '/admin/users/:id',
    frontUrl: '',
    method: 'PATCH',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  },
  {
    slug: 'get-profile',
    name: 'User Profile',
    description: 'Get logged in user profile information',
    apiUrl: '/admin/users/profile',
    frontUrl: '',
    method: 'GET',
    defaultAction: 'allow',
    target: 'employee',
    active: true
  }
];

export const PERMISSION_LIST = [
  {
    name: 'Auth employee',
    slug: 'auth-employee',
    description: 'Systéme d\'authentification pour l\'employee',
    routes: [],
    active: true,
    defaultAction: 'allow'
  },
  {
    name: 'Auth Citizenn',
    slug: 'auth-citizen',
    description: 'Systéme d\'authentification pour le citoyen',
    routes: [],
    active: true,
    defaultAction: 'allow'
  },
  {
    name: 'User',
    slug: 'user',
    description: 'Gestion de users',
    routes: [],
    active: true,
    defaultAction: 'allow'
  }
];

export const INITIAL_PERMISSION = [
  {
    list: [
      '/admin/auth/login',
      '/admin/auth/refresh-token',
      '/admin/auth/forgot-password'
    ]
  },
  {
    list: [
      '/citizen/auth/login',
      '/citizen/auth/refresh-token',
      '/citizen/auth/forgot-password',
      '/citizen/auth/register',
      '/citizen/auth/google',
      '/citizen/auth/facebook'
    ]
  },
  {
    list: [
      '/admin/users',
      '/admin/users/profile',
      '/admin/users/:id'
    ]
  }
];


export const INITAL_RBAC = {
  role: '',
  permissions: [],
  active: true,
  defaultAction: 'allow'
};

export const INITAL_ROLE_PERMISSION = [
  { slugRole: 'admin-fonctionnel', permissionSlug: ['auth-employee', 'user'] },
  { slugRole: 'citoyen', permissionSlug: ['auth-citizen'] },
  { slugRole: 'citoyen-pro', permissionSlug: ['auth-citizen'] },
  { slugRole: 'guichet-unique', permissionSlug: ['auth-employee'] },
  { slugRole: 'services', permissionSlug: ['auth-employee'] },
  { slugRole: 'maire', permissionSlug: ['auth-employee'] }
];

/*****************************************************************
 *  Initial corporate config
 *****************************************************************/


export const CORPORATE_CONFIG_DATA = [
  {
    'city': {
      en: 'Tunis',
      fr: 'Tunis',
      ar: 'Tunis'
    },
    'name': {
      en: "Tunisia EN",
      fr: "Tunisie FR",
      ar: 'tounisna AR'
    },
    'phone': '',
    'fax': '',
    'email': '',
    'website': '',
    'address': null,
    'features': [],
    'geography': null
  },
  {
    'city': {
      en: 'Tunis',
      fr: 'Tunis',
      ar: 'Tunis'
    },
    'name': {
      en: "Tunisia EN",
      fr: "Tunisie FR",
      ar: 'tounisna AR'
    },
    'phone': '',
    'fax': '',
    'email': '',
    'website': '',
    'address': null,
    'features': [],
    'geography': null
  },
  {
    'city': {
      en: 'Tunis',
      fr: 'Tunis',
      ar: 'Tunis'
    },
    'name': {
      en: "Tunisia EN",
      fr: "Tunisie FR",
      ar: 'tounisna AR'
    },
    'phone': '',
    'fax': '',
    'email': '',
    'website': '',
    'address': null,
    'features': [],
    'geography': null
  },
  {
    'city': {
      en: 'Tunis',
      fr: 'Tunis',
      ar: 'Tunis'
    },
    'name': {
      en: "Tunisia EN",
      fr: "Tunisie FR",
      ar: 'tounisna AR'
    },
    'phone': '',
    'fax': '',
    'email': '',
    'website': '',
    'address': null,
    'features': [],
    'geography': null
  }
]