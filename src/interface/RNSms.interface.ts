export interface ISMS {
  sender: string;
  type: number;
  receivedTimestamp: number;
  serviceNumber: string;
  threadId: number;
  body: string;
}

export interface IRnSMSModule {
  getAllSms: (limit: number) => Promise<string>;
}
