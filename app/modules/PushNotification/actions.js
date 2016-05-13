export const pushNotificationRegistered = (deviceToken) => {
  return {
    type: 'PUSH_NOTIFICATION_REGISTERED',
    deviceToken
  };
};

export const pushNotificationRecieved = (payload) => {
  return {
    type: 'PUSH_NOTIFICATION_RECEIVED',
    payload
  };
};

export const pushNotificationErrored = (error) => {
  return {
    type: 'PUSH_NOTIFICATION_RECEIVED',
    error
  };
};
