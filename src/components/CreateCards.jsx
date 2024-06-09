import {AddPlaceCard} from "./cards/AddPlaceCard.jsx";
import {AddBandCard} from "./cards/AddBandCard.jsx";
import {CreateEventCard} from "./cards/CreateEventCard.jsx";

export const CreateCards = () => {
    return (
        <>
            <div className='row mb-4'>
                <AddPlaceCard/>
                <AddBandCard/>
                <CreateEventCard/>
            </div>
        </>
    )
}
