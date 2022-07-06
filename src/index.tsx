import { NativeModules, Platform } from 'react-native';
import type { IRnSMSModule } from './interface/RNSmsNative.interface';

const LINKING_ERROR =
  `The package 'rn-sms' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const RnSms: IRnSMSModule = NativeModules.RnSms
  ? NativeModules.RnSms
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export async function getAllSms(max: number = 100) {
  let allSms = await RnSms.getAllSms(max);
  allSms = JSON.parse(allSms);
  return allSms;
}
