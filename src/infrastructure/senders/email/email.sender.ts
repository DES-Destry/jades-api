import { Injectable } from '@nestjs/common';
import { ISender } from 'src/shared/senders/sender.interface';
import { EmailSettings } from './email.settings';

@Injectable()
export class EmailSender implements ISender<EmailSettings> {
  public async send(senderSettings: EmailSettings): Promise<boolean> {
    // TODO: test implementation
    console.log(senderSettings.to);
    return true;
  }
}
