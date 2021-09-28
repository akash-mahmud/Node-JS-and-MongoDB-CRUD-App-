const Userdb = require('../model/model');


//  Create and save new user

exports.create = async(req,res) =>{

  const {name,email,gender,status} = req.body;
  //validate request

  if(!req.body){

    res.status(400).send({message:"Content can not be Empty!"});
    return
  }

  try {
    
 // new user
 const user = new Userdb({name,email,gender,status})

 // save user in the database
 await user.save();

 console.log(user);

 res.status(202).send(user)

  } catch (err) {

    res.status(500).send({

      message : err.message || "Some error occurred while creating a create operation"
  });
 
}

};

//retrive and return all users / retrive and return a singel user

exports.find = async(req , res) => {

  if(req.query.id){
    const id = req.query.id;

    Userdb.findById(id)
        .then(data =>{
            if(!data){
                res.status(404).send({ message : "Not found user with id "+ id})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message: "Erro retrieving user with id " + id})
        })

}else{
    Userdb.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
}


};


//Update a new idenfied user by user id 

exports.update = async(req , res) => {

  if(!req.body){
    return res.status(400).send({message:"Data can not be Empty!"})
  }
  const id = req.params.id
try {
  const data = await Userdb.findByIdAndUpdate(id , req.body,{useFindAndModify:false});
  if(!data){
    res.status(404).send({message:`Can not update user with ${id}. May be User not found`})
  }else{
    console.log(data);
    res.send(data);
  }
} catch (error) {
  res.status(500).send({

    message :"Error update user information"
});
}

};

//delete a  user by specified user id in the request

exports.delete = async(req , res) => {
 
  const id = req.params.id
  try {
    const result = await Userdb.findByIdAndDelete(id);
    if(!result){
      res.status(404).send({message:`Can not delete user with ${id}. May be User id is wrong`})
    }else{
      
        console.log(result);
        res.send({
          message:"User deleted"
        });
      
    }
  } catch (error) {
    res.status(500).send({

      message :"Could not delete user"
  });
  }
};