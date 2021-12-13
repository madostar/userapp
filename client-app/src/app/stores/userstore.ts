import {makeAutoObservable, runInAction} from "mobx"
import agent from "../api/agent";
import { User } from "../models/User";
import { UserMod } from "../models/UserMod";

export default class UserStore {

    users: User[] = [];
    modified: UserMod[] = [];
    selectedUser: User | null = null;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }
    

    loadUsers = async () => {
        this.loadingInitial = true;
        try {
            const users = await agent.Users.list();
            runInAction(() => {
                this.users = users;
                //pushing fixed data from the api to the list
                for (let i = 0; i < users.length; i++) {
                    var mod: UserMod ={
                        id: users[i].id,
                        username: users[i].username,
                        fullName: (users[i].firstName + " " + users[i].lastName),
                        lastLogin: (
                        new Date(
                            users[i].lastLogin).getFullYear() +
                            "-" + new Date(users[i].lastLogin).getMonth() +
                            "-" + new Date(users[i].lastLogin).getDay() +
                            " " + ((new Date(users[i].lastLogin).getHours()+"").length<2?"0":"")+ new Date(users[i].lastLogin).getHours() +
                                ":" + ((new Date(users[i].lastLogin).getMinutes()+"").length<2?"0":"") + new Date(users[i].lastLogin).getMinutes()
                        ),
                        enabled: (users[i].enabled?"Yes" : "No")
                    };
    
                    this.modified.push(mod);
                }
    
                this.loadingInitial= false;
            })

        } catch (error) {

            alert(error);
            runInAction(() => {
                this.loadingInitial= false;
            })
            
        }
        
    }

    checkUsername(username: string| any){
        this.users.forEach(user => {
            if (username==user.username) {
                return true;
            }
        });
        return false;
    }

    isUser (id: string | undefined){
        console.log(id);
        this.users.forEach(user => {
            console.log(id);
            if(user.id === id){
                console.log(true);
                return true;
            }
            
            else{
                console.log(id);
                return false
            } 

    });
    }

    // loadUser = async (id: string) => {
    //     let user= this.selectUser(id)
    //     if(user) {

    //     }
    // }
    selectUser (id: string | undefined){
        this.users.forEach(user => {
                if(user.id === id){
                    this.selectedUser = user;
                }

        });
    }

}