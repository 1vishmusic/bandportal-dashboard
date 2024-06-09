import {useContext, useState} from "react";
import {deleteBand, updateBand} from "../../service/BandService.js";
import {Button, Modal} from "react-bootstrap";
import {GlobalContext} from "../../context/GlobalContext.js";
import {CreateAlertDanger, CreateAlertSuccess} from "../../functions/Alerts.js";

export const SidebarBands = () => {
    const {bands, bandsUpdateFlag, setBandsUpdateFlag} = useContext(GlobalContext);

    const [selectedBand, setSelectedBand] = useState(null);
    const [bandName, setBandName] = useState('');
    const [bandWebsite, setBandWebsite] = useState('');

    const handleBandEdit = (band) => {
        setSelectedBand(band);
        setBandName(band.bandName);
        setBandWebsite(band.bandWebsite);
    }

    const closeModal = () => {
        setSelectedBand(null);
        setBandName('');
        setBandWebsite('');
    }

    const processBandEdit = () => {
        if((selectedBand.bandName === bandName) && (selectedBand.bandWebsite === bandWebsite)) {
            return;
        }

        updateBand({
            bandId: selectedBand.bandId,
            bandName: bandName,
            bandWebsite: bandWebsite
        }).then(() => {
            setBandsUpdateFlag(!bandsUpdateFlag);
            CreateAlertSuccess("Změny byly úspěšně provedeny.");
        }).catch((e) => {
            CreateAlertDanger("Nastala chyba při ukládání: " + e.response.data.message);
        });

        selectedBand.bandName = bandName;
        selectedBand.bandWebsite = bandWebsite;

        closeModal();
    }

    const processBandDelete = () => {
        deleteBand(selectedBand.bandId).then(() => {
            setBandsUpdateFlag(!bandsUpdateFlag);
            CreateAlertSuccess("Kapela byla smazána.");
        }).catch(() => {
            CreateAlertDanger("Interpreta nelze smazat. Pravděpodobně je propojený s nějakým eventem, který je na interpretovi závislý.");
        });

        closeModal();
    }

    return (
        <>
            <section>
                <h4>Registrované kapely</h4>
                <p>Přehled spřízněných kapel, které se spoluúčastní na akcích.</p>
                <div>
                    {
                        bands.map(band => <button className='btn btn-primary m-1' key={band.bandId} onClick={() => handleBandEdit(band)}>{band.bandName}</button>)
                    }
                </div>
                <Modal show={!!selectedBand} onHide={closeModal}>
                    <Modal.Header>
                        <Modal.Title>Upravit interpreta</Modal.Title>
                    </Modal.Header>
                    {
                        selectedBand &&
                        <Modal.Body>
                            <form>
                                <div className='mb-3'>
                                    <label>Název interpreta:</label>
                                    <input className='form-control' type='text' id='bandName' value={bandName} onChange={(e) => setBandName(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <label>Webové stránky interpreta:</label>
                                    <input className='form-control' type='url' id='bandWebsite' value={bandWebsite} onChange={(e) => setBandWebsite(e.target.value)}/>
                                </div>
                            </form>
                        </Modal.Body>
                    }
                    <Modal.Footer>
                        <Button variant="primary" onClick={processBandEdit}>Uložit</Button>
                        <Button variant="danger" onClick={processBandDelete}>Smazat</Button>
                        <Button variant="secondary" onClick={closeModal}>Zavřít</Button>
                    </Modal.Footer>
                </Modal>
            </section>
        </>
    )
}
