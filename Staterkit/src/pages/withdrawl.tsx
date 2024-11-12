import { FC, Fragment, useEffect, useState } from "react";
import {
  Card,
  Button,
  Spinner,
  Modal,
  Toast,
  Form
} from "react-bootstrap";
import { fetchPendingWithdrawals, getBalance, updateBalance } from "../utils/getapi";
import { useSelector } from "react-redux";
import { WithdrawalRecord } from "../models/withdrawl";
const selectAuthToken = (state: any) => state.authToken;

interface WithdrawalsProps {}

const Withdrawals: FC<WithdrawalsProps> = () => {
  const authToken = useSelector(selectAuthToken);
  const [withdrawals, setWithdrawals] = useState<WithdrawalRecord[]>([]);
  const [lastSeenId, setLastSeenId] = useState<number | undefined>();
  const [topId, setTopId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentWithdrawal, setCurrentWithdrawal] = useState<WithdrawalRecord | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [prevBalance, setPrevBalance] = useState<number | null>(null); // Capture previous balance for the update modal
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "danger">("success");
  const [transactionId, setTransactionId] = useState("");
  const [message, setMessage] = useState("");
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [showUpdateBalanceModal, setShowUpdateBalanceModal] = useState(false);
  const [oBalance,setObalance] = useState()
  const fetchWithdrawals = async (lastSeenId?: number, topId?: number) => {
    setIsLoading(true);
    try {
      const response = await fetchPendingWithdrawals(authToken, lastSeenId, topId, 5);
      setWithdrawals(response.data || []);
      setLastSeenId(response.last_seen_id);
      setTopId(response.top_id);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(prevBalance)
  const fetchoBalance= async(provid:number)=>{
    const bal =  await getBalance(provid,authToken)
    setObalance(bal)
  }
  useEffect(()=>{
    if(currentWithdrawal){
    fetchoBalance(currentWithdrawal.provider)}
  },[currentWithdrawal])
  const fetchBalance = async (providerId: number) => {
    try {
      const response = await getBalance(providerId, authToken);
      setBalance(response);
      setPrevBalance(response); // Capture balance as previous balance
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  const handleModify = (withdrawal: WithdrawalRecord) => {
    setCurrentWithdrawal(withdrawal);
    fetchBalance(withdrawal.provider);
    setShowModal(true);
  };

  const handleApprove = async () => {
    if (!transactionId) {
      setToastMessage("Transaction ID is required for approval.");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

    setIsApproveLoading(true);
    const payload = {
      amount: currentWithdrawal?.amount,
      status: "success",
      acno:currentWithdrawal?.acno,
      id: currentWithdrawal?.withdrawl_id,
      provider_id: currentWithdrawal?.provider,
      transactionid: transactionId,
      message: message || null,
    };

    const result = await updateBalance(authToken, payload);

    setIsApproveLoading(false);
    if (result?.success) {
      setShowUpdateBalanceModal(true);
      setToastMessage(result?.message);
      setToastVariant("success");
      setShowToast(true);
      fetchBalance(currentWithdrawal?.provider||10);
      setWithdrawals(withdrawals.filter(w => w.withdrawl_id !== currentWithdrawal?.withdrawl_id));
    } else {
      setToastMessage(result?.message);
      setToastVariant("danger");
      setShowToast(true);
    }
  };
    const handleNext = () => {
    if (lastSeenId) fetchWithdrawals(lastSeenId, undefined);
  };

  const handlePrevious = () => {
    if (topId) fetchWithdrawals(undefined, topId);
  };
  const handleReject = async () => {
    if (!message) {
      setToastMessage("Message is required for rejection.");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

    setIsRejectLoading(true);
    const payload = {
      amount: currentWithdrawal?.amount,
      status: "rejected",
      id: currentWithdrawal?.withdrawl_id,
      provider_id: currentWithdrawal?.provider,
      transactionid: transactionId || null,
      message,
    };

    const result = await updateBalance(authToken, payload);

    setIsRejectLoading(false);
    if (result?.success) {
      setShowUpdateBalanceModal(true);
      setToastMessage(result?.message);
      setToastVariant("success");
      setShowToast(true);
      fetchBalance(currentWithdrawal?.provider||10);
      setWithdrawals(withdrawals.filter(w => w.withdrawl_id !== currentWithdrawal?.withdrawl_id));
    } else {
      setToastMessage(result?.message);
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Header className="card-header d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center w-100">
            <h5>Pending Withdrawals</h5>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center m-2">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading withdrawals...</span>
              </div>
            ) : (
              <>
                <table className="table text-nowrap table-hover border table-bordered">
                  <thead className="border-top">
                    <tr>
                      <th className="border-bottom-0 text-center">Amount</th>
                      <th className="border-bottom-0">Date</th>
                      <th className="border-bottom-0">Bank</th>
                      <th className="border-bottom-0">Account No.</th>
                      <th className="border-bottom-0">IFSC</th>
                      <th className="border-bottom-0 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.map((withdrawal) => (
                      <tr key={withdrawal.withdrawl_id} className="border-bottom">
                        <td className="text-center">{withdrawal.amount}</td>
                        <td>{withdrawal.withdrawl_created_at}</td>
                        <td>{withdrawal.bank_name}</td>
                        <td>{withdrawal.acno}</td>
                        <td>{withdrawal.ifsc}</td>
                        <td className="text-center">
                          <Button variant="primary-light" size="sm" onClick={() => handleModify(withdrawal)}>
                            Modify
                          </Button>
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

      {/* Modify Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modify Withdrawal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentWithdrawal && (
            <>
               <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Balance: {oBalance}</h5>
                <Button variant="secondary" onClick={() => fetchoBalance(currentWithdrawal.provider)}>Refresh</Button>
              </div>
              <h5>Bank: {currentWithdrawal.bank}</h5>
              <h5>Bank Name: {currentWithdrawal.bank_name}</h5>
              <h5>Account No.: {currentWithdrawal.acno}</h5>
              <h5>IFSC: {currentWithdrawal.ifsc}</h5>
              <h5>Withdrawal Amount: {currentWithdrawal.amount}</h5>


              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Transaction ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleApprove} disabled={isApproveLoading}>
            {isApproveLoading ? <Spinner as="span" animation="border" size="sm" /> : "Approve"}
          </Button>
          <Button variant="danger" onClick={handleReject} disabled={isRejectLoading}>
            {isRejectLoading ? <Spinner as="span" animation="border" size="sm" /> : "Reject"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Balance Modal */}
      <Modal show={showUpdateBalanceModal} onHide={() => setShowUpdateBalanceModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Balance Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Previous Balance: {oBalance}</p>
          <p>Updated Balance: {balance}</p>
        </Modal.Body>
      </Modal>

      {/* Toast Notification */}
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

export default Withdrawals;
