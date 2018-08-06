import { sendMessage } from './bot-client';

export async function handle(update: any): Promise<any> {
    if (update.message && update.message.text.startsWith('/ping')) {
        await sendMessage({
            chat_id: update.message.chat.id,
            text: 'PONG!'
        });
        return;
    }

    if (update.passport_data) {
        return;
    }

    console.warn('invalid update');
}
