/**
 * A set of methods for generating fack api data
 */
import Hashids from 'hashids'
import eases from 'eases'

export const hasher = new Hashids('really_not_secret', 8)

export const CURRENT_USER_ID = 99
export const CONSENT_USER_ID = 101
export const MOCK_DURATION = 1.53

export const DUMMY_TOPICS = [
  'Introduction',
  'What is the point of this chat?',
  'Project Description',
  'General Conversation',
  'The big issues',
  'A specific issue'
]

export const DUMMY_COMMENTS = [
  'I love that!',
  'I really like this bit, it means ...',
  'How did they do that?',
  'Would it still work if you ...',
  'I do not agree, I think that ...'
]

export const DUMMY_LABELS = [
  'Label A',
  'Label B',
  'Label C',
  'Label D'
]

export const make = {
  user (id) {
    return model('User', id, {
      fullname: 'Geoff Testington',
      email: 'geoff@example.com'
    })
  },
  project (id, privacy = 'public') {
    const creatorId = privacy === 'public' ? 1 : CURRENT_USER_ID
    const memberships = [ make.membership(creatorId, 'administrator') ]
      .concat(makeList({ from: 2, to: 9 }, make.membership))
    
    return model('Project', id, {
      image: '/static/img/logo.png',
      content: {
        'en': {
          'title': `Project ${id}`,
          'slug': `project-${id}`,
          'description': 'lol',
          topics: makeList(5, make.topic, id)
        },
        'it': {
          'title': `Project ${id}`,
          'slug': `project-${id}`,
          'description': 'noooo',
          topics: makeList(5, make.topic, id)
        }
      },
      members: memberships,
      privacy,
      organisation: {id: pickBetween(0, 3), description: null, name: null},
      creator: make.creator(creatorId),
      codebook: {
        tags: DUMMY_LABELS.map((text, id) => ({ id, text }))
      }
    })
  },
  topic (id, projectId) {
    return model('Topic', id, {
      text: pickFrom(DUMMY_TOPICS),
      is_active: 1,
      project: projectId
    })
  },
  session (id, projectId, creatorId) {
    let numTopics = pickBetween(2, 5)
    return model('Session', id, {
      id: hasher.encode(id),
      project_id: projectId,
      creator: make.creator(creatorId),
      audio_url: '/static/audio/horse.mp3',
      participants: makeList(pickBetween(1, 7), make.participant),
      topics: makeList(numTopics, make.sessionTopic, projectId, numTopics, MOCK_DURATION),
      num_user_annotations: pickBetween(2, 10)
    })
  },
  playlist (id, creatorId) {
    return model('Playlist', id, { name: `Playlist ${id}` })
  },
  membership (id, role = pickFrom(['participant', 'researcher', 'administrator'])) {
    return model('Membership', id, {
      user_id: id,
      fullname: username(id, 'User'),
      role: role
    })
  },
  creator (id) {
    return model('Creator', id, {
      user_id: id,
      fullname: username(id, 'User')
    })
  },
  participant (id) {
    return model('Participant', id, {
      fullname: username(id, 'Participant'),
      role: 'interviewer',
      user_id: id
    })
  },
  annotation (id, sessionId) {
    let when = pickBetween(0, MOCK_DURATION)
    return model('Annotation', id, {
      session_id: sessionId,
      user_id: pickBetween(1, 9),
      comments: makeIds(pickBetween(2, 5)),
      labels: makeList(3, make.label),
      content: pickFrom(DUMMY_COMMENTS),
      creator: make.creator(pickFrom([1, 2, 3, 4, 5, CURRENT_USER_ID])),
      start_interval: when,
      end_interval: 2
    })
  },
  sessionTopic (id, projectId, count, duration) {
    let start = eases.quadInOut((id - 1) / count)
    let end = eases.quadInOut(id / count)
    return {
      ...make.topic(id, projectId),
      topic_id: id,
      start_interval: start * duration,
      end_interval: end * duration
    }
  },
  comment (id, annotationId, parentId = null, creatorId = null) {
    return model('Comment', id, {
      content: pickFrom(DUMMY_COMMENTS),
      creator: make.creator(creatorId || pickFrom([CURRENT_USER_ID, pickBetween(1, 10)])),
      annotation_id: annotationId,
      parent_id: parentId,
      replies: makeIds(pickBetween(0, 2)),
      user_id: pickBetween(1, 10),
      is_active: 1
    })
  },
  detailedAnnotation (id, ...args) {
    const from = id * 3
    const numComments = { from, to: from + 5 }
    return {
      ...make.annotation(id, ...args),
      comments: makeList(numComments, make.comment, id)
    }
  },
  invite (id) {
    return model('Invite', id, {
      user: make.user(CURRENT_USER_ID),
      project: make.project(1, 'private')
    })
  },
  consent (id) {
    let session = make.session(1, 1, 1)
    session.participants.push({ user_id: CONSENT_USER_ID })
    return model('Consent', id, {
      user: {
        ...make.user(CONSENT_USER_ID),
        registered: true,
        verified: true
      },
      project: make.project(1, 'private'),
      session: session,
      consent: 'none'
    })
  },
  label (id) {
    return model('Label', id, {
      text: DUMMY_LABELS[id % DUMMY_LABELS.length]
    })
  }
}

export function makeList (count, maker, ...args) {
  if (typeof count === 'number') {
    count = { from: 1, to: count + 1 }
  }
  let items = []
  for (let i = count.from; i < count.to; i++) {
    items.push(maker(i, ...args))
  }
  return items
}

export function makeIds (count) {
  return new Array(count)
    .fill(0)
    .map((_, i) => i + 1)
}

export function model (type, id, obj) {
  return Object.assign({
    _mocktype: type,
    id: parseInt(id),
    created_on: dateBetween(
      new Date('2018-02-01T00:00:00'),
      new Date('2018-02-01T23:59:59')
    ).toISOString(),
    updated_on: new Date('2018-02-11T03:24:42')
  }, obj)
}

export function pickBetween (from, to) {
  return from + Math.floor(Math.random() * (to - from))
}

export function pickFrom (list) {
  return list[Math.floor(Math.random() * list.length)]
}

export function dateBetween (from, to) {
  return new Date(pickBetween(from.getTime(), to.getTime()))
}

export function username (id, segment = 'User') {
  return id === CURRENT_USER_ID
    ? 'Geoff Testington'
    : `${segment} ${id}`
}
