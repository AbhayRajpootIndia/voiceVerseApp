export const STATUS = {
  LOADING: 0,
  SUCCESS: 1,
  ERROR: 2,
};

export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

export const API_STATUS_MESSAGES = {
  SUCCESS: 'SUCCESS',
  CREATED: 'CREATED',
  ACCEPTED: 'ACCEPTED',
  NO_CONTENT: 'NO_CONTENT',
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED:
    "Sorry, you don't have permission to access this feature. Please contact the school administration.",
  FORBIDDEN:
    "Sorry, you don't have permission to access this feature. Please contact the school administration.",
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  INTERNAL_SERVER_ERROR: 'There was an error at our back-end servers.',
  BAD_GATEWAY: 'BAD_GATEWAY',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
};
