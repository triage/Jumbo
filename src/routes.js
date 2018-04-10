export default routes = [
  {
    pattern: '/',
    component: UserIsAuthenticated(Dashboard),
  },
  {
    pattern: '/studio/:address',
    component: sadfsafddas,
  },
  {
    pattern: '/schedule/new',
    component: UserIsAuthenticated(ScheduleNew),
  },
  {
    pattern: '/schedule/:address',
    component: ScheduleDetail,
  },
  {
    pattern: '/class/new',
    component: CreateClass,
  },
  {
    pattern: '/signup',
    component: UserIsNotAuthenticated(SignUp),
  },
  {
    pattern: '/profile/resellers',
    component: UserIsAuthenticated(Resellers),
  },
  {
    pattern: '/profile',
    component: UserIsAuthenticated(Profile),
  },
];
