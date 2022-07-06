import { NativeModules } from 'react-native';
import type { IRnSMSModule, ISMS } from './interface/RNSms.interface';

const RnSms: IRnSMSModule = NativeModules.RnSms;

export async function getAllSms(max: number = 100): Promise<ISMS[]> {
  let allSmsJSON = (await RnSms.getAllSms(max)) as string;
  let allSms = JSON.parse(allSmsJSON) as ISMS[];

  return allSms.map((sms) => {
    return {
      ...sms,
      receivedTimestamp: Number(sms.receivedTimestamp),
      threadId: Number(sms.threadId),
      type: Number(sms.type),
    };
  });
}
