import { API_URL } from "../../settings.js"
import { handleHttpErrors } from "../../utils.js"

const URL = API_URL + "auth/login"
const localhost = "http://localhost:8080/auth/login"

document.getElementById("login-form").action=localhost;

const userName = document.getElementById("username").value
const password = document.getElementById("password").value

//document.getElementById("login-button").onclick = login

function login() {
    console.log("login button got clicked")



    const user = {}
    user.username = document.getElementById("username").value
    user.password = document.getElementById("password").value
    console.log(user.username);
    console.log(user.password);

    const options = {}
    options.method = "POST"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(user)
 
    fetch(localhost, options)
        .then(r => {
            console.log("No Data returned from the server")

        })
}




async function loginLogoutClick(evt) {
    evt.stopPropagation()  //prevents the event from bubling further up
    responseStatus.innerText = ""
    const logInWasClicked = evt.target.id === "login-button" ? true : false
    if (logInWasClicked) {
        //Make the request object
        const loginRequest = {}
        loginRequest.username = userName.value
        loginRequest.password = password.value
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(loginRequest)
        }
        try {
            const res = await fetch(localhost, options).then(handleHttpErrors)
            storeLoginDetails(res)
        } catch (err) {
            responseStatus.style.color = "red"
            if (err.apiError) {
                responseStatus.innerText = err.apiError.message
            } else {
                responseStatus.innerText = err.message
            }
        }
    } else {
        //Logout was clicked
        clearLoginDetails()
    }
}
 