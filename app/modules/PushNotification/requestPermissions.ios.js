import { Alert } from 'react-native';
import RNPushNotification from 'react-native-push-notification';

export default function requestPermissions() {
  return new Promise((resolve) => {
    Alert.alert(
      '啟用推播通知',
      '要啟用推播通知嗎？',
      [
        {
          text: '先不要',
          onPress: () => {
            notNow();
            resolve();
          }
        },
        {
          text: '好',
          style: 'default',
          onPress: () => {
            RNPushNotification.requestPermissions();
            resolve();
          }
        }
      ]
    );
  });
}

function notNow() {
  Alert.alert(
    '確定嗎？',
    '稍後改變主意的話，您可以前往「更多」頁面進行設定。',
    [
      {
        text: '我了解',
        style: 'default',
        onPress: () => {
        }
      },
      {
        text: '啟用通知',
        onPress: () => {
          RNPushNotification.requestPermissions();
        }
      }
    ]
  );
}
