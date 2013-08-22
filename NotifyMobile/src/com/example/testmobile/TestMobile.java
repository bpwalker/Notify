package com.example.testmobile;

import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class TestMobile extends DroidGap{
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("splashscreen", R.drawable.splash);
        super.loadUrl("file:///android_asset/www/login.html",20000);
    }
}
