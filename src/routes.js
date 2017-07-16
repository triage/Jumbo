export default routes = [
  {
    pattern: '/',
    component: UserIsAuthenticated(Dashboard),
  },
  {
    pattern: '/schedule/new',
    component: UserIsAuthenticated(ScheduleNew),
  },
  {
    pattern: '/schedule/:address',
    component: ScheduleDetail
  },
  {
    pattern: '/class/new',
    component: CreateClass
  },
  {
    pattern: '/signup',
    component: UserIsNotAuthenticated(SignUp),
  },
  {
    pattern: '/profile',
    component: UserIsAuthenticated(Profile),
  }
];
