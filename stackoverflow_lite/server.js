require('dotenv').config();

const throng = require('throng');
const os = require('os');
const models = require('./models');
const app = require('./app');

const port = process.env.PORT;

function startApp() {
    let arg = {force:false};

    models.sequelize['authenticate'](arg).then(function () {
        console.log('Database Connection has been established successfully.');
        const server = app.listen(port, () => {
            console.log(`App is running on port: ${port}`);
        })
    }).catch(e => {
        console.log('Unable to connect to the database', e);
        });
}

//enabled during production due to multiple users.
if(process.env.CLUSTER_MODE) {
    const throngWorkers = os.cpus().length;
    throng(throngWorkers, startApp);
} else {
    startApp();
}

