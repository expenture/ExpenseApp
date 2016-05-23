import RNPushNotification from 'react-native-push-notification';

export default function requestPermissions() {
  RNPushNotification.requestPermissions();

  return Promise.resolve();
}
