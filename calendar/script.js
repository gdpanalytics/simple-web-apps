document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var modal = document.getElementById("eventModal");
    var span = document.getElementsByClassName("close")[0];
    var eventForm = document.getElementById("eventForm");
    var savedEvents = JSON.parse(localStorage.getItem('calendarEvents')) || [];

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: savedEvents,
        dateClick: function (info) {
            modal.style.display = "block";
            eventForm.onsubmit = function (e) {
                e.preventDefault();
                var title = document.getElementById("eventName").value;
                if (title) {
                    var newEvent = {
                        id: Date.now().toString(),
                        title: title,
                        start: info.dateStr,
                        allDay: true
                    };
                    calendar.addEvent(newEvent);
                    savedEvents.push(newEvent);
                    localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));
                    modal.style.display = "none";
                    eventForm.reset();
                }
            }
        },
        eventClick: function (info) {
            if (confirm("Are you sure you want to delete this event?")) {
                info.event.remove();
                savedEvents = savedEvents.filter(event => event.id !== info.event.id);
                localStorage.setItem('calendarEvents', JSON.stringify(savedEvents));
            }
        }
    });
    calendar.render();

    span.onclick = function () {
        modal.style.display = "none";
    };

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
});
