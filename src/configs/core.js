const path = require('path');

/**
 * Default name of the service
 * @type {String}
 */
exports.name = 'ms-files';

/**
 * Enables plugins. This is a minimum list
 * @type {Array}
 */
exports.plugins = [
  'validator',
  'logger',
  'opentracing',
  'amqp',
  'hapi',
  'router',
  'router-amqp',
  'router-hapi',
  'redis-cluster',
  'prometheus',
  'dlock',
];

/**
 * Pino logger configuration
 * by default only ringBuffer logger is enabled in prod
 * @type {Boolean}
 */
exports.logger = {
  defaultLogger: true,
  debug: process.env.NODE_ENV === 'development',
};

/**
 * Debug settings
 * @type {Boolean}
 */
exports.debug = process.env.NODE_ENV !== 'production';

/**
 * Local schemas for validation
 * @type {Array}
 */
exports.validator = {
  schemas: [path.resolve(__dirname, '../../schemas')],
  ajv: {
    $meta: '@microfleet/validation AJV schema validator options',
  },
};

/**
 * Default hooks
 * @type {Object}
 */
exports.hooks = {
  'files:info:pre': [],
  'files:upload:pre': [],
  'files:update:pre': [],
  'files:process:pre': [],
  'files:process:post': [],
  'files:info:post': [],
  'files:clone:before-pipeline-exec': [],
};

/**
 * Redis lock settings
 * @type {Object}
 */
exports.dlock = {
  lockPrefix: 'dlock!',
  pubsubChannel: '{ms-files}:dlock',
  lock: {
    timeout: 60000,
    retries: 0,
    delay: 100,
  },
};

/**
 * Default storage settings for transport
 * @type {Array}
 */
exports.transport = [{
  // transport name
  name: 'gce',
  // provide config options
  options: {},
  // set to true when using as a public name
  cname: false,
}];

/**
 * Default selectTransport settings
 * @returns {Provider}
 */
exports.selectTransport = function selectTransport() {
  return this.providers[0];
};

/**
 * User service configuration
 * @type {Object}
 */
exports.users = {
  audience: '*.localhost',
  exportAudience: 'ms-files',
  getInternalData: 'users.getInternalData',
  getMetadata: 'users.getMetadata',
  updateMetadata: 'users.updateMetadata',
};

/**
 * Payments service configuration
 * @type {Object}
 */
exports.payments = {
  planGet: {
    route: 'payments.plan.get',
    options: {
      cache: 5 * 60 * 1000,
    },
  },
};

/**
 * TTL of key for action list in seconds
 * @type {Number}
 */
exports.interstoreKeyTTL = 15;

/**
 * minimum remaining time(ms) to a previously saved key for action list
 * @type {Number}
 */
exports.interstoreKeyMinTimeleft = 2000;

/**
 * upload expiration time ~ 24 hours
 * @type {Number}
 */
exports.uploadTTL = 60 * 60 * 24;

/**
 * max tries for post-processing
 * @type {Number}
 */
exports.maxTries = Number.MAX_SAFE_INTEGER;

/**
 * Max search interval
 * @type {number}
 */
exports.listMaxInterval = 32 * 24 * 60 * 60 * 1e3; // 32 days by default

/**
 * API Domain
 * @type {String}
 */
exports.apiDomain = {
  $filter: 'env',
  $default: 'set-your-hostname',
  production: 'set-your-hostname',
};

/**
 * Controls if redis search is available
 */
exports.redisSearch = {
  enabled: false,
};
