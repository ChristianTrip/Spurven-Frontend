import { API_URL } from "../../settings.js";
import { handleHttpErrors } from "../../utils.js";
import { sanitizeStringWithTableRows } from "../../utils.js";
const URL = API_URL + "events/";

export function initCalendar() {
  console.log(5);
  showCalender();
}

function showCalender(events) {
  console.log(1);
  const calendarEl = document.getElementById("calendar");
  console.log("1");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: "2022-11-07",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    events: [
      {
        title: "All Day Event",
        start: "2022-11-01",
      },
      {
        title: "Long Event",
        start: "2022-11-07",
        end: "2022-11-10",
      },
      {
        title: "Repeating Event",
        start: "2022-11-09T16:00:00",
      },
      {
        title: "Repeating Event",
        start: "2022-11-16T16:00:00",
      },
      {
        title: "Conference",
        start: "2022-11-11",
        end: "2022-11-13",
      },
      {
        title: "Meeting",
        start: "2022-11-12T10:30:00",
        end: "2022-11-12T12:30:00",
      },
      {
        title: "Lunch",
        start: "2022-11-12T12:00:00",
      },
      {
        title: "Meeting",
        start: "2022-11-12T14:30:00",
      },
      {
        title: "Birthday Party",
        start: "2022-11-13T07:00:00",
      },
      {
        title: "Click for Google",
        url: "http://google.com/",
        start: "2022-11-28",
      },
    ],
  });
  console.log("2");
  calendar.render();
  console.log("3");
}

export async function fetchAllEvents() {
  const eventsFromServer = await fetch(URL).then((res) => res.json());
  //showCalender(eventsFromServer)
}
