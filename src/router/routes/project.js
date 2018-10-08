import * as ROUTES from '@/const/routes'

import Holder from '@/views/base/Holder'
import ProjectList from '@/views/project/ProjectList'
import SessionList from '@/views/project/SessionList'
import SessionDetail from '@/views/project/SessionDetail'
import SessionConsent from '@/views/project/SessionConsent'
import ConversationList from '@/views/base/ConversationList'

export default [
  {
    path: '/themes',
    component: Holder,
    meta: {
      crumb: 'Themes',
      crumbIcon: 'home',
      holderFor: ROUTES.PROJECT_LIST_ROUTE
    },
    children: [
      {
        path: '',
        name: ROUTES.PROJECT_LIST_ROUTE,
        component: ProjectList,
        meta: { title: 'Themes' }
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
  },
  {
    path: '/conversations',
    name: ROUTES.CONVERSATION_LIST_ROUTE,
    component: ConversationList,
    meta: { title: 'Conversations' }
  },
  {
    path: '/conversation/:session_id',
    name: ROUTES.CONVERSATION_ROUTE,
    component: SessionDetail,
    meta: { title: 'Conversations' }
  }
]
