import {Button, Card, CardTitle, Col, InputGroup, Modal} from "react-bootstrap";
import {useContext, useState} from "react";
import InputGroupText from "react-bootstrap/InputGroupText";
import {createEvent} from "../../service/EventService.js";
import {GlobalContext} from "../../context/GlobalContext.js";
import {CreateAlertDanger, CreateAlertSuccess} from "../../functions/Alerts.js";

export const CreateEventCard = () => {
    const {eventsUpdateFlag, setEventsUpdateFlag, places, bands} = useContext(GlobalContext);

    // Modal form states
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);

    const handleCreateEventCardClick = () => {
        setShowCreateEventModal(true);
    }

    const handleCreateEventCloseModal = () => {
        setShowCreateEventModal(false);
    }

    const [eventName, setEventName] = useState('')
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [eventWebsite, setEventWebsite] = useState('');

    const [selectedPlace, setSelectedPlace] = useState(0);
    const [selectedBands, setSelectedBands] = useState([]);

    const handleCreateEventCardSubmit = (e) => {
        e.preventDefault();

        const event = {eventName, eventStart, eventEnd, eventWebsite, place: {placeId: selectedPlace}, bands: selectedBands};

        createEvent(event).then(() => {
            setEventsUpdateFlag(!eventsUpdateFlag);
            CreateAlertSuccess("Událost byla úspěšně vytvořena!");
        }).catch((e) => {
            CreateAlertDanger("Událost nelze vytvořit: " + e.response.data.message);
            console.log(e);
        });

        setShowCreateEventModal(false);

        setEventName('');
        setEventStart('');
        setEventEnd('');
        setEventWebsite('');
    }

    return (
        <>
            <Col>
                <Card href='#' role='button' className='p-4 text-center' onClick={handleCreateEventCardClick}>
                    <CardTitle>Vytvořit akci</CardTitle>
                </Card>

                <Modal show={showCreateEventModal} onHide={handleCreateEventCloseModal}>
                    <Modal.Header>
                        <Modal.Title>Vytvořit akci</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='mb-3'>
                                <label>Název akce:</label>
                                <input className='form-control' type='text' name='eventName' onChange={(e) => setEventName(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <label>Datum a čas konání akce:</label>
                                <InputGroup>
                                    <InputGroupText>Od</InputGroupText>
                                    <input type='datetime-local' onChange={(e) => setEventStart(e.target.value)}/>
                                    <InputGroupText>Do</InputGroupText>
                                    <input type='datetime-local' onChange={(e) => setEventEnd(e.target.value)}/>
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <label>Odkaz na stránky eventu:</label>
                                <input className='form-control' type='url' name='eventWebsite' onChange={(e) => setEventWebsite(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <label>Místo konání akce:</label>
                                <select className='form-select' name='place' onChange={(e) => setSelectedPlace(e.target.value)}>
                                    <option value="" hidden></option>
                                    {
                                        places.map((p) => <option key={p.placeId} value={p.placeId}>{p.placeName}</option>)
                                    }
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label>Další kapely účastnící se akce:</label>
                                <select className='form-select' name='band' multiple onChange={(e) => setSelectedBands(Array.from(e.target.selectedOptions).map((opt) => ({bandId: opt.value})))}>
                                    {
                                        bands.map((b) => <option key={b.bandId} value={b.bandId}>{b.bandName}</option>)
                                    }
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCreateEventCardSubmit}>Vytvořit akci</Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </>
    )
}
