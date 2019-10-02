const config: {[key: string]: IConfig} = {
    development: {
        app: {
            port: 5000,
            name: 'Tennis::api',
        },
    },
    production: {
        app: {
            port: 5000,
            name: 'Tennis::api',
        },
    },
};

interface IConfig {
    app: {
        port: number;
        name: string;
    };
}

export default config[process.env.ENV] || config.production;
