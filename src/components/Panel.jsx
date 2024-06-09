import ListEvents from "./ListEvents.jsx";
import {CreateCards} from "./CreateCards.jsx";
import {ListUpcomingEvents} from "./ListUpcomingEvents.jsx";

export const Panel = () => {
    return (
        <>
            <div className='container'>
                <CreateCards/>
                <ListUpcomingEvents/>
                <ListEvents/>
            </div>
        </>
    )
}
