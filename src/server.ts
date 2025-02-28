import mongoose from 'mongoose';

import app from './app';
import config from './app/config';

// const port = 5000;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}!`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}!`);
//   });
