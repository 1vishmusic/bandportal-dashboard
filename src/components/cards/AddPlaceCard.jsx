import {Button, Card, CardTitle, Col, Modal} from "react-bootstrap";
import {useContext, useState} from "react";
import {addPlace} from "../../service/PlaceService.js";
import {GlobalContext} from "../../context/GlobalContext.js";
import {CreateAlertDanger, CreateAlertSuccess} from "../../functions/Alerts.js";

export const AddPlaceCard = () => {
    const {placesUpdateFlag, setPlacesUpdateFlag} = useContext(GlobalContext);

    // Modal State
    const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);

    const handleAddPlaceCardClick = () => {
        setShowAddPlaceModal(true);
    }

    const handleAddPlaceCloseModal = () => {
        setShowAddPlaceModal(false);
    }

    // Fields states
    const [placeName, setPlaceName] = useState('');
    const [placeWebsite, setPlaceWebsite] = useState('');

    const handleAddPlaceCardSubmit = (e) => {
        e.preventDefault();

        const place = {placeName, placeWebsite};

        addPlace(place).then(() => {
            setPlacesUpdateFlag(!placesUpdateFlag);
            CreateAlertSuccess("Místo bylo úspěšně vytvořeno.");
        }).catch((e) => {
            CreateAlertDanger("Nelze vytvořit místo: " + e.response.data.message);
            console.log(e);
        });

        setShowAddPlaceModal(false);

        setPlaceName('');
        setPlaceWebsite('');
    }

    return (
        <>
            <Col>
                <Card href='#' role='button' className='p-4 text-center' onClick={handleAddPlaceCardClick}>
                    <CardTitle>Přidat místo</CardTitle>
                </Card>

                <Modal show={showAddPlaceModal} onHide={handleAddPlaceCloseModal}>
                    <Modal.Header>
                        <Modal.Title>Nové místo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='mb-3'>
                                <label>Název místa:</label>
                                <input className='form-control' type='text' name='placeName' value={placeName} onChange={(e) => setPlaceName(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <label>Webové stránky:</label>
                                <input className='form-control' type='url' name='placeWebsite' value={placeWebsite} onChange={(e) => setPlaceWebsite(e.target.value)}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAddPlaceCardSubmit}>Přidat místo</Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </>
    )
}
