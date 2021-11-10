import React, { useState, useEffect } from "react";
import {Card, Table, Button, Container, Row, Col, Form} from "react-bootstrap"
import userService from "../../services/user.service";



const TransactionHistory = () =>{

    const [loading, setLoader] = useState(true);
    const [history, setHistory] = useState();
  

    useEffect(() =>{
        userService.getTransactionHistory(1000).then(
          (response1) => {
            console.log("weird response" + response1.data);
            setHistory(response1.data)
            setLoader(false)
    
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
              console.log("error history" + error);
    
         }
        )
      }, [])

  
      if(loading){
          return <div>Still loading</div>
      }

      const DisplayData = history.data.map(data => {
          return(
          <tr>
            <td>{data.transactionReferenceNo}</td>
            <td>{data.transactionAmount}</td>
            <td>{data.transactionType}</td>
        </tr>
          )
      })
      return(
        <Container>
            <Row>
                <Col sm={8}>
                    <Card style={{ margin: '10px' }}>
                        <Card.Body>
                            <Card.Title>Transactions</Card.Title>         
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                        <th>Transaction Ref No.</th>
                                        <th>Transaction Amount</th>
                                        <th>Transaction Type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {DisplayData}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
            </Row>
        </Container>
         
    )

}
export default TransactionHistory;