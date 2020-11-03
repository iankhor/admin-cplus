import React from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { formatCurrency } from '../../../lib'
import { format as dateFormat } from 'date-fns'

export default function FinancialReport({ show, reset, financials, review, period }) {
  return (
    <>
      {show && (
        <Row>
          <Col>
            <Row>
              <Col md={10}></Col>
              <Col>
                <Button variant="secondary" onClick={reset}>
                  Back to search
                </Button>
              </Col>
            </Row>
            <Row>
              <Col className="py-3">
                <h4>Financial Summary</h4>
                <h5>{`for period of ${dateFormat(period.startDate, 'MM/dd/yyyy')} to ${dateFormat(
                  period.endDate,
                  'MM/dd/yyyy'
                )}`}</h5>
                <Table striped bordered hover title="financial summary">
                  <thead>
                    <tr>
                      <th>Practitioner Name</th>
                      <th>Revenue</th>
                      <th>Cost</th>
                      <th>Gross Profit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {financials.map((f) => {
                      return (
                        <tr key={f.practitionerId} onClick={review(f.practitionerId)}>
                          <td>{f.practitionerName}</td>
                          <td>{formatCurrency(f.revenue)}</td>
                          <td>{formatCurrency(f.cost)}</td>
                          <td>{formatCurrency(f.revenue - f.cost)}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <hr />
          </Col>
        </Row>
      )}
    </>
  )
}
