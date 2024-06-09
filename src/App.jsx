import Navigation from "./components/Navigation.jsx";
import {Sidebar} from "./components/Sidebar.jsx";
import {Panel} from "./components/Panel.jsx";
import {useEffect, useState} from "react";
import {listBands} from "./service/BandService.js";
import {GlobalContext} from "./context/GlobalContext.js";
import {listPlaces} from "./service/PlaceService.js";
import {listEvents, listUpcomingEvents} from "./service/EventService.js";

function App() {
    const [bands, setBands] = useState([]);
    const [bandsUpdateFlag, setBandsUpdateFlag] = useState(false);
    useEffect(() => {
        listBands().then((response) => {
            setBands(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [bandsUpdateFlag]);


    const [places, setPlaces] = useState([]);
    const [placesUpdateFlag, setPlacesUpdateFlag] = useState(false);
    useEffect(() => {
        listPlaces().then((response) => {
            setPlaces(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [placesUpdateFlag]);

    const [events, setEvents] = useState([]);
    const [eventsUpdateFlag, setEventsUpdateFlag] = useState(false);
    useEffect(() => {
        listEvents().then((response) => {
            setEvents(response.data);
        }).catch(error => console.log(error));
    }, [eventsUpdateFlag, bandsUpdateFlag, placesUpdateFlag]);

    const [upcoming, setUpcoming] = useState([]);
    useEffect(() => {
        listUpcomingEvents().then(response => {
            setUpcoming(response.data);
        }).catch(error => console.log(error));
    }, [eventsUpdateFlag, bandsUpdateFlag, placesUpdateFlag]);

    return (
        <>
            <Navigation/>
            <br/>
            <GlobalContext.Provider value={
                {
                    bands, bandsUpdateFlag, setBandsUpdateFlag,
                    places, placesUpdateFlag, setPlacesUpdateFlag,
                    events, eventsUpdateFlag, setEventsUpdateFlag, upcoming
                }
            }>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <Sidebar/>
                        </div>
                        <div className='col-9'>
                            <Panel/>
                        </div>
                    </div>
                </div>
            </GlobalContext.Provider>
            <div id='alerts' className='position-fixed bottom-0 end-0 mx-4 my-2'></div>
        </>
    )
}

export default App
