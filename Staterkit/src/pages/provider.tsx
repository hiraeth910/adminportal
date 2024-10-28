import { FC, Fragment, useEffect, useState } from "react";
import {
  Card,
  OverlayTrigger,
  Tooltip,
  Form,
  Button,
  Spinner,
  Modal,
  Toast,
} from "react-bootstrap";
import { changeProviderStatus, fetchProviderDetails } from "../utils/getapi";
import { ProviderDetails } from "../models/provider";
import { useSelector } from "react-redux";
const selectAuthToken = (state: any) => state.authToken;

interface ProvidersProps {}

const Providers: FC<ProvidersProps> = () => {
  const authToken = useSelector(selectAuthToken); // Retrieve authToken from Redux state
  const [isImageLarge, setIsImageLarge] = useState(false);
  const toggleImageSize = () => {
    setIsImageLarge(!isImageLarge);
  };
  const [providers, setProviders] = useState<ProviderDetails[]>([]);
  const [lastSeenId, setLastSeenId] = useState<number | undefined>();
  const [topId, setTopId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<ProviderDetails | null>(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "danger">("success");

  const fetchProviders = async (lastSeenId?: number, topId?: number) => {
    setIsLoading(true);
    try {
      const response = await fetchProviderDetails(authToken, lastSeenId, topId, 5); // Adjust perpage value if needed
      setProviders(response.data);
      setLastSeenId(response.last_seen_id);
      setTopId(response.top_id);
    } catch (error) {
      console.error("Error fetching providers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleNext = () => {
    if (lastSeenId) fetchProviders(lastSeenId, undefined);
  };

  const handlePrevious = () => {
    if (topId) fetchProviders(undefined, topId);
  };

  const handleEdit = (provider: ProviderDetails) => {
    setCurrentProvider(provider);
    setShowModal(true);
  };

  const handleStatusChange = async (status: boolean) => {
    if (!currentProvider) return;
    setIsButtonLoading(true);
    try {
      const requestId = currentProvider.request_id || 1;
      const response = await changeProviderStatus(requestId, status, authToken);
      console.log(response)
      if (response=='success') {
        setToastMessage("Provider status update successful");
        setToastVariant("success");
        setProviders(providers.filter(p=>p.request_id!==currentProvider.request_id))
      } else {
        setToastMessage("Provider status update failed");
        setToastVariant("danger");
      }
      setCurrentProvider(null)
     
      setShowToast(true);
      setShowModal(false);
    } catch (error) {
      setToastMessage("An error occurred while updating provider status");
      setToastVariant("danger");
      setShowToast(true);
    } finally {
      setIsButtonLoading(false);
    }
  };

  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Header className="card-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center w-100">
           
          </div>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center m-2">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading providers...</span>
              </div>
            ) : (
              <>
                <table className="table text-nowrap table-hover border table-bordered">
                  <thead className="border-top">
                    <tr>
                      <th className="border-bottom-0 text-center">PAN</th>
                      <th className="border-bottom-0">Name</th>
                      <th className="border-bottom-0">Status</th>
                      <th className="border-bottom-0 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map((provider) => (
                      <tr key={provider.provider_id} className="border-bottom">
                        <td className="text-center">{provider.pan}</td>
                        <td>{provider.name}</td>
                        <td>{provider.verified ? "verified" : "pending"}</td>
                        <td className="text-center">
                          <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                            <Button
                              variant="primary-light"
                              size="sm"
                              onClick={() => provider.verified === false && handleEdit(provider)}
                            >
                              <span className="ri-pencil-line fs-14"></span>
                            </Button>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={handlePrevious}
                    disabled={!topId}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleNext}
                    disabled={!lastSeenId}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        aria-labelledby="modal-provider-edit"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Provider</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {currentProvider && (
            <>
              <img
                src={`data:image/png;base64,${currentProvider.image}`}
                alt={currentProvider.name}
                className="img-fluid rounded mb-3"
                style={{
                  maxHeight: isImageLarge ? "300px" : "150px",
                  cursor: "pointer",
                  transition: "max-height 0.3s ease-in-out",
                }}
                onClick={toggleImageSize}
              />
              <h5>{currentProvider.pan}</h5>
              <h5>{currentProvider.name}</h5>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="success"
            onClick={() => handleStatusChange(true)}
            disabled={isButtonLoading}
          >
            {isButtonLoading ? <Spinner animation="border" size="sm" /> : "Accept"}
          </Button>
          <Button
            variant="danger"
            onClick={() => handleStatusChange(false)}
            disabled={isButtonLoading}
          >
            {isButtonLoading ? <Spinner animation="border" size="sm" /> : "Reject"}
          </Button>
        </Modal.Footer>
      </Modal>

   <Toast
  onClose={() => setShowToast(false)}
  show={showToast}
  delay={3000}
  autohide
  bg={toastVariant}
  className="position-fixed bottom-0 end-0 mb-3 me-3"
  style={{ zIndex: 9999 }}
>
  <Toast.Body>{toastMessage}</Toast.Body>
</Toast>

    </Fragment>
  );
};

export default Providers;
