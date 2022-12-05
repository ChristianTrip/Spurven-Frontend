import { API_URL } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "contacts/";

export function initContacts() {
  fetchAllContacts();
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
