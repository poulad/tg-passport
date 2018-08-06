import request = require('request-promise');

const token = require('../config/app-config').getAppConfig().token;

export async function sendMessage(body: any): Promise<any> {
    const resp = await request({
        method: 'POST',
        uri: `https://api.telegram.org/${token}/sendMessage`,
        body: body,
        json: true,
    });
    return resp.result;
}
