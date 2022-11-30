import { API_URL } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "contacts/";

export function initContacts() {}

export async function fetchAllContacts() {
  const contactsFromServer = await fetch(URL).then((res) => res.json());
}

function showAllContacts(data) {
  const tableRows = data.map(
    (contact) => `
    <tr>
        <td>${contact.movie.title}</td>
        <td>${contact.movie.genre}</td>
        <td>${contact.theater}</td>
        <td>
        <button id="${contact.id}-column-id-edit" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>  
        </td>
    </tr>
    `
  );
}
