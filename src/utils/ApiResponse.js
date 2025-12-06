class ApiResponse extends Response {
    constructor(statuscode,data,message="Success",){
            super();

             this.statuscode=statuscode;
             this.data=data;
             this.message=message;
             this.success=400>statuscode;
    }
}

export {ApiResponse};