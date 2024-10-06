/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

import { SuperAdminService } from './app/modules/superAdmin/superAdmin.service';
import { User } from './app/modules/user/user.model';
import config from './config/index';
import { startSpinner } from './utils/LoadingAnimation';
import { permissionInserter } from './utils/PermissionInserter';

process.on('uncaughtException', error => {
  // errorlogger.error(error);
  console.log(error);
  process.exit(1);
});

let server: Server;

async function mainFunction() {
  try {
    // await RedisClient.connect().then(() => {
    //   subscribeToEvents();
    // });

    await mongoose.connect(config.database_url as string);

    // logger.info(`🛢   Database is connected successfully`);
    console.log(`\u{2705} 🛢   Database is connected successfully`);

    // Permission Inserter

    await permissionInserter()
      .then()
      .catch(err => console.log(err));

    // Checking if super admin exists and creating super admin
    const spinnerStopper = startSpinner('Checking For Super Admin');
    const doesUserExists = await User.find({ role: 'super-admin' });
    if (doesUserExists.length == 0) {
      await SuperAdminService.postSuperAdmin();
      spinnerStopper();
      console.log(' \u{2705} Super Admin created successfully');
    } else {
      spinnerStopper();
      console.log('\u{274C} Super Admin exists. Not Inserting New');
    }

    server = app.listen(config.port, () => {
      // logger.info(`Application  listening on port ${config.port}`);
      console.log(` \u{2705} Application  listening on port ${config.port}`);
    });
  } catch (err) {
    // errorlogger.error('Failed to connect database', err);
    console.log(err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        // errorlogger.error(error);
        console.log(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

mainFunction();
