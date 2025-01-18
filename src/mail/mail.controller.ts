import { Controller, Post, Body, Logger } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    private readonly logger = new Logger(MailController.name);

    constructor(private readonly mailService: MailService) { }

    @Post('send')
    async sendEmail(
        @Body() emailData: { to: string; subject: string; text: string },
    ): Promise<any> {
        try {
            await this.mailService.sendMail(emailData.to, emailData.subject, emailData.text);
            return { message: 'Email sent successfully!' }

        } catch (error) {
            this.logger.error('Error sending email:', error);
            return { message: 'Failed to send email!' };
        }
    }
}
