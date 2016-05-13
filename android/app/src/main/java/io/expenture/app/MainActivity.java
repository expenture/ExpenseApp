package io.expenture.app;

import com.facebook.react.ReactActivity;
import com.github.yamill.orientation.OrientationPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import android.content.Intent;
import android.content.res.Configuration;
import android.os.Bundle;

import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.github.yamill.orientation.OrientationPackage;
import mikemonteith.com.reactnativeandroidcheckbox.CheckboxPackage;
import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
    CallbackManager mCallbackManager;
    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ExpenseApp";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this);
        mCallbackManager = new CallbackManager.Factory().create();

        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            mReactNativePushNotificationPackage,
            new OrientationPackage(this),
            new CheckboxPackage(),
            new FBSDKPackage(mCallbackManager)
        );
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        FacebookSdk.sdkInitialize(getApplicationContext());
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }

    @Override
    protected void onNewIntent (Intent intent) {
      super.onNewIntent(intent);

      mReactNativePushNotificationPackage.newIntent(intent);
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }
}
