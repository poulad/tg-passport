export interface AppConfig {
    token: string;
}

let config: AppConfig;

export function getAppConfig(): AppConfig {
    if (config) {
        return config;
    }

    process.env.NODE_ENV = process.env.NODE_ENV || 'development';
    config = {
        token: ''
    };

    if (process.env['APP_CONFIG']) {
        config = JSON.parse(process.env['APP_CONFIG']);
    } else {
        Object.assign(config, require(`./env/${process.env.NODE_ENV}`));
    }

    return config;
}
