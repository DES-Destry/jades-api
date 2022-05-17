import { ISenderSettings } from '../../../shared/senders/sender-settings.interface';

export class EmailSettings implements ISenderSettings {
  // TODO: implement email sending
  from: string;
  to: string;
  topic: string;
  message: string;
}
