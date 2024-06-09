import {useContext} from "react";
import {GlobalContext} from "../context/GlobalContext.js";

export const ListUpcomingEvents = () => {
    const {upcoming} = useContext(GlobalContext);
    console.log(upcoming);
    if(!upcoming) {
        return (
            <>
                <div className='row mb-4'>
                    <h3>Nadcházející události</h3>
                    <span>Momentálně nemáte naplánované žádné nadcházející události.</span>
                </div>
            </>
        );
    }

    return (
        <>
            <div className='row mb-4'>
                <h3>Nadcházející události</h3>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Název akce</th>
                            <th>Od</th>
                            <th>Do</th>
                            <th>Místo</th>
                            <th>Spravovat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            upcoming.map((e) =>
                                <tr key={e.eventId}>
                                    <td><a href={e.eventWebsite}>{e.eventName}</a></td>
                                    <td>{new Intl.DateTimeFormat('cs-CZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }).format(new Date(e.eventStart))}</td>
                                    <td>{e.eventEnd ? (new Intl.DateTimeFormat('cs-CZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }).format(new Date(e.eventEnd))) : 'Nespecifikováno'}</td>
                                    <td><a href={e.place.placeWebsite}>{e.place.placeName}</a></td>
                                    <td><a href={'#event-id-' + e.eventId} className='link-body-emphasis'><i className='bi bi-arrow-down-square-fill' role='button'/></a></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}