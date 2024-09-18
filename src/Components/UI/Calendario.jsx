import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export function Calendario() {
    const [eventList, setEventList] = useState([]);

    const dateManager = (arg) => {
        const eventName = window.prompt("Por favor, ingresa el nombre del evento:");
        if (eventName) {
            const newEvent = { title: eventName, start: arg.dateStr };
            setEventList([...eventList, newEvent]);
        }
    };

    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        );
    };

    return (
        <div className="bg-white m-auto w-full h-[70vh] mt-0 rounded-3xl laptop:row-[1/4] laptop:col-start-1 laptop:col-end-4 md:col-[1/4] laptop:h-full">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                headerToolbar={{
                    start: window.innerWidth <= 640 ? 'title' : 'timeGridDay,timeGridWeek,dayGridMonth',
                    center: window.innerWidth <= 640 ? '' : 'title',
                    end: 'today prev,next',
                }}
                height='100%'
                selectable={true}
                events={eventList}
                eventContent={renderEventContent} 
                dateClick={dateManager}
                nowIndicator={true}
                dayMaxEvents={3}
                fixedWeekCount={false}
            />
        </div>
    );
}