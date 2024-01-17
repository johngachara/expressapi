const {mongoose} = require('mongoose');
const uri = 'mongodb://localhost:27017/practise';
const Schema = mongoose.Schema;
const mongo = require('mongodb');


const is_empty = (obj) => {
    return !obj || (Array.isArray(obj) && obj.length === 0) || (typeof obj === 'object' && Object.keys(obj).length === 0);
};
mongoose.connect(uri)
    .then(() => {
        console.log(`Connected successfully`);
    })
    .catch(error => {
        console.log(error);
    });
const practise_schema = new Schema({
    "name":{unique:true,type:String,required:true},
    "age": Number
})
const data = mongoose.model('Practise', practise_schema);  // Create a model for your schema
module.exports.Create = (req, res) => {
    try {
        let request_body = req.body;
        data.create(request_body)
            .then(result => {
                res.status(201).send({name:result.name,age:result.age});  // Send the created document directly
            })
            .catch(error => {
                res.status(400).send(error);
            });
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports.Get_all = (req, res) => {
    try {
        data.find()
            .then(result => {
                if (is_empty(result)) {
                    res.status(400);
                    res.send('Db is empty');
                } else {
                    res.status(200).send(result);
                }
            })
            .catch(error => {
                res.send(error);
            });
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}
module.exports.Get_one = (req, res) => {
    try {
        console.log('Searching for ID:', req.params.id);
        data.findById(req.params.id)
            .then(result => {

                    res.status(200);
                    res.json({name:result.name,age:result.age});

            }).catch(error => {
            console.error(error);  // Log the error
            res.status(500).send('Internal Server Error');
        });
    } catch (error) {
        console.error(error);  // Log the error
        res.status(500).send('Internal Server Error');
    }
}
module.exports.Update = (req, res) => {
    try {
        let to_update = req.body;
        data.findByIdAndUpdate(req.params.id, to_update, { new: true })
            .then(updatedDocument => {
                if (!updatedDocument) {
                    res.status(404).send('Document not found');
                } else {

                    res.json(updatedDocument);
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Internal Server Error');
            });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
module.exports.Delete_one = (req, res) => {
    try {
        data.findByIdAndDelete(req.params.id)
            .then(result => {
                if (is_empty(result)) {
                    res.status(404).send("Value not in db");
                } else {
                    res.status(204).send(`${result.name} deleted successfully`);
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Server Error");
            });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
module.exports.Delete_all = (req,res)=>{
    try{
        data.deleteMany({})
            .then(result=>{
                if(result.deletedCount === 0){
                    res.status(404).send("No data to delete");
                }else {
                    res.status(200);
                    res.send("ALl data deleted")
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).send("Server Error");
            });

    }catch (error){
        console.error(error);
        res.status(500).send("Server Error");
    }
}







