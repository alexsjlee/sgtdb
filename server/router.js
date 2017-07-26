var { mongose } = require('./db/mongoose');
const { ObjectID } = require('mongodb');
var { Student } = require('./models/student');
const fs = require('fs');

module.exports = function(app) {
    app.get('/', (req, res) => {
        var html = fs.readFileSync('./server/index.html', 'utf8');
        res.send(html);
    });

    app.get('/students', (req, res) => {
        Student.find().then((students) => {
            res.send({students});
        }, (e) => {
            res.status(400).send();
        });
    });

    app.post('/students', (req, res) => {
       var { name, course, grade } = req.body;

       var student = new Student({
           name,
           course,
           grade
       });

       student.save().then((doc) => {
           res.send(doc);
       }, (e) => {
           res.status(400).send();
       });
    });

    app.delete('/students/:id', (req, res) => {
        var id = req.params.id;

        if(!ObjectID.isValid(id)){
            return res.status(404).send();
        };

        Student.findByIdAndRemove(id).then((student) => {
            if(!student){
                return res.status(404).send();
            };
            res.status(200).send({student});
        }).catch((e) => {
            return res.status(400).send();
        });
    });

    app.patch('/students/:id', (req, res) => {
        var id = req.params.id;
        var { name, course, grade } = req.body;

        if(!ObjectID.isValid(id)){
            return res.status(404).send();
        };

        Student.findByIdAndUpdate(id, {$set: {
            name,
            course,
            grade
        }}).then((student) => {
            if(!student) {
                return res.status(404).send()
            };
            res.send({student});
        }, (e) => {
            res.status(400).send(e);
        });
    });

};