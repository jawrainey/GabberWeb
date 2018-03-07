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
      .concat(makeList(3, make.membership))
    
    return model('Project', id, {
      slug: `project-${id}`,
      title: `Project ${id}`,
      description: 'Aenean lacinia bibendum nulla sed consectetur',
      isProjectPublic: privacy === 'public',
      members: memberships,
      privacy,
      creator: {
        id: creatorId,
        name: `User ${creatorId}`
      }
    })
  },
  tag (id) {
    return model('Tag', id, { name: `Tag ${id}` })
  },
  session (id, projectId, creatorId) {
    return model('Session', id, {
      project: projectId,
      creator: creatorId
    })
  },
  playlist (id, creatorId) {
    return model('Playlist', id, { name: `Playlist ${id}` })
  },
  membership (id, role = 'user') {
    return model('Membership', id, {
      user: id,
      name: `User ${id}`,
      role: role
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
