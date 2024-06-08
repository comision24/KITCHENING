import React, { useEffect, useState } from "react";
import imagenFondo from "../../assets/images/mandalorian.jpg";
import { ContentData } from "./ContentData.jsx";
import Spinner from "../reutilice/Spinner.jsx";
import Alert from "../reutilice/Alert.jsx";
import ChefItem from "./ChefItem.jsx";
import Modal from "../reutilice/Modal.jsx";

const metrics = [
  {
    show: true,
    title: "Movies in Data Base",
    color: "primary",
    digit: 21,
    icon: "film",
  },
  {
    show: true,
    title: "Total awards",
    color: "success",
    digit: 79,
    icon: "award",
  },
  {
    show: true,
    title: "Actors quantity",
    color: "warning",
    digit: 49,
    icon: "user",
  },
];

function ContentRowTop({ data }) {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState({
    metrics: true,
    chefs: true,
    lastProduct: true
  });
  const [errors, setErrors] = useState({
    metrics: "",
    chefs: "",
    lastProduct: ""
  });
  const [chefs, setChefs] = useState([]);
  const [lastProduct, setLastProduct] = useState({});
  const [showModal, setShowModal] = useState(false)



  useEffect(() => {
    const getMetrics = async () => {
      try {
        const endpoint = "http://localhost:3030/api/metrics";
        const { ok, data } = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        ok && setMetrics(data);

        setTimeout(() => {
          setLoading({
            ...loading,
            metrics: false,
          });
        }, 2000);
      } catch (error) {
        setErrors({
          ...errors,
          metrics: error.message,
        });
      }
    };

    const getChefs = async () => {
      try {
        const endpoint =
          "http://localhost:3030/api/query?q=SELECT name FROM chefs";
        const { ok, data } = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        ok && setChefs(data);

        setTimeout(() => {
          setLoading({
            ...loading,
            chefs: false,
          });
        }, 2000);
      } catch (error) {
        setErrors({
          ...errors,
          chefs: error.message,
        });
      }
    };

    const getLastProduct = async () => {
      try {
        const endpoint =
          "http://localhost:3030/api/query?q=SELECT * FROM products WHERE createdAt = (SELECT MAX(createdAt) FROM products) LIMIT 1";
        const {
          ok,
          data: [product],
        } = await fetch(endpoint, {
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        ok && setLastProduct(product);

        setTimeout(() => {
          setLoading({
            ...loading,
            lastProduct: false,
          });
        }, 2000);
      } catch (error) {
        setErrors({
          ...errors,
          lastProduct: error.message,
        });
      }
    };

    getMetrics();
    getChefs();
    getLastProduct();
  }, []);


  const handleCloseModal = () => setShowModal(false)

  const handleOpenModal = () =>  setShowModal(true)

  return (
    <React.Fragment>
      {/*<!-- Content Row Top -->*/}
      <div className="container-fluid">
        <div className="d-sm-flex aligns-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
        </div>

        {/*<!-- Content Row Movies-->*/}
        <div className="row">
          {/*<!-- Movies in Data Base -->*/}
          {/*<!-- Total awards -->*/}
          {/*<!-- Actors quantity -->*/}

          {!loading.metrics ? (
            metrics.map((el, i) => {
              return <ContentData key={i} {...el} />;
            })
          ) : (
            <Spinner containerClassName={"m-auto my-4"} />
          )}
        </div>

        {Object.values(errors).some((msg) => msg) &&
          Object.values(errors)
            .filter((msg) => msg)
            .map((msg) => {
              return <Alert message={msg} />;
            })}

        {/*<!-- End movies in Data Base -->*/}

        {/*<!-- Content Row Last Movie in Data Base -->*/}
        <div className="row">
          {/*<!-- Last Movie in DB -->*/}
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">
                  Ultimo producto : <strong>{lastProduct.title}</strong>
                </h5>
              </div>
              <div className="card-body">
                <div className="text-center">
                  <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    style={{ width: 40 + "rem" }}
                    src={`http://localhost:3030/api/products/${lastProduct.imagePrincipal}`}
                    alt=" Star Wars - Mandalorian "
                  />
                </div>
                <p>
                  {lastProduct.description}
                </p>
                <button
                  className="btn btn-danger"
                  rel="nofollow"
                  onClick={handleOpenModal}
                >
                  Ver mas
                </button>
              </div>
            </div>
          </div>
          {/*<!-- End content row last movie in Data Base -->*/}

          {/*<!-- Genres in DB -->*/}
          <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h5 className="m-0 font-weight-bold text-gray-800">
                  Genres in Data Base
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {chefs.map(({ name }) => (
                    <ChefItem key={name} name={name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal active={showModal} onClose={handleCloseModal}/>

      {/*<!--End Content Row Top-->*/}
    </React.Fragment>
  );
}
export default ContentRowTop;
