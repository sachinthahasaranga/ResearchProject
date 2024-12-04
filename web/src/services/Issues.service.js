import axios from 'axios';
import EventEmitter from '../utils/EventEmitter';
import {handleErrors} from './Error.Handling';
import varaiables from '../data/env';

const path = varaiables.SERVER_URL  + "/api/issues";
var issue_list = [];

class IssuesService {
    

    async getIssues(){
        issue_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                issue_list.push(doc);
            });
            // console.log(issue_list);
            // return issue_list;
        }).catch(handleErrors);
        return issue_list;
    }

    async getIssue(id){
        var obj = null;
        await axios.get(`${path}/find/${id}`).then((response)=>{
            
            obj =  response.data;
            console.log(obj);
            // response.data.forEach(doc=>{
            //     return doc;
            // });
        }).catch(handleErrors);
        return obj;
    }


    async addIssue(issue){
        console.log(issue)
        await axios.post(`${path}`, issue).then((response)=>{
            console.log(response);
            if(response.data){
                
            } else {
                alert("Error Occured check your Email which should be uniq");
            }
            
        }).catch(handleErrors);
        console.log("Issue Entered!");
    }

    async updateIssue(id, issue){
        await axios.put(`${path}/${id}`, issue).then((response)=>{

        }).catch(handleErrors);
    }

    async deleteIssue(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
    }

    
}

export default new IssuesService();