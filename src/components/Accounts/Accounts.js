import React, { useState, useEffect } from "react";
import {Card, Table, Button, Container, Row, Col, Form} from "react-bootstrap"
import userService from "../../services/user.service";

const Accounts = (props) =>{
    
    const [amount, setAmount] = useState();
    const [validated, setValidated] = useState(false);

    const [response, setResponse] = useState();
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);

        const minBalance = userService.depositAmount(amount)
        .then(response => {
            setResponse(response);
            console.log("wazi response ni " + response);
        }).catch(error=> {
            console.log("here is the error" + error);
        })
        
        console.log("hii ni " + minBalance);
    };

    const onChangeAmount = (e) => {
        const deposit = e.target.value;
        setAmount(deposit);
      };

      const handleWithdraw = (e) => {
          e.preventDefault()
          alert(e.target.value)
      }

      const accountsData = props.data.map(mapData => {
          return(
            <tr>
            <td>{mapData.accNo}</td>
            <td>{mapData.accName}</td>
            <td>{mapData.minBalance}</td>
            <td><Button 
            value={mapData.accNo}
            onClick={handleWithdraw}
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
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Amount</Form.Label>
                                            <Form.Control type="number" 
                                            placeholder="Enter amount" 
                                            onChange={onChangeAmount}
                                            required />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a valid Amount.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Button type="submit">Submit</Button>
                                    </Form>
                                </Card.Body>
                        </Card>
                    </Col>
                </Row>
                    
            </Container>
            )
}

export default Accounts;