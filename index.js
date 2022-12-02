//import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "./navigo_spurven.js"; //Will create the global Navigo, with a few changes, object used below
//import "./navigo.min.js"  //Will create the global Navigo object used below

import {
  setActiveLink,
  adjustForMissingHash,
  renderTemplate,
  loadHtml,
} from "./utils.js";

import { initLogin } from "./pages/login/login.js";
import { initHome } from "./pages/home/home.js";
import { initContacts } from "./pages/contact/contact.js";

//index.html#/login
window.location.href = "index.html#/login/";


window.addEventListener("load", async () => {
  const templateLogin = await loadHtml("./pages/login/login.html");
  const templateHome = await loadHtml("./pages/home/home.html");
  const templateContact = await loadHtml("./pages/contact/contact.html");

  adjustForMissingHash();

  const router = new Navigo("/", { hash: true });
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router;

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url);
        done();
      },
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => {
        renderTemplate(templateHome, "content");
        initHome();
      },
      "/login": () => {
        renderTemplate(templateLogin, "content");
        initLogin();
      },
      "/contact": () => {
        renderTemplate(templateContact, "content");
        initContacts();
      },
    })
    .notFound(() => {
      renderTemplate(templateNotFound, "content");
    })
    .resolve();
});

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert(
    "Error: " +
      errorMsg +
      " Script: " +
      url +
      " Line: " +
      lineNumber +
      " Column: " +
      column +
      " StackTrace: " +
      errorObj
  );
};
