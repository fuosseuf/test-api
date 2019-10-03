/* tslint:disable */
require('module-alias/register');
/* tslint:enable */
import { App } from 'bin/app';
import config from 'bin/config';

const app: App = new App(config.app.port, config.app.name);
app.start();
