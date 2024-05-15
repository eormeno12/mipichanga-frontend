export const env = {
  users_api: process.env.NEXT_PUBLIC_USERS_API,
  fields_api: process.env.NEXT_PUBLIC_FIELDS_API,
  matches_api: process.env.NEXT_PUBLIC_MATCHES_API,
}


export enum FRONTEND_ROUTES {
  HOME = '/',
  PROFILE = '/perfil',
  MATCHES = '/pichanga',
}