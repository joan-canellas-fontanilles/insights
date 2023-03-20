import path from 'node:path';
import { logs, upMany } from 'docker-compose';

module.exports = async function () {
  await upMany(['insights-api', 'insights-db'], {
    cwd: path.join(process.cwd(), 'infrastructure'),
  });

  await new Promise<void>((resolve, reject) => {
    setTimeout(
      () =>
        reject(new Error('Docker-compose up authentication-service timeout')),
      30 * 1_000
    );
    logs(['insights-api'], {
      follow: true,
      cwd: path.join(process.cwd(), 'infrastructure'),
      callback: (buffer) => {
        if (buffer.toString('utf-8').includes('Application is running')) {
          resolve();
        }
      },
    });
  });
};
