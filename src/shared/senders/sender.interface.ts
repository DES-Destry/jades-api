import { ISenderSettings } from './sender-settings.interface';

export interface ISender<T extends ISenderSettings> {
  send(senderSettings: T): Promise<boolean>;
}
