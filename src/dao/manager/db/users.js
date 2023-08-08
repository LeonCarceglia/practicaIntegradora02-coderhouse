import userModel from "../../models/user"

export default class UsersManager{
    constructor(){
        console.log("Working Users with mongo")
    }

    getUsers = () =>{
        return userModel.find().lean()
    }

    getUser = (id) =>{
        return userModel.findById(id).lean()
    }

    createUser = (user) =>{
        return productModel.create(user)
    }

    updateUser = (id, user) =>{
        return userModel.findByIdAndUpdate(id, user)
    }

    deleteUser = (id) =>{
        return userModel.findByIdAndDelete(id)
    }
}