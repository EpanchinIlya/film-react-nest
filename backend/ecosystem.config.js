// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REPO,
  DEPLOY_REF = 'origin/main',
} = process.env;

module.exports = {
  apps: [
    {
      name: 'api-service',
      script: 'backend/dist/main.js', // путь к собранному файлу
      cwd: 'backend', // текущая рабочая директория
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      key: 'C://Users/Work/.ssh/id_rsa_pm2',
      ssh_options: 'StrictHostKeyChecking=no',
      //'pre-deploy': `scp C://Users/Work/.ssh/id_rsa_pm2 C:\Project\film-react-nest\backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/backend`,
      'pre-deploy': `scp C:/Users/Work/.ssh/id_rsa_pm2 C:/Project/film-react-nest/backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/backend`,
      'post-deploy': `
      cd ${DEPLOY_PATH}/current/backend &&
      npm install &&
      npm run build &&
      pm2 reload ecosystem.config.js --only api-service
    `,
    },
  },
};
