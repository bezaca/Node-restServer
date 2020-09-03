
// PORT

process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Base de datos

let urlDB;

if (process.env.NODE_ENV === 'dev') {

    urlDB = 'mongodb://localhost:27017/cafe';

} else {

    urlDB = 'mongodb+srv://fcabeza:<gW8B0G9fd1Lfv0WH>@cluster0.vjn7t.mongodb.net/test';
}

process.env.URLDB = urlDB;

