export const createSessionAction = (token) => ({
  type: 'CREATE_SESSION',
  token: token,
});

export const deleteSessionAction = () => ({
  type: 'DELETE_SESSION',
});

export const profileAction = (profile) => ({
  type: 'UPDATE_PROFILE',
  profile: profile,
});
