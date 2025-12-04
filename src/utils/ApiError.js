class ApiError extends Error{
    constructor(statuscode,message="Problem Occured",errors=[]){
        super(message);
        this.statuscode=statuscode;
        this.data=null;    //For errors, there is usually no data → so it sets it to null.
        this.message=message;

        this.success=false;
        this.errors=errors

    }
}

// ApiError: custom error class for APIs.
// Extends Error and adds status code, message, success=false,
// optional error details, and a null data field.
// Lets us throw consistent, structured API error responses.