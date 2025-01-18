import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        // Create a transporter using SMTP transport
        this.transporter = nodemailer.createTransport({
            service: this.configService.get<string>('EMAIL_SERVICE'),
            port: '587',
            auth: {
                user: this.configService.get<string>('EMAIL_USER'), // Replace with your Gmail email address
                pass: this.configService.get<string>('EMAIL_PASS')

            },
        });
    }

    async sendMail(to: string, subject: string, text: string): Promise<void> {
        const mailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to,
            subject,
            text,
        };

        try {
            const info = await this.transporter.sendMail(mailOptions);
            this.logger.log(`Email sent: ${info.response}`);
        } catch (error) {
            this.logger.error('Error sending email:', error);
            throw error;
        }
    }
}