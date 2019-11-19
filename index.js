let express     = require('express');
let mongoose    = require('mongoose');
let uri         = `mongodb://localhost:27017/mernstack_2410`;
let { USER_MODEL }        = require('./models/User');
// URL || URI || URN
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    let listUsers = await USER_MODEL.find({}).sort({ createAt: -1 })
    // console.log(`hello world`)
    res.json(listUsers)
});

app.get('/infouser/:userID', async (req, res) => {
    let { userID } = req.params;
    let infoUser = await USER_MODEL.findById(userID);
    // let infoUser2 = await USER_MODEL.findOne({
    //     _id: userID,
    //     status: 1
    // })
    res.json({infoUser})
});

app.post('/add-user', async (req, res) => {
    let { username, age, fullname } = req.body;
    let infoUserForInsert = new USER_MODEL({
        username, age, fullname
    });

    let infoUserAfterInsert = await infoUserForInsert.save();
    res.json({ infoUserAfterInsert });
});

app.delete('/remove-user/:username', async (req, res) => {
    let { username } = req.params;
    let infoUserAfterRemove = await USER_MODEL.findOneAndDelete({
        username
    });

    res.json({ infoUserAfterRemove })
});

app.put('/update-user/:username', async (req, res) => {
    let { username: usernameOld } = req.params;
    let { username, age, fullname } = req.body;
    let infoUserAfterUpdate = await USER_MODEL.findOneAndUpdate({
        username: usernameOld
    }, {
        username, age, fullname
    }, {
        new: true
    });
    res.json({ infoUserAfterUpdate })
})

mongoose.connect(uri);
mongoose.connection.once('open', function(){
    console.log(`mongodb connected`);
    app.listen(3000, () => {
        console.log(`server start at port 3000`);
    });
})