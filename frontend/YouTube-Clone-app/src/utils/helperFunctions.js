import  {jwtDecode}  from "jwt-decode";

// function to store JWT Token in Local Storage 
export function storeTokenInLS(serverToken){
    return localStorage.setItem('token',serverToken);
}

// function to store user email and name in Local Storage 
export function storeUserEmailInLS(email){
   return localStorage.setItem('userEmail',email);
}

export function storeUserIdInLS(userId){
    return localStorage.setItem("userId",userId)
}


//function to compare token for Expiration
export function isTokenExpired(serverToken){
    
    const decoded = jwtDecode(serverToken);
    var currentdate=new Date();
    const currentTimeStamp = currentdate.getTime().toString().slice(0,-3);

    if(Number(currentTimeStamp) >=decoded.exp){
        console.log("JWT Token Expired!");
        return true;
    }else{
        return false;
    }
    

}