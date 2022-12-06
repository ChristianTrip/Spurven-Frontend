import { API_URL } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "contacts/";

export function initContacts() {
  fetchAllContacts();
  document.getElementById("add-button").onclick = addContact
  // document.getElementById("tbl-body").onclick = editTarget
}

export async function fetchAllContacts() {
  const contactsFromServer = await fetch(URL).then((res) => res.json());
  //currently the best solution is to hardcode the ids of the contactTypes
  const arrayOfIds = [1, 2, 3, 4, 5, 6];
  for (let i = 0; i < arrayOfIds.length; i++) {
    let currentId = arrayOfIds[i];
    var contactsCategorized = showAllContacts(contactsFromServer, currentId);
    document.getElementById("tbl-body-" + currentId).innerHTML =
      sanitizeStringWithTableRows(contactsCategorized);
  }
}

function showAllContacts(data, id) {
  var newArray = data.filter(function (contact) {
    return contact.contactType.id == id;
  });
  const tableRows = newArray.map(
    (contact) =>
      `
    <tr>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
        <td>
        <button id="${contact.id}-column-id-edit" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>  
        </td>
    </tr>
    `
  );

  const tableRowStrings = tableRows.join("\n");

  return tableRowStrings;
}

function addContact() {
    // const htmlId = "-add"
    // optionsForDropdown(htmlId)
    document.getElementById("bnt-submit-contact").onclick = makeNewContact
}

async function optionsForDropdown(htmlId) {
    const showsValuesForDropdown = await fetch(URL).then(res => res.json())
    selectTypeOptions(showsValuesForDropdown, htmlId)
    // selectTimeOptions(showsValuesForDropdown, htmlId)
    
    // we'll wait with this one
    // fetchMovieToEdit(htmlId)
}

function selectTypeOptions(data, htmlId) {
    const optionsRows = data.map(contact => `
    <option value="${contact.contactType}">${contact.contactType}</option>
`)
    document.getElementById("select-date" + htmlId).innerHTML = optionsRows

}


function makeNewContact() {
    const newContact = {}
    newContact.name = document.getElementById("modal-input-contact-name").value
    newContact.phone = document.getElementById("modal-input-contact-phone").value
    newContact.email = document.getElementById("modal-input-contact-email").value
    newContact.contactType.id = document.getElementById("modal-select-contact-type").value

    const options = {}
    options.method = "POST"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(newShow)

    fetch(URL, options)
        .then(r => r.json())
        .then(addedshow => document.getElementById("returned-new-show").innerText = JSON.stringify(addedshow, null, 2)
        )
}
