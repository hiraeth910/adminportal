import { FC, Fragment, useEffect, useState } from "react";
import { Card, Button, Spinner, Modal, Toast, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NewProduct } from "../models/product";
import { fetchProducts, updateProduct } from "../utils/getapi";
import { BsDownload } from "react-icons/bs"; // Import the download icon

const selectAuthToken = (state: any) => state.authToken;

interface ProductsProps {}

const Products: FC<ProductsProps> = () => {
  const authToken = useSelector(selectAuthToken);
  const [products, setProducts] = useState<NewProduct[]>([]);
  const [lastSeenId, setLastSeenId] = useState<number | undefined>();
  const [topId, setTopId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<NewProduct | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState<"success" | "danger">("success");
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [inputThree,setInputThree] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchProducts({
          authToken,
          last_seen_id: lastSeenId,
          top_id: topId,
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setToastMessage("Failed to fetch products");
        setToastVariant("danger");
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (authToken) fetchProductData();
  }, [authToken, lastSeenId, topId]);

  const handleCreate = (product: NewProduct) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const confirmAvoid = () => {
    setShowConfirmAlert(true);
  };

  const handleAvoid = async () => {
    setShowConfirmAlert(false);
    setIsActionLoading(true);
    try {
      const response = await updateProduct(authToken, {
        id: currentProduct?.id,
        prod_id: currentProduct?.prod_id,
        acc: false,
      });
      if (response === "success") {
        setToastMessage("Product rejection successful!");
        setToastVariant("success");
        setProducts(products.filter(p=>p.id!=currentProduct?.id))
      } else {
        throw new Error("Failed");
      }
    } catch (error) {
      setToastMessage("Failed to reject product");
      setToastVariant("danger");
    } finally {
      setShowToast(true);
      setIsActionLoading(false);
      setShowModal(false);
    }
  };
  useEffect(()=>{
    if(products.length===0){
      fetchProducts(authToken)
    }
  },[products])
  const handleCreateProduct = async () => {
    if (inputOne.length === 14 && inputTwo) {
      setIsActionLoading(true);
      try {
        const response = await updateProduct(authToken, {
          id: currentProduct?.id,
          prod_id: currentProduct?.prod_id,
          acc: true,
          product: inputOne,
          bot: inputTwo,
          joiningLink : inputThree
        });
        if (response === "success") {
          setToastMessage("Product creation successful!");
          setToastVariant("success");
                  setProducts(products.filter(p=>p.id!=currentProduct?.id))
          
        } else {
          throw new Error("Failed");
        }
      } catch (error) {
        setToastMessage("Failed to create product");
        setToastVariant("danger");
      } finally {
        setShowToast(true);
        setIsActionLoading(false);
        setShowModal(false);
      }
    } else {
      setToastMessage("Both fields are required for creation");
      setToastVariant("danger");
      setShowToast(true);
    }
  };

  const getFileFormat = (base64String: string): string | null => {
    const match = base64String.match(/^data:image\/(png|jpeg|jpg|gif);base64,/);
    return match ? match[1] : null;
  };

  return (
    <Fragment>
      <Card className="custom-card">
        <Card.Header className="card-header d-flex justify-content-between align-items-center">
          <h5>Products</h5>
        </Card.Header>
        <Card.Body>
          <div className="table-responsive">
            {isLoading ? (
              <div className="d-flex justify-content-center align-items-center m-2">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Loading products...</span>
              </div>
            ) : (
              <table className="table text-nowrap table-hover border table-bordered">
                <thead className="border-top">
                  <tr>
                    <th>Channel Name</th>
                    <th>Display Text</th>
                    <th>Created On</th>
                    <th>Price (PPU)</th>
                    <th>Media</th>
                    <th>Type</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-bottom">
                      <td>{product.channel_name}</td>
                      <td>{product.displaytext}</td>
                      <td>{product.createdon}</td>
                      <td>{product.ppu}</td>
                      <td>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt="Product Media"
                            style={{ maxHeight: "50px", maxWidth: "50px" }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{product.channel ? "Channel" : "Group"}</td>
                      <td className="text-center">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleCreate(product)}
                        >
                          Create
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {currentProduct && (
            <>
              <img
                src={currentProduct.image || ""}
                alt={currentProduct.channel_name}
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "150px", cursor: "pointer" }}
              />
              {currentProduct.image && getFileFormat(currentProduct.image) && (
                <a
                  href={currentProduct.image || ""}
                  download={`${currentProduct.channel_name}.${getFileFormat(currentProduct.image)}`}
                  className="mb-3"
                >
                  <BsDownload className="me-1" /> Download Image
                </a>
              )}
              <h5>{currentProduct.channel_name}</h5>
              <Form.Group className="mt-3">
                <Form.Control
                  type="text"
                  placeholder="14-digit alphanumeric code"
                  value={inputOne}
                  maxLength={14}
                  onChange={(e) => setInputOne(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Bot code"
                  value={inputTwo}
                  onChange={(e) => setInputTwo(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Joining link"
                  value={inputThree}
                  onChange={(e) => setInputThree(e.target.value)}
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={confirmAvoid}
            disabled={isActionLoading}
          >
            {isActionLoading ? <Spinner animation="border" size="sm" /> : "Avoid"}
          </Button>
          <Button
            variant="success"
            onClick={handleCreateProduct}
            disabled={isActionLoading}
          >
            {isActionLoading ? <Spinner animation="border" size="sm" /> : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Alert show={showConfirmAlert} variant="warning">
        <Alert.Heading>Are you sure you want to reject this product?</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowConfirmAlert(false)} variant="outline-secondary">
            Close
          </Button>
          <Button onClick={handleAvoid} variant="danger" className="ms-2">
            OK
          </Button>
        </div>
      </Alert>

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

export default Products;
