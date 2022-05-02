export class AuthInfo{
    accessToken: string;
    name: string;
    isAdmin: boolean;

    constructor(accessToken: string = '', name: string = '', isAdmin: boolean =false){
        this.accessToken = accessToken;
        this.name = name;
        this.isAdmin = isAdmin;
    }
}