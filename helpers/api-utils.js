export async function getAllEvents() {
  const response = await fetch(`${process.env.REACT_APP_DUMMY_API_ENDPOINT}/events.json`);
  const data = await response.json();
  const events = [];

  for (let event in data){
    events.push({id : event, ...data[event]})
  }
  return events;
}

export async function getFeaturedEvents() {
    const events = await getAllEvents();
    return events.filter(event => event.isFeatured);
}

export async function getEventById(eventId) {
   const response = await fetch(`${process.env.REACT_APP_DUMMY_API_ENDPOINT}/events/${eventId}.json`);
   return await response.json();
}

export function getFilteredEvents(events, dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}
