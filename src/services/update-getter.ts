import request = require('request-promise');
import { handle } from './update-handler';

const token = require('../config/app-config').getAppConfig().token;

export async function init() {
    let offset = 0;
    while (true) {
        const updates = await getUpdates(offset);

        for (const u of updates) {
            try {
                await handle(u);
            } catch (e) {
                console.error(e);
            }
        }

        if (updates.length > 0) {
            offset = updates[updates.length - 1].update_id + 1;
        }

        await new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 3000);
        });
    }
}

async function getUpdates(offset?: number): Promise<any[]> {
    let url = `https://api.telegram.org/${token}/getUpdates`;
    if (offset > 0) {
        url += `?offset=${offset}`;
    }
    const updatesResp: any = await request({
        uri: url,
        json: true,
    });

    if (updatesResp.ok === true) {
        return updatesResp.result as any[];
    } else {
        return [];
    }
}
