import {useContext, useState} from "react";
import {deleteEvent, updateEvent} from "../service/EventService.js";
import {FormCheck, InputGroup, Modal} from "react-bootstrap";
import {GlobalContext} from "../context/GlobalContext.js";
import InputGroupText from "react-bootstrap/InputGroupText";
import {createTicket, deleteTicket, fetchTicket, updateTicket} from "../service/TicketService.js";
import {CreateAlertDanger, CreateAlertSuccess, CreateAlertWarn} from "../functions/Alerts.js";

const ListEvents = () => {
    const {events, bands, places, eventsUpdateFlag, setEventsUpdateFlag} = useContext(GlobalContext);

    // Stuff for modifying
    const MODIFY_NONE = 0;
    const MODIFY_EDIT = 1;
    const MODIFY_TICKETS = 2;
    const MODIFY_DELETE = 3;

    const [modifyState, setModifyState] = useState(MODIFY_NONE);
    const [selectedEvent, setSelectedEvent] = useState({});

    const startModification = (type, event) => {
        switch(type) {
            case MODIFY_EDIT:
                startEventEdit(event);
                break;
            case MODIFY_TICKETS:
                startTicketsEdit(event);
                break;
        }

        setSelectedEvent(event);
        setModifyState(type);
    };

    const closeModal = () => {
        setModifyState(MODIFY_NONE);
        setSelectedEvent({});
    };

    const [eventName, setEventName] = useState('')
    const [eventStart, setEventStart] = useState('');
    const [eventEnd, setEventEnd] = useState('');
    const [eventWebsite, setEventWebsite] = useState('');

    const [selectedPlace, setSelectedPlace] = useState(0);
    const [selectedBands, setSelectedBands] = useState([]);

    const startEventEdit = (event) => {
        console.log(event);

        setEventName(event.eventName);
        setEventStart(event.eventStart);
        setEventEnd(event.eventEnd);
        setEventWebsite(event.eventWebsite);

        setSelectedPlace(event.place.placeId);
        setSelectedBands(event.bands);
    }

    const processEventEdit = (e) => {
        e.preventDefault();

        const event = {eventId: selectedEvent.eventId, eventName, eventStart, eventEnd, eventWebsite, place: {placeId: selectedPlace}, bands: selectedBands};

        updateEvent(event).then(() => {
            setEventsUpdateFlag(!eventsUpdateFlag);
            CreateAlertSuccess("Událost byla upravena.");
        }).catch((er) => {
            CreateAlertDanger("Událost nebylo možé upravit: " + er);
        });

        closeEventEdit();
        closeModal();
    }

    const closeEventEdit = () => {
        setEventName('');
        setEventStart('');
        setEventEnd('');
        setEventWebsite('');

        setSelectedPlace(0);
        setSelectedBands([]);
    }

    const [ticketPrice, setTicketPrice] = useState('');
    const [atPlace, setAtPlace] = useState(true);
    const [ticketWebsite, setTicketWebsite] = useState('');

    const startTicketsEdit = (e) => {
        closeTicketUpdate();
        fetchTicket(e.eventId).then(r => {
            setTicketPrice(r.data.ticketPrice);
            setAtPlace(r.data.atPlace);
            setTicketWebsite(r.data.ticketWebsite);
        }).catch(() => {});
    }

    const processTicketUpdate = (e) => {
        e.preventDefault();

        const ticket = {
            eventId: selectedEvent.eventId,
            ticketPrice: ticketPrice,
            atPlace: atPlace,
            ticketWebsite: ticketWebsite
        };

        console.log(ticket);

        fetchTicket(ticket.eventId)
            .catch(() => {
                createTicket(ticket).then(() => {
                    setEventsUpdateFlag(!eventsUpdateFlag);
                    CreateAlertSuccess("Informace o vstupenkách na akci byly vytvořemy!");
                });
            })
            .then(() => {
                updateTicket(ticket).then(() => {
                    setEventsUpdateFlag(!eventsUpdateFlag);
                    CreateAlertSuccess("Informace o vstupenkách na akci byly upraveny!");
                });
            });

        closeTicketUpdate();
        closeModal();
    }

    const processTicketDeletion = () => {
        deleteTicket(selectedEvent.eventId).then(() => {
            setEventsUpdateFlag(!eventsUpdateFlag);
            CreateAlertSuccess("Informace o vstupenkách na akci byly smazány.");
        });

        closeTicketUpdate();
        closeModal();
    }

    const closeTicketUpdate = () => {
        setTicketPrice('');
        setAtPlace(true);
        setTicketWebsite('');
    }

    const processDelete = (eventId) => {
        deleteEvent(eventId).then(() => {
            setEventsUpdateFlag(!eventsUpdateFlag);
            CreateAlertSuccess("Událost byla smazána.");
        }).catch((e) => {
            console.log(e);
            CreateAlertDanger("Událost nelze odstranit: " + e.response.data.message);
        });

        closeModal();
    };

    return (
        <>
            <div className='row mb-4'>
                <h3>Přehled událostí</h3>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Název akce</th>
                            <th>Datum konání</th>
                            <th>Místo konání</th>
                            <th>Další kapely</th>
                            <th>Vstupenky</th>
                            <th>Spravovat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map((e) =>
                                <tr key={e.eventId} id={'event-id-' + e.eventId}>
                                    <td><a href={e.eventWebsite !== '' && e.eventWebsite}>{e.eventName}</a></td>
                                    <td>{new Intl.DateTimeFormat('cs-CZ', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }).format(new Date(e.eventStart))}</td>
                                    <td><a href={e.place.placeWebsite !== '' && e.place.placeWebsite}>{e.place.placeName}</a></td>
                                    <td>{e.bands.map((b) => b.bandName).join(', ')}</td>
                                    <td>
                                        {
                                            ((!e.ticket) && <a role='button' title='Tato akce nemá zadané informace o vstupenkách' onClick={() => CreateAlertWarn("Tato událost nemá zadané informace o vstupenkách.")}><i className='me-2 bi bi-exclamation-circle-fill'/></a>)
                                        }
                                        {
                                            e.ticket && <a role='button' title='Akce má nastavené vstupenky' onClick={() => CreateAlertSuccess("Událost má nastavené vstupenky.")}><i className='me-2 bi bi-check-circle-fill'/></a>
                                        }
                                        {
                                            (e.ticket && e.ticket.ticketWebsite && e.ticket.ticketWebsite !== '' && <a className='link-body-emphasis' href={e.ticket.ticketWebsite} title='Webové stránky pro nákup lístků'><i className='me-2 bi-bag-dash-fill'/></a>)
                                        }
                                        {
                                            (e.ticket && e.ticket.atPlace && <a role='button' title='Vstupenky jsou dostupné na místě' onClick={() => CreateAlertSuccess("Vstupenky jsou dostupné na místě.")}><i className='me-2 bi-building-fill-check'/></a>)
                                        }
                                    </td>
                                    <td>
                                        <i className='me-2 bi bi-pen-fill' role='button' title='Upravit událost' onClick={() => startModification(MODIFY_EDIT, e)}/>
                                        <i className='me-2 bi-ticket-fill' role='button' title='Nastavit vstupenky' onClick={() => startModification(MODIFY_TICKETS, e)}/>
                                        <i className='bi-trash3-fill' role='button' title='Smazat událost' onClick={() => startModification(MODIFY_DELETE, e)}/>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <Modal show={modifyState === MODIFY_EDIT} onHide={() => setModifyState(MODIFY_NONE)}>
                    <Modal.Header>
                        Upravit událost
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='mb-3'>
                                <label>Název akce:</label>
                                <input className='form-control' type='text' name='eventName' value={eventName} onChange={(e) => setEventName(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <label>Datum a čas konání akce:</label>
                                <InputGroup>
                                    <InputGroupText>Od</InputGroupText>
                                    <input type='datetime-local' value={eventStart} onChange={(e) => setEventStart(e.target.value)}/>
                                    <InputGroupText>Do</InputGroupText>
                                    <input type='datetime-local' value={eventEnd} onChange={(e) => setEventEnd(e.target.value)}/>
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <label>Odkaz na stránky eventu:</label>
                                <input className='form-control' type='url' name='eventWebsite' value={eventWebsite} onChange={(e) => setEventWebsite(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <label>Místo konání akce:</label>
                                <select className='form-select' name='place' value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
                                    <option value="" hidden></option>
                                    {
                                        places.map((p) => <option key={p.placeId} value={p.placeId}>{p.placeName}</option>)
                                    }
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label>Další kapely účastnící se akce:</label>
                                <select className='form-select' name='band' multiple value={selectedBands.map((b) => b.bandId)} onChange={(e) => setSelectedBands(Array.from(e.target.selectedOptions).map((opt) => ({bandId: opt.value})))}>
                                    {
                                        bands.map((b) => <option key={b.bandId} value={b.bandId}>{b.bandName}</option>)
                                    }
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={(e) => processEventEdit(e)}>Uložit</button>
                        <button className='btn btn-secondary' onClick={() => closeModal()}>Zrušit</button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modifyState === MODIFY_TICKETS} onHide={() => setModifyState(MODIFY_NONE)}>
                    <Modal.Header>Nastavení vstupenek</Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='mb-3'>
                                <label title='V checkboxu zaškrtněte, zda se dají pořídit vstupenky i na místě'>Popis, Cena, Informace:</label>
                                <InputGroup>
                                    <input className='form-control' type='text' name='ticketPrice' value={ticketPrice} onChange={(e) => setTicketPrice(e.target.value)}/>
                                    <InputGroupText>
                                        <FormCheck name='atPlace' checked={atPlace} onChange={(e) => setAtPlace(e.target.checked)}></FormCheck>
                                    </InputGroupText>
                                </InputGroup>
                            </div>
                            <div className='mb-3'>
                                <label>Webové stránky na nákup vstupenek:</label>
                                <input className='form-control' type='url' name='ticketWebsite' value={ticketWebsite} onChange={(e) => setTicketWebsite(e.target.value)}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-primary' onClick={(e) => processTicketUpdate(e)}>Uložit</button>
                        {
                            (selectedEvent.ticket && <button className='btn btn-danger' onClick={() => processTicketDeletion()}>Smazat</button>)
                        }
                        <button className='btn btn-secondary' onClick={() => closeModal()}>Zrušit</button>
                    </Modal.Footer>
                </Modal>
                <Modal show={modifyState === MODIFY_DELETE} onHide={() => setModifyState(MODIFY_NONE)}>
                    <Modal.Header>
                        Smazat událost
                    </Modal.Header>
                    <Modal.Body>
                        <p>Opravdu chcete odstranit událost {selectedEvent.eventName}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='btn btn-danger' onClick={() => processDelete(selectedEvent.eventId)}>Odstranit</button>
                        <button className='btn btn-secondary' onClick={() => closeModal()}>Zrušit</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ListEvents;