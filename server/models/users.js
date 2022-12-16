const data = require('../data/users.json');
const { connect } = require('./mongo');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'users';

async function collection(){
    const client = await connect();
    return client.db('chopiphy').collection(COLLECTION_NAME);
}

async function getUsers(){
    const db = await collection();
    const data = await db.find().toArray()
    return { total: data.length, limit: data.length, users: data };
}
async function getGender() {
    const db = await collection();
    const data = await db.distinct('gender')
    return data;
}

async function getUser(id){
    const db = await collection();
    const data = await db.findOne({_id: new ObjectId(id) })
    return data;
}

async function addUser(user){
    const db = await collection();
    const result = await db.insertOne(user)
    return user;
}

async function updateUser(id, user){
    const db = await collection();
    delete user._id;
    const result = await db.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: user },
        { returnDocument: 'after' })
    return result.value;
}

async function deleteUser(id){
    const db = await collection();
    const result = await db.deleteOne({ _id: new ObjectId(id) })
    return result;
}

async function seed(){
    const db = await collection();
    db.insertMany(data.users);
    return 'success';
}

module.exports = {
    COLLECTION_NAME,
    collection,
    getUsers,
    getGender,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    seed,
}

