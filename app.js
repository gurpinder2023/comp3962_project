
require("dotenv").config();
const express = require('express');
var AWS = require("aws-sdk");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let awsConfig = {
    "region": "us-west-2",
    "accessKeyId": process.env.ACCESS_KEY_ID,
    "secretAccessKey": process.env.SECRET_ACCESS_KEY
};
    

AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "appointment",
    
};


app.use(express.static(__dirname));
app.get('/slots', (req, res) => {
    const date = req.query.date;
    const params = {
        TableName: "appointment",
    };

    // Check if date is provided as query parameter
    if (!date) {
        return res.status(400).json({ error: 'Date parameter is required' });
    }

    docClient.scan(params, (err, data) => {
        if (err) {
            console.error('Unable to read items. Error JSON:', JSON.stringify(err, null, 2));
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Data received from database:', data);
            
            // Filter the data based on the provided date
            const filteredItems = data.Items.filter(item => item.date === date);
            console.log('Filtered items:', filteredItems);
            
            res.json(filteredItems);
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

// app.get('/help', (req, res) => {
//     res.sendFile(__dirname + '/help.html');
// });

// app.get('/main', (req, res) => {
//     res.sendFile(__dirname + '/main.html');
// });

// app.post('/addTodo', (req, res) => {
//     const newTodo = req.body.newTodo;

//     if (!newTodo) {
//         return res.status(400).json({ error: 'New todo is required' });
//     }

//     const params = {
//         TableName: 'ToDoList',
//         Item: {
//             Task: newTodo
//         }
//     };

//     docClient.put(params, (err, data) => {
//         if (err) {
//             console.error('Unable to add item to DynamoDB. Error JSON:', JSON.stringify(err, null, 2));
//             res.status(500).send('Internal Server Error');
//         } else {
//             console.log('Added item to DynamoDB:', JSON.stringify(data, null, 2));
//             res.json({ success: true });
//         }
//     });
// });


// docClient.scan(params, function(err, data) {
//     if (err) {
//         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
//     }
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});