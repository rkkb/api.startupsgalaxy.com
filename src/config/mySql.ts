import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'startups_galaxy',
  'startups-galaxy',
  'startupsgalaxY#234',
  {
    host: '159.223.227.117',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  },
);

export async function SqlConnection() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');

    await sequelize.sync({ alter: true });
    // eslint-disable-next-line no-console
    console.log('The table are synced');
  } catch (error) {
    // await sequelize.close()

    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', error);
  }
}

export default sequelize;
