import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from "axios";

import { apiUrl, methods, routes } from "./constants";

function App() {
  const [provinsi, setProvinsi] = useState();
  const [kontrasepsi, setKontrasepsi] = useState();

  const [provinsis, setProvinsis] = useState([]);
  const [kontrasepsis, setKontrasepsis] = useState([]);
  const [jumlah, setJumlah] = useState(0);

    // Load data on initial page load
    useEffect(() => {
      getAllProvinsi();
      getAllKontrasepsi();
    }, []);
  
    // API operations
  
    const getAllProvinsi = () => {
      axios.get(apiUrl(routes.PROVINSI, methods.GET_ALL))
        .then((response) => {
          // handle success
          console.log(response.data)
          setProvinsis(response.data.provinsiList)
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    }

    const getAllKontrasepsi = () => {
      axios.get(apiUrl(routes.KONTRASEPSI, methods.GET_ALL))
        .then((response) => {
          // handle success
          console.log(response.data)
          setKontrasepsis(response.data.kontrasepsiList)
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    }

    const addPemakai = () => {
      const data = {
        Id_Propinsi: provinsi,
        Id_Kontrasepsi: kontrasepsi,
        Jumlah_Pemakai: jumlah
      }

      axios.post(apiUrl(routes.PEMAKAI, methods.POST), data)
        .then((response) => {
          console.log(response.data);
          alert('Success to add data pemakai');
        })
        .catch((error) => {
          console.log(error);
        });
    }

  return (
  <Container>
      <Row>
        <Col className="align-items-center mx-auto my-5 col-6">
          <h3 className="text-center">From Pemakai Alat Kontrasepsi</h3>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Provinsi</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setProvinsi(e.target.value)}>
                  <option value={null}>Pilih Provinsi</option>
                  {
                    provinsis.map((item) =>
                      <option key={item.Id_Propinsi} value={item.Id_Propinsi}>{item.Nama_Propinsi}</option>
                    )
                  }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Kontrasepsi</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setKontrasepsi(e.target.value)}>
                  <option value={null}>Pilih Kontrasepsi</option>
                  {
                    kontrasepsis.map((item) =>
                      <option key={item.Id_Kontrasepsi} value={item.Id_Kontrasepsi}>{item.Nama_Kontrasepsi}</option>
                    )
                  }
                </Form.Select>
            </Form.Group>  
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Jumlah Pemakai</Form.Label>
              <Form.Control type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} />
            </Form.Group>
          </Form>
          <div className="d-grid">
            <Button variant="primary" size="lg" onClick={() => addPemakai()}>Submit</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
