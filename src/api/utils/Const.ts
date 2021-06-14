const path = require('path');

export const ITEMS_PER_PAGE = 20;
export const FUNCTIONAL_ADMIN = 'functionalAdmin';
export const SUPER_ADMIN = "superAdmin"
export const CORPORATE_ADMIN = "corporateAdmin"
export const ORGANIZATION = "organization"
export const ASSOCIATION = 'association'
export const MANAGEMENT = 'management'
export const USER = 'user'
export const ALL = 'all'
export const USER_DASHBOARD_USER = "Client"
// Full paths
export const UPLOADS_DIRECTORY = path.join(__dirname, `/../../../uploads`);
export const UPLOADS_TMP_DIRECTORY = path.join(__dirname, `/../../../uploads/tmp`);
export const UPLOADS_CORPORATE_DIRECTORY = path.join(__dirname, `/../../../uploads/corporates`);