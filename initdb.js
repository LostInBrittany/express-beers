var MongoClient = require('mongodb').MongoClient;

var url = process.env.MONGODB_ADDON_URI;
var dbName = process.env.MONGODB_ADDON_DB;
var beers = [
    'AffligemBlond',
    'AffligemDubbel',
    'AffligemTripel',
    'ChimayRed',
    'ChimayTriple',
    'StBernardusAbt12',
    'StBernardusPater6',
    'StBernardusTripel',
    'TrappistesRochefort6',
    'TrappistesRochefort8',
    'TrappistesRochefort10'
]


async function initDb() {
    try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        console.log('Deleting beers');
        try {
            let dropped = await db.collection('beers').drop();
            console.log('DB dropped');
        } catch(err) {
            console.log('Collection not found', err);
        }
        console.log('Inserting beers');
        for (let i in beers) {
            let beerName = beers[i];
            console.log(`Inserting ${beerName}`);
            let beer = require(`./step-05/beers/${beerName}.json`);
            console.log(`Inserting ${beerName}`);
            let inserted = await db.collection('beers').insertOne(beer);
            console.log(`Beer ${beerName} inserted`);
        }
        return process.exit(0);
    }
    catch(err) {
        console.log('InitDb error', err);
        return process.exit(0);
    }
} 

initDb();


