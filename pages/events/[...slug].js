import { useRouter } from "next/router"
import { getFilteredEvents } from '../../dummy-data';
import EventsList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEvents = (props) => {
  const router = useRouter();
  const filterData = router.query.slug;

  if (filterData === undefined || filterData === null) {
    return <p className='center'>Loading....</p>
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid Filter Please Adjust Your Values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>


      </>
    )
  }

  const filteredEvents = getFilteredEvents(props.events, {
    year: numYear,
    month: numMonth
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventsList items={filteredEvents} date={date} />
    </>
  )
}
export default FilteredEvents

export async function getServerSideProps(context) {
  
  const response = await fetch(`${process.env.REACT_APP_DUMMY_API_ENDPOINT}/events.json`);
  const data = await response.json();
  const events = [];
  for (let event in data){
    events.push({id: event, ...data[event]})
  }
  console.log(events)
  return {
    props: {
      events:events 
    }
  }
}