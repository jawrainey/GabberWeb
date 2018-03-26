import * as ROUTES from '@/const/routes'

import Holder from '@/views/base/Holder'
import ProjectList from '@/views/project/ProjectList'
import SessionList from '@/views/project/SessionList'
import SessionDetail from '@/views/project/SessionDetail'
import SessionConsent from '@/views/project/SessionConsent'

export default [
  {
    path: '/projects',
    component: Holder,
    meta: {
      crumb: 'Projects',
      crumbIcon: 'home',
      holderFor: ROUTES.PROJECT_LIST_ROUTE
    },
    children: [
      {
        path: '',
        name: ROUTES.PROJECT_LIST_ROUTE,
        component: ProjectList
      },
      {
        path: ':project_id',
        component: Holder,
        children: [
          {
            path: 'sessions',
            component: Holder,
            meta: {
              crumb: 'Gabbers',
              holderFor: ROUTES.SESSION_LIST_ROUTE
            },
            children: [
              {
                path: '',
                name: ROUTES.SESSION_LIST_ROUTE,
                component: SessionList
              },
              {
                path: ':session_id',
                name: ROUTES.SESSION_DETAIL_ROUTE,
                component: SessionDetail,
                meta: {
                  crumb: 'Gabber'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/consent/:token',
    name: ROUTES.CONSENT_ROUTE,
    component: SessionConsent
  }
]
