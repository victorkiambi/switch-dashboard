import React, { useState, useEffect } from "react";
import {Card, Table, Button, Container, Row, Col, Form, Modal} from "react-bootstrap"
import userService from "../../services/user.service";

const Accounts = (props) =>{
    
    const [amount, setAmount] = useState();
    const [validated, setValidated] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [select, setSelect] = useState();
    const [response, setResponse] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
  

    const handleWithdrawSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            setValidated(true);

            userService.withdrawAmount(select, amount)
            .then(response => {
                console.log("another banger" + response);
                setShow(false)
                window.location.reload(true);
            }).catch(error => {
                console.log("another error" + error);
            })
        }
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            setValidated(true);
            console.log("deposit before" + amount );
            userService.depositAmount(select,amount)
            .then(response => {
                setResponse(response);
                console.log("new balance " + response);
                window.location.reload(true);
             }).catch(error => {
                console.log("error to this" + error);
            })
        }
    };
    
    const handleAmount = (e) => {
        const deposit = e.target.value;
        setAmount(deposit);
        setDisabled(false);
      };

    
    const handleSelect = (e) => {
        e.preventDefault();
        console.log("select stuff" + e.target.value);
        setSelect(e.target.value);
       
      }

    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    }

    const selectValues = props.data.map(mapData => {
        return(
          <React.Fragment>
            
              <option value={mapData.accNo}>{mapData.accNo}</option>
          </React.Fragment>
          )
    })

    const accountsData = props.data.map(mapData => {
         return(
            <tr>
                <td>{mapData.accNo}</td>
                <td>{mapData.accName}</td>
                <td>{mapData.minBalance}</td>
                <td><Button 
                value={mapData.accNo}
                onClick={handleShow}
                >
                    Withdraw
                    </Button></td>
            </tr> 
            )
      })
      
      return (
        <Container>
            <Row>
                <Col sm={8}>
                    <Card style={{ margin: '0px' }}>
                        <Card.Body>
                            <Card.Title>Accounts</Card.Title>                                   
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Acc No.</th>
                                            <th>Acc Name</th>
                                            <th>Minimum Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {accountsData}
                                    </tbody>
                                </Table>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ margin: '0px' }}>
                        <Card.Header>Deposit </Card.Header>
                            <Card.Body>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formSelect">
                                    <Form.Select onChange={handleSelect} selected aria-label="Default select example">
                                    <option>Open this select menu</option>
                                        {selectValues}
                                    </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="number" 
                                        placeholder="Enter amount" 
                                        onChange={handleAmount}
                                        required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Amount.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button disabled={disabled} type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleWithdrawSubmit}>
                                    <Form.Group className="mb-3" controlId="formSelect">
                                    <Form.Select onChange={handleSelect} selected aria-label="Default select example">
                                    <option>Open this select menu</option>
                                        {selectValues}
                                    </Form.Select>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Amount</Form.Label>
                                        <Form.Control type="number" 
                                        placeholder="Enter amount" 
                                        onChange={handleAmount}
                                        required />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Amount.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button disabled={disabled} type="submit">Submit</Button>
                                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary">Understood</Button>
            </Modal.Footer>
          </Modal>              
        </Container>
            )
}

export default Accounts;