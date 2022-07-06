package com.rnsms

import android.provider.Telephony
import android.util.Log
import com.facebook.react.bridge.*
import com.google.gson.Gson
import java.util.*


class RnSmsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private var gson: Gson = Gson()

  override fun getName(): String {
      return "RnSms"
  }

  @ReactMethod
  fun multiply(a: Int, b: Int, promise: Promise) {
//      promise.resolve(a * b)
    promise.resolve("returned from native")
  }

  @ReactMethod
  fun getAllSms(max:Int, promise: Promise) {
    val cr = reactApplicationContext.contentResolver

    val addressCol = Telephony.TextBasedSmsColumns.ADDRESS
    val bodyCol = Telephony.TextBasedSmsColumns.BODY
    val typeCol = Telephony.TextBasedSmsColumns.TYPE
    val dateCol = Telephony.TextBasedSmsColumns.DATE
    val serviceCol = Telephony.TextBasedSmsColumns.SERVICE_CENTER
    val threadIdCol = Telephony.TextBasedSmsColumns.THREAD_ID

    val projection = arrayOf(addressCol, bodyCol, typeCol, dateCol, serviceCol, threadIdCol)

    val cursor = cr.query(
      Telephony.Sms.CONTENT_URI,
      projection, null, null, null
    )

    val allSms = ArrayList<MutableMap<String, String>>()
    val addressIndex = cursor!!.getColumnIndex(addressCol)
    val bodyIndex = cursor.getColumnIndex(bodyCol)
    val typeIndex = cursor.getColumnIndex(typeCol)
    val dateIndex = cursor.getColumnIndex(dateCol)
    val serviceIndex = cursor.getColumnIndex(serviceCol)
    val threadIdIndex = cursor.getColumnIndex(threadIdCol)

    var count = 0

    while (cursor.moveToNext() && count < max) {
      Log.d("DEBUG", count.toString())
      val address = cursor.getString(addressIndex)
      val body = cursor.getString(bodyIndex)
      val type = cursor.getString(typeIndex)
      val date = cursor.getString(dateIndex)
      val serviceNumber = cursor.getString(serviceIndex)
      val threadId = cursor.getString(threadIdIndex)
      val smsMap = mutableMapOf("sender" to address, "type" to type, "receivedTimestamp" to date,
        "serviceNumber" to serviceNumber, "threadId" to threadId, "body" to body
      )

      allSms.add(smsMap)
      count += 1
    }
    cursor.close()

    promise.resolve(gson.toJson(allSms))
  }
}
