import { API_URL } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
import { getAuthenticatorForGet} from "../../utils.js";
import { getAuthenticatorForEdit} from "../../utils.js";

const URL = API_URL + "contacts";

export function initContacts() {
  fetchAllContacts();

  document.getElementById("add-button").onclick = addContact

  // An attempt at cycling through the various table bodies
  const arrayOfIds = [1, 2, 3, 4, 5, 6];
  for (let i = 0; i < arrayOfIds.length; i++) {
    document.getElementById("tbl-body-"+arrayOfIds[i]).onclick = editTarget
  }
  
  
  /* document.getElementById("tbl-body-1").onclick = editTarget
  document.getElementById("tbl-body-2").onclick = editTarget */
  

  // document.getElementById("tbl-body").onclick = editTarget
}

function closeModal() {
  console.log("made it here")


  document.addEventListener('submit', function (event) {

      event.preventDefault();
      event.target.reset();

});

	// evt.preventDefault();

	// evt.target.reset();




  /* document.getElementById("modal-add-contact").style.display = "none". */
  
  /* currentModal.classList.add("hidden"); */



    /* currentModal.style.display = "none";
    currentModal.className="modal fade"; */
  
}





export async function fetchAllContacts() {

    let options = getAuthenticatorForGet();
    console.log(options);

    const contactsFromServer = await fetch(URL, options).then((res) => res.json());
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
    return contact.contactType.id === id;
  });
  const tableRows = newArray.map(
    (contact) =>
      `
    <tr>
        <td>${contact.name}</td>
        <td>${contact.phone}</td>
        <td>${contact.email}</td>
        <td class="text-center">
        <button id="${contact.id}-column-id-edit" type="button"  class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modal-edit-contact">Edit</button>  
        </td>
    </tr>
    `
  );

  const tableRowStrings = tableRows.join("\n");

  return tableRowStrings;
}

function addContact() {

    // Add contact
    document.getElementById("bnt-submit-contact").onclick = makeNewContact
    
    // Refresh page
    fetchAllContacts();
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
    newContact.contactTypeId = document.getElementById("modal-select-contact-type").value
    console.log(document.getElementById("modal-select-contact-type").value)

    console.log(newContact)


    const options = {}
    options.method = "POST"
    options.headers = { "Content-type": "application/json" }
    options.body = JSON.stringify(newContact)

    console.log(JSON.stringify(newContact))

    fetch(URL + "/", options)
        .then(r => r.json())
        /* .then(addedshow => document.getElementById("returned-new-show").innerText = JSON.stringify(addedshow, null, 2) */
        
        fetchAllContacts();
        addContact();
        
}



function editTarget(evt) {
  const target = evt.target
  const htmlIdDelete ="-delete"
  const htmlIdEdit ="-edit"

 /*  if (target.id.includes("-column-id-delete")) {
      const id = target.id.replace("-column-id-delete", "")
      document.getElementById("id-to-delete").value = id
      renderContacts(id, htmlIdDelete)
      document.getElementById("btn-submit-delete").onclick = deleteShow
  } */
  if (target.id.includes("-column-id-edit")){
      const id = target.id.replace("-column-id-edit", "")
      document.getElementById("id-edit-contact").value = id
      /* optionsForDropdown(htmlIdEdit) */
      renderContacts(id)
      document.getElementById("bnt-edit-contact").onclick = submitEditedContact
  }

}

async function renderContacts(id) {
  try {
      const contact = await fetch(URL + '/' + id).then(res => res.json())
      
      contact.contactType.id

      document.getElementById("modal-input-contact-name-edit").placeholder = contact.name;
      console.log(contact.name)
      document.getElementById("modal-input-contact-phone-edit").placeholder = contact.phone;
      console.log(contact.phone)
      document.getElementById("modal-input-contact-email-edit").placeholder = contact.email;
      console.log(contact.email)
      
      var selectType = document.querySelector('#modal-select-contact-type-edit');

      // Returns the selected value
      
      selectType.value = contact.contactType.id
      console.log(selectType.value);

  } catch (err) {
      document.getElementById("error").innerHTML = err
  }
}


async function submitEditedContact(evt) {
  evt.preventDefault
  let a = 1
  try {
  const editedContact = {}

  editedContact.id = document.getElementById("id-edit-contact").value
  a = editedContact.id
  console.log(editedContact.id)
  editedContact.name = document.getElementById("modal-input-contact-name-edit").value
  console.log(editedContact.name)
  editedContact.phone = document.getElementById("modal-input-contact-phone-edit").value
  console.log(editedContact.phone)
  editedContact.email = document.getElementById("modal-input-contact-email-edit").value
  console.log(editedContact.email)
  editedContact.contactType = document.getElementById("modal-select-contact-type-edit").value
  console.log(editedContact.contactType)

  console.log(editedContact.id + "-1")

  const options = {}
  options.method = "PUT"
  options.headers = { "Content-type" : "application/json" }
  options.body = JSON.stringify(editedContact)

  await fetch(URL + '/' + 
  a, 
  options)
  .then(handleHttpErrors)
} catch (err) {
  console.log(err.message + " (Is the API online?)")
}

}