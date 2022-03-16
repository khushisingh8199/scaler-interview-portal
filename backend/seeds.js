const mongoose = require('mongoose');
const User = require('./models/user');

const dbUrl = 'mongodb+srv://e19cse170:khushi123@cluster0.hpd1y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Database Connected'));

const data = [
    {
        username: 'rr',
        name: 'Rishabh Pathak',
        email: 'rp@outlook.com',
        userType: 'Admin'
    },
    {
        username: 'pp',
        name: 'Pranjal Yadav',
        email: 'py@outlook.com',
        userType: 'Participant'
    },
    {
        username: 'bb',
        name: 'Glen Dsouza',
        email: 'gd@outlook.com',
        userType: 'Admin'
    },
    {
        username: 'kk',
        name: 'Kalindi',
        email: 'kk@outlook.com',
        userType: 'Participant'
    },
];

const seedParticipants = async () => {
    try {
        await User.deleteMany({});
    } catch (e) {
        console.log(e)
    }
    data.forEach(async (val) => {
        try {
            const user = new User(val);
            await user.save();
        } catch (e) {
            console.log(e);
        }
    });
}

seedParticipants().then(() => console.log('done'));