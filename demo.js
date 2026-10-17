if (process.env.NODE_ENV === 'production') {
  throw new Error('Demo mode is disabled in production.');
}
process.env.DEMO_MODE = '1';
require('./index');
