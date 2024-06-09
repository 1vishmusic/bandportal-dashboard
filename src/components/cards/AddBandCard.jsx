import {Button, Card, CardTitle, Col, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {useContext, useState} from "react";
import {addBand} from "../../service/BandService.js";
import {GlobalContext} from "../../context/GlobalContext.js";
import {CreateAlertDanger, CreateAlertSuccess} from "../../functions/Alerts.js";

export const AddBandCard = () => {
    const {bandsUpdateFlag, setBandsUpdateFlag} = useContext(GlobalContext);

    // Modal State
    const [showAddBandModal, setShowAddBandModal] = useState(false);

    const handleAddBandCardClick = () => {
        setShowAddBandModal(true);
    }

    const handleAddBandCloseModal = () => {
        setShowAddBandModal(false);
    }

    // Fields states
    const [bandName, setBandName] = useState('')
    const [bandWebsite, setBandWebsite] = useState('')

    const handleAddBandCardSubmit = (e) => {
        e.preventDefault();

        const band = {bandName, bandWebsite};
        console.log(band);

        addBand(band).then(() => {
            setBandsUpdateFlag(!bandsUpdateFlag);
            CreateAlertSuccess("Interpret byl úspěšně přidán.");
        }).catch((e) => {
            console.log(e);
            CreateAlertDanger("Interpreta nelze přidat: " + e.response.data.message);
        });

        setShowAddBandModal(false);

        setBandName('');
        setBandWebsite('');
    }

    return (
        <>
            <Col>
                <Card href='#' role='button' className='p-4 text-center' onClick={handleAddBandCardClick}>
                    <CardTitle>Přidat interpreta</CardTitle>
                </Card>

                <Modal show={showAddBandModal} onHide={handleAddBandCloseModal}>
                    <Modal.Header>
                        <Modal.Title>Přidat interpreta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className='mb-3'>
                                <label>Název interpreta:</label>
                                <input className='form-control' type='text' name='bandName' value={bandName} onChange={(e) => setBandName(e.target.value)}/>
                            </div>
                            <div className='mb-3'>
                                <label>Webové stránky interpreta:</label>
                                <input className='form-control' type='url' name='bandWebsite' value={bandWebsite} onChange={(e) => setBandWebsite(e.target.value)}/>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleAddBandCardSubmit}>Přidat interpreta</Button>
                    </Modal.Footer>
                </Modal>
            </Col>
        </>
    )
}
