
import { baseService } from './baseService'

export default class UserService extends baseService {
    constructor(){
        super()
    }
    getUser = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }

    assignUserProject = (userProject) =>{
        return this.post(`Project/assignUserProject`,userProject)
    }
    deleteUserFromProject = (userProject) => {
        return this.post(`Project/removeUserFromProject`,userProject);
    }
}

export const userService = new UserService()
