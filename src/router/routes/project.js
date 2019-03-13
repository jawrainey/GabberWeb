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
        component: ProjectList,
        meta: { title: 'Projects' }
      },
      {
        path: ':project_id',
        component: Holder,
        children: [
          {
            path: 'conversations',
            component: Holder,
            meta: {
              crumb: 'Conversations',
              holderFor: ROUTES.SESSION_LIST_ROUTE
            },
            children: [
              {
                path: '',
                name: ROUTES.SESSION_LIST_ROUTE,
                component: SessionList,
                meta: { title: 'Conversations' }
              },
              {
                path: ':session_id',
                name: ROUTES.SESSION_DETAIL_ROUTE,
                component: SessionDetail,
                meta: {
                  crumb: 'View Conversation',
                  title: 'Conversation'
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
