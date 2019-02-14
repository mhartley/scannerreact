package com.acedrivers;

import android.widget.Toast;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

import android.app.Activity;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ActivityEventListener;

import com.facebook.react.bridge.Callback;

import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;


import java.util.Map;
import java.util.HashMap;

public class Scanner extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";
  private static final int SCAN_REQUEST = 467081;


  @Override
  public String getName() {
    return "Scanner";
  }


     // This callback class needs to be the one from React, but I don't
    // have that imported here.
    Callback mErrorCallback;
    Callback mSuccessCallback;


    public Scanner(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }


    // TODO You'd uncomment this annotation (@ReactMethod) to make the ZXing intent open.
    @ReactMethod
    public void openIntent(Callback successCallback, Callback errorCallback) {
        mErrorCallback = errorCallback;
        mSuccessCallback = successCallback;

        Activity currentActivity = getCurrentActivity();
        IntentIntegrator intentIntegrator = new IntentIntegrator(currentActivity);
        intentIntegrator.setDesiredBarcodeFormats(IntentIntegrator.PDF_417);
        intentIntegrator.setBeepEnabled(true);
        currentActivity.startActivityForResult(intentIntegrator.createScanIntent(), SCAN_REQUEST);
    }


      private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(int requestCode, int resultCode, Intent data) {
            Toast.makeText(getReactApplicationContext(), "DIICK", Toast.LENGTH_LONG).show();
            IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
            if(result != null) {
                if(result.getContents() == null) {
                    //Toast.makeText(getReactApplicationContext(), "Cancelled", Toast.LENGTH_LONG).show();

                    // TODO Uncomment
                    // mErrorCallback.invoke("Error");
                } else {
                    // Contents of scanned item are in result.getContents()
                    // Toast.makeText(getReactApplicationContext(), "Scanned: " + result.getContents(), Toast.LENGTH_LONG).show();
                    // Instead of toast you'd obviously respond back:
                    // TODO Uncomment
                    mSuccessCallback.invoke(result.getContents());
                }
            } else {
                super.onActivityResult(requestCode, resultCode, data);
            }
        }

    };



}
