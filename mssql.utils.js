/*
When I used to use MongoDB (and mongoose), I had to create these.

  ** createEventListeners
  ** connect
  ** disconnect

  I'm not yet sure if I need to do something similar for sql server.
 */

const mssqlConfig = {
    user: 'sa',
    password: 'Alejandro741852!?',
    server: 'localhost',
    database: 'local_sand',
    /*    user: 'SA',
        password: 'practiceDB123',
        server: 'localhost',
        database: 'TestDB',
        /*options: {
            
            
            I might need these if we have to do windows authentication
            
            trustedConnection: true,
            enableArithPort: true,
            instanceName: 'matthew-Linuxmini'
    
        },*/
    PORT: 1433
}

module.exports = mssqlConfig;