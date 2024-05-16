import { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import axios from "axios";

import { apiUrl, methods, routes } from "./constants";

function App() {
  const [provinsi, setProvinsi] = useState();
  const [kontrasepsi, setKontrasepsi] = useState();

  const [provinsis, setProvinsis] = useState([]);
  const [kontrasepsis, setKontrasepsis] = useState([]);
  const [report, setReport] = useState([]);
  const [showReport, setShowReport] = useState(false);

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

    const handleReport = () => {
      reportPemakai();
      setShowReport(true);
    }

    const reportPemakai = () => {
      axios.get(apiUrl(routes.PEMAKAI, methods.REPORT))
        .then((response) => {
          // handle success
          console.log(response.data.data[0])
          setReport(response.data.data[0])
          
        })
        .catch((error) => {
          // handle error
          console.log(error);
        })
    }

    const sum = report?.reduce((accumulator, currentValue) => {
      return {
        Pil: accumulator.Pil + parseInt(currentValue.Pil),
        Kondom: accumulator.Kondom + parseInt(currentValue.Kondom),
        IUD: accumulator.IUD + parseInt(currentValue.IUD),
        Total: accumulator.Total + parseInt(currentValue.Total),
      };
    }, {Pil: 0, Kondom: 0, IUD: 0, Total: 0});

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
          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" onClick={() => addPemakai()}>Submit</Button>
            <Button variant="success" size="lg" onClick={() => handleReport()}>Report</Button>
            {
              showReport && 
              <Button variant="danger" size="lg" onClick={() => setShowReport(false)}>Close Report</Button>
            }
          </div>
        </Col>
      </Row>
      
      {
        showReport && 
        <Table striped bordered hover>
        <thead>
          <tr>
            <th rowSpan="2" className="text-center">No</th>
            <th rowSpan="2" className="text-center">Provinsi</th>
            <th colSpan="3" className="text-center">Pemakai alat kontrasepsi</th>
            <th rowSpan="2" className="text-center">Jumlah</th>
          </tr>
          <tr>
            <th className="text-center">Pil</th>
            <th className="text-center">Kondom</th>
            <th className="text-center">IUD</th>
          </tr>
        </thead>
        <tbody>
        {
          report.map((item) =>
          <tr key={item.Nama_Propinsi}>
            <td>1</td>
            <td>{item.Nama_Propinsi}</td>
            <td>{item.Pil}</td>
            <td>{item.Kondom}</td>
            <td>{item.IUD}</td>
            <td>{item.Total}</td>
          </tr>
          )
        }
          <tr>
            <td colSpan={2} className="text-center">Jumlah</td>
            <td>{sum.Pil}</td>
            <td>{sum.Kondom}</td>
            <td>{sum.IUD}</td>
            <td>{sum.Total}</td>
          </tr>
        </tbody>
        </Table>
      }


    </Container>
  );
}

export default App;
