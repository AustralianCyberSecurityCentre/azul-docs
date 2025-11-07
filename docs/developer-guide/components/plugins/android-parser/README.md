# Azul Plugin Android Parser

Plugin to parse android apps and extract basic metadata.

## Development Installation

To install azul-plugin-android-parser for development run the command
(from the root directory of this project):

```bash
pip install -e .
```

## Usage azul-plugin-android-parser

Usage on local files:

```bash
azul-plugin-android-parser malware.file
```

Example Output:

```bash
----- AzulPluginAndroidParser results -----
OK

events (1)

event for binary:c6c3cc17de5743df5aa9e36cf074c9425a8b8575b083e559ec31637f9f99d285:None
  {}
  output features:
    apk_admin_description:
           apk_admin_name:
             apk_app_name: Rumble
          apk_cert_issuer: CN=Android, OU=Android, O=Google Inc., L=Mountain View, ST=California, C=US - eca34178cd915ce443fa1d3900ae6a3b3a3b6532488543d22a39ecb844872b5d
         apk_cert_subject: CN=Android, OU=Android, O=Google Inc., L=Mountain View, ST=California, C=US - eca34178cd915ce443fa1d3900ae6a3b3a3b6532488543d22a39ecb844872b5d
         apk_default_icon: 167b552d05dd07a928bd4df52d1ad44d
            apk_dex_count: 4
           apk_file_count: 163 - ASCII text
                           4 - ASCII text, with no line terminators
                           1 - Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xa66, x 0xa06, y 0x6b6f, z 0x746c
                           1 - Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xa9e, x 0x30a, y 0x66b, z 0x6f74
                           1 - Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xaa2, x 0x20a, y 0x66b, z 0x6f74
                           1 - Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xaa4, x 0x140a, y 0x66b, z 0x6f74
                           1 - Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xacd, x 0x70a, y 0x66b, z 0x6f74
                           1 - Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xae0, x 0x90a, y 0x66b, z 0x6f74
                           1 - Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xafc, x 0x50a, y 0x66b, z 0x6f74
                           1 - Android ART profile metadata, version 002
                           1 - Android ART profile, version 010 P
                           1060 - Android binary XML
                           1 - Android package resource table (ARSC), 3289 string(s), 3 style(s), utf8
                           9 - C source, ASCII text
                           1 - DER Encoded PKCS#7 Signed Data
                           4 - Dalvik dex file version 035
                           1 - ELF 32-bit LSB shared object, ARM, EABI5 version 1 (SYSV)
                           1 - ELF 32-bit LSB shared object, Intel 80386, version 1 (SYSV)
                           1 - ELF 64-bit LSB shared object, ARM aarch64, version 1 (SYSV)
                           1 - ELF 64-bit LSB shared object, x86-64, version 1 (SYSV)
                           1 - JAR Manifest, ASCII text, with CRLF line terminators
                           1 - JAR Signature File, ASCII text, with CRLF line terminators
                           2 - JSON text data
                           1322 - PNG image data
                           2 - Perl5 module source, ASCII text
                           1 - TrueType Font data, 14 tables, 1st "GDEF", 7 names, Microsoft, language 0x409, Copyright 2011 Google Inc. All Rights Reserved.Roboto MediumRegularVersion 2.137; 2017Roboto-Med
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 33 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)InterRegular3.019;RSMS;I
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 34 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)InterBold3.019;RSMS;Inte
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter BlackRegular3.019;
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter ExtraBoldRegular3.
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter ExtraLightRegular3
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter LightRegular3.019;
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter MediumRegular3.019
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter SemiBoldRegular3.0
                           1 - TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter ThinRegular3.019;R
                           1 - XML 1.0 document, ASCII text
                           1 - compiled Java class data, version 52.0 (Java 1.8)
                           6 - data
                           1 - gzip
           apk_file_types: ASCII text
                           ASCII text, with no line terminators
                           Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xa66, x 0xa06, y 0x6b6f, z 0x746c
                           Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xa9e, x 0x30a, y 0x66b, z 0x6f74
                           Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xaa2, x 0x20a, y 0x66b, z 0x6f74
                           Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xaa4, x 0x140a, y 0x66b, z 0x6f74
                           Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xacd, x 0x70a, y 0x66b, z 0x6f74
                           Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xae0, x 0x90a, y 0x66b, z 0x6f74
                           Adobe Photoshop Color swatch, version 0, 3 colors; 1st RGB space (0), w 0x1, x 0, y 0, z 0; 2nd Lab space (7), w 0xafc, x 0x50a, y 0x66b, z 0x6f74
                           Android ART profile metadata, version 002
                           Android ART profile, version 010 P
                           Android binary XML
                           Android package resource table (ARSC), 3289 string(s), 3 style(s), utf8
                           C source, ASCII text
                           DER Encoded PKCS#7 Signed Data
                           Dalvik dex file version 035
                           ELF 32-bit LSB shared object, ARM, EABI5 version 1 (SYSV)
                           ELF 32-bit LSB shared object, Intel 80386, version 1 (SYSV)
                           ELF 64-bit LSB shared object, ARM aarch64, version 1 (SYSV)
                           ELF 64-bit LSB shared object, x86-64, version 1 (SYSV)
                           JAR Manifest, ASCII text, with CRLF line terminators
                           JAR Signature File, ASCII text, with CRLF line terminators
                           JSON text data
                           PNG image data
                           Perl5 module source, ASCII text
                           TrueType Font data, 14 tables, 1st "GDEF", 7 names, Microsoft, language 0x409, Copyright 2011 Google Inc. All Rights Reserved.Roboto MediumRegularVersion 2.137; 2017Roboto-Med
                           TrueType Font data, 16 tables, 1st "GDEF", 33 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)InterRegular3.019;RSMS;I
                           TrueType Font data, 16 tables, 1st "GDEF", 34 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)InterBold3.019;RSMS;Inte
                           TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter BlackRegular3.019;
                           TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter ExtraBoldRegular3.
                           TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter ExtraLightRegular3
                           TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter LightRegular3.019;
                           TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter MediumRegular3.019
                           TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter SemiBoldRegular3.0
                           TrueType Font data, 16 tables, 1st "GDEF", 36 names, Microsoft, language 0x409, Copyright 2020 The Inter Project Authors (https://github.com/rsms/inter)Inter ThinRegular3.019;R
                           XML 1.0 document, ASCII text
                           compiled Java class data, version 52.0 (Java 1.8)
                           data
                           gzip
            apk_icon_path: res/mipmap-anydpi-v26/ic_launcher.xml
       apk_intent_filters: android.intent.action.ACTION_POWER_CONNECTED
                           android.intent.action.ACTION_POWER_DISCONNECTED
                           android.intent.action.BATTERY_LOW
                           android.intent.action.BATTERY_OKAY
                           android.intent.action.BOOT_COMPLETED
                           android.intent.action.DEVICE_STORAGE_LOW
                           android.intent.action.DEVICE_STORAGE_OK
                           android.intent.action.MAIN
                           android.intent.action.MY_PACKAGE_REPLACED
                           android.intent.action.QUICKBOOT_POWERON
                           android.intent.action.TIMEZONE_CHANGED
                           android.intent.action.TIME_SET
                           android.intent.action.VIEW
                           android.intent.category.BROWSABLE
                           android.intent.category.DEFAULT
                           android.intent.category.LAUNCHER
                           android.net.conn.CONNECTIVITY_CHANGE
                           androidx.profileinstaller.action.BENCHMARK_OPERATION
                           androidx.profileinstaller.action.INSTALL_PROFILE
                           androidx.profileinstaller.action.SAVE_PROFILE
                           androidx.profileinstaller.action.SKIP_FILE
                           androidx.work.diagnostics.REQUEST_DIAGNOSTICS
                           androidx.work.impl.background.systemalarm.UpdateProxies
                           com.facebook.sdk.ACTION_CURRENT_ACCESS_TOKEN_CHANGED
                           com.facebook.sdk.ACTION_CURRENT_AUTHENTICATION_TOKEN_CHANGED
                           com.google.android.c2dm.intent.RECEIVE
                           com.google.firebase.MESSAGING_EVENT
                           com.huawei.push.action.MESSAGING_EVENT
                           com.rumble.battles
            apk_libraries: android.ext.adservices
                           androidx.window.extensions
                           androidx.window.sidecar
        apk_main_activity: com.rumble.battles.landing.LandingActivity
         apk_package_name: com.rumble.battles
          apk_permissions: android.permission.ACCESS_ADSERVICES_AD_ID
                           android.permission.ACCESS_ADSERVICES_ATTRIBUTION
                           android.permission.ACCESS_ADSERVICES_TOPICS
                           android.permission.ACCESS_NETWORK_STATE
                           android.permission.ACCESS_WIFI_STATE
                           android.permission.CAMERA
                           android.permission.CHANGE_WIFI_MULTICAST_STATE
                           android.permission.FOREGROUND_SERVICE
                           android.permission.INTERNET
                           android.permission.POST_NOTIFICATIONS
                           android.permission.READ_APP_BADGE
                           android.permission.READ_EXTERNAL_STORAGE
                           android.permission.READ_MEDIA_IMAGES
                           android.permission.READ_MEDIA_VIDEO
                           android.permission.READ_PHONE_STATE
                           android.permission.RECEIVE_BOOT_COMPLETED
                           android.permission.RECORD_AUDIO
                           android.permission.VIBRATE
                           android.permission.WAKE_LOCK
                           com.anddoes.launcher.permission.UPDATE_COUNT
                           com.google.android.c2dm.permission.RECEIVE
                           com.google.android.finsky.permission.BIND_GET_INSTALL_REFERRER_SERVICE
                           com.htc.launcher.permission.READ_SETTINGS
                           com.htc.launcher.permission.UPDATE_SHORTCUT
                           com.huawei.android.launcher.permission.CHANGE_BADGE
                           com.huawei.android.launcher.permission.READ_SETTINGS
                           com.huawei.android.launcher.permission.WRITE_SETTINGS
                           com.majeur.launcher.permission.UPDATE_BADGE
                           com.oppo.launcher.permission.READ_SETTINGS
                           com.oppo.launcher.permission.WRITE_SETTINGS
                           com.rumble.battles.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION
                           com.rumble.battles.permission.C2D_MESSAGE
                           com.sec.android.provider.badge.permission.READ
                           com.sec.android.provider.badge.permission.WRITE
                           com.sonyericsson.home.permission.BROADCAST_BADGE
                           com.sonymobile.home.permission.PROVIDER_INSERT_BADGE
                           me.everything.badger.permission.BADGE_COUNT_READ
                           me.everything.badger.permission.BADGE_COUNT_WRITE
              apk_sdk_max: 0
              apk_sdk_min: 21
           apk_sdk_target: 34
     apk_signature_hashes: f456ce7bdcdcd2f63e6940c7d29b1c961d4cc586e370f6c776b9f3c2f223024f
      apk_signature_types: 7
         apk_version_code: 0
         apk_version_name:
```

Automated usage in system:

```bash
azul-plugin-android-parser --server http://azul-dispatcher.localnet/
```

## Dependency management

Dependencies are managed in the requirements.txt, requirements_test.txt and debian.txt file.

The requirements files are the python package dependencies for normal use and specific ones for tests
(e.g pytest, black, flake8 are test only dependencies).

The debian.txt file manages the debian dependencies that need to be installed on development systems and docker images.

Sometimes the debian.txt file is insufficient and in this case the Dockerfile may need to be modified directly to
install complex dependencies.
