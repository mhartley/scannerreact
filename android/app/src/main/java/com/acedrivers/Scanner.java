package com.acedrivers;

import android.app.Activity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class Scanner extends ReactContextBaseJavaModule {
    @Override
    public String getName() {
        return "Scanner";
    }

    public Scanner(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // TODO You'd uncomment this annotation (@ReactMethod) to make the ZXing intent open.
    @ReactMethod
    public void openIntent(final Promise promise) {
        System.out.println("Open Intent");

        final ReactApplicationContext ctx = getReactApplicationContext();
        final Activity currentActivity = ctx.getCurrentActivity();
        final MainActivity currentMainActivity = (MainActivity)currentActivity;
        currentMainActivity.openScannerActivity(promise);
    }


}
