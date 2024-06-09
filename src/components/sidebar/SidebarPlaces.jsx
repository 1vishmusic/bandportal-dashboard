import {useContext, useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {GlobalContext} from "../../context/GlobalContext.js";
import {deletePlace, updatePlace} from "../../service/PlaceService.js";
import {CreateAlertDanger, CreateAlertSuccess} from "../../functions/Alerts.js";

export const SidebarPlaces = () => {
    const {places, placesUpdateFlag, setPlacesUpdateFlag} = useContext(GlobalContext);

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [placeName, setPlaceName] = useState('');
    const [placeWebsite, setPlaceWebsite] = useState('');

    const handlePlaceEdit = (place) => {
        setSelectedPlace(place);
        setPlaceName(place.placeName);
        setPlaceWebsite(place.placeWebsite);
    }

    const closeModal = () => {
        setSelectedPlace(null);
        setPlaceName('');
        setPlaceWebsite('');
    }

    const processPlaceEdit = () => {
        if((selectedPlace.placeName === placeName) && (selectedPlace.placeWebsite === placeWebsite)) {
            return;
        }

        updatePlace({
            placeId: selectedPlace.placeId,
            placeName: placeName,
            placeWebsite: placeWebsite
        }).then(() => {
            setPlacesUpdateFlag(!placesUpdateFlag)
            CreateAlertSuccess("Změny byly úspěšně provedeny.");
        }).catch((e) => {
            CreateAlertDanger("Nastala chyba při ukládání místa: " + e.response.data.message)
        });

        selectedPlace.placeName = placeName;
        selectedPlace.placeWebsite = placeWebsite;

        closeModal();
    }

    const processPlaceDelete = () => {
        deletePlace(selectedPlace.placeId).then(() => {
            setPlacesUpdateFlag(!placesUpdateFlag);
            CreateAlertSuccess("Místo bylo úspěšně smazáno.");
        }).catch(() => {
            CreateAlertDanger("Místo nelze smazat. Pravděpodobně existuje nějaký event, který je na místě závislý.");
        });

        closeModal();
    }

    return (
        <>
            <section>
                <h4>Kluby a místa</h4>
                <p>Přehled míst a podniků, kde se pořádají akce.</p>
                <div>
                    {
                        places.map(place => <button className='btn btn-primary m-1' key={place.placeId} onClick={() => handlePlaceEdit(place)}>{place.placeName}</button>)
                    }
                </div>
                <Modal show={!!selectedPlace} onHide={closeModal}>
                    <Modal.Header>
                        <Modal.Title>Upravit místo</Modal.Title>
                    </Modal.Header>
                    {
                        selectedPlace &&
                        <Modal.Body>
                            <form>
                                <div className='mb-3'>
                                    <label>Název místa:</label>
                                    <input className='form-control' type='text' id='placeName' value={placeName} onChange={(e) => setPlaceName(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Webové stránky:</label>
                                    <input className='form-control' type='url' id='placeWebsite' value={placeWebsite} onChange={(e) => setPlaceWebsite(e.target.value)}/>
                                </div>
                            </form>
                        </Modal.Body>
                    }
                    <Modal.Footer>
                        <Button variant="primary" onClick={processPlaceEdit}>Uložit</Button>
                        <Button variant="danger" onClick={processPlaceDelete}>Smazat</Button>
                        <Button variant="secondary" onClick={closeModal}>Zavřít</Button>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    )
}
