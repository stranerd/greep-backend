import { Email } from '@stranerd/api-commons'

export enum EmailsList {
	NO_REPLY = 'no_reply@grip.com'
}

export type TypedEmail = Email<EmailsList, {}>