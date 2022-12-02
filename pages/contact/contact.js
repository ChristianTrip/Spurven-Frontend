import { API_URL } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "contacts/";

export function initContacts() {
  fetchAllContacts();
}

export async function fetchAllContacts() {
  const contactsFromServer = await fetch(URL).then((res) => res.json());
  showAllContacts(contactsFromServer);
}

//<td>${contact.contactType.id}</td> <--Good to have x)
function showAllContacts(data) {
  console.log(data);
  const tableRows = data.map(
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

  let contactType = [];
  data.forEach((contact) => (contactType += contact.contactType.id));

  for (let i = 0; i < contactType.length; i++) {
    document.getElementById("tbl-body-" + contactType[i]).innerHTML =
      sanitizeStringWithTableRows(tableRowStrings);
  }
}

function filterData() {}
