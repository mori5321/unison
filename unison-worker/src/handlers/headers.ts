const applicationJsonHeader = {
  'Content-Type': 'application/json',
};

export const accessControlAllowOriginHeader = {
  'Access-Control-Allow-Origin': '*',
};

export const applicationDefaultHeader = {
  ...applicationJsonHeader,
  ...accessControlAllowOriginHeader,
};
