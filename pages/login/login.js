import { API_URL } from "../../settings.js"
import { handleHttpErrors } from "../../utils.js"
import { sanitizeStringWithTableRows } from "../../utils.js"
const URL = API_URL + "/login"



export function initLogin() {
  document.getElementById("login-button").onclick = login
}

function login() {
  console.log("Inden login")  
  const user = {}
    user.password = document.getElementById("password").value
    user.password = document.getElementById("password").value


    const options = {}
    options.method = "GET"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(user)
 
    fetch(URL + "/" + user.username + "/" + user.password, options)
        .then(r => {
            console.log("No Data returned from the server")
            alert("User was succesfully found (or not - we don't know")
        })

}

