import { privateRoutes } from '~/config/privateRoutes';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const app = useNuxtApp();

  if (privateRoutes.includes(to.path)) {
    // return navigateTo('/');
  }
});
