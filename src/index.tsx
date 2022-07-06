import { NativeModules } from 'react-native';
import type { IRnSMSModule, ISMS } from './interface/RNSms.interface';

const RnSms: IRnSMSModule = NativeModules.RnSms;

export async function getAllSms(max: number = 100): Promise<ISMS[]> {
  let allSms = (await RnSms.getAllSms(max)) as string;
  return JSON.parse(allSms) as ISMS[];
}
