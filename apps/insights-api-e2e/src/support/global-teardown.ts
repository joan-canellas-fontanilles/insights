import path from 'node:path';
import { down } from 'docker-compose';

module.exports = async function () {
  await down({ cwd: path.join(process.cwd(), 'infrastructure') });
};
