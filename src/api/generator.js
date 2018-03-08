import Hashids from 'hashids'

export const hasher = new Hashids('really_not_secret', 8)

export const CURRENT_USER_ID = 99

export const make = {
  user (id) {
    return model('User', id, {
      fullname: 'Geoff Testington',
      email: 'geoff@example.com'
    })
  },
  project (id, privacy = 'public') {
    const creatorId = privacy === 'public' ? 1 : CURRENT_USER_ID
    const memberships = [ make.membership(creatorId, 'admin') ]
      .concat(makeList({ from: 2, to: 9 }, make.membership))
    
    return model('Project', id, {
      slug: `project-${id}`,
      title: `Project ${id}`,
      description: 'Aenean lacinia bibendum nulla sed consectetur',
      isProjectPublic: privacy === 'public',
      members: memberships,
      privacy,
      creator: make.creator(creatorId)
    })
  },
  topics (id, projectId) {
    return model('Topic', id, {
      name: `Topic ${id}`,
      is_active: 1,
      project: projectId,
      text_prompt: `topic ${id}`
    })
  },
  session (id, projectId, creatorId) {
    return model('Session', id, {
      id: hasher.encode(id),
      projectId,
      creator: make.creator(creatorId),
      participants: makeList(pickBetween(1, 7), make.participant),
      topics: makeList(pickBetween(2, 8), make.topics),
      user_annotations: makeList(pickBetween(0, 12), make.annotation, id)
    })
  },
  playlist (id, creatorId) {
    return model('Playlist', id, { name: `Playlist ${id}` })
  },
  membership (id, role = 'user') {
    return model('Membership', id, {
      user_id: id,
      name: username(id, 'User'),
      role: role
    })
  },
  creator (id) {
    return model('Creator', id, {
      name: username(id, 'User')
    })
  },
  participant (id) {
    return model('Participant', id, {
      name: username(id, 'Participant'),
      role: 'interviewer',
      user_id: id
    })
  },
  annotation (id, sessionId) {
    return model('Annotation', id, {
      sessionId,
      user_id: pickBetween(1, 9),
      justification: 'Morbi leo risus, porta ac consectetur ac, vestibulum at eros.'
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

export function model (type, id, obj) {
  return Object.assign({
    _mocktype: type,
    id: parseInt(id),
    created_on: new Date('2018-02-05T03:24:42'),
    updated_on: new Date('2018-02-11T03:24:42')
  }, obj)
}

export function pickBetween (from, to) {
  return from + Math.floor(Math.random() * (to - from))
}

export function username (id, segment = 'User') {
  return id === CURRENT_USER_ID
    ? 'Geoff Testington'
    : `${segment} ${id}`
}
