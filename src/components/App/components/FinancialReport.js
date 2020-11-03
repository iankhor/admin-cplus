import React from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { findAppointments } from '../../../lib'
import { formatISO } from 'date-fns'

export default function FinancialReport({
  show,
  reset,
  financials,
  appointments,
  startDate,
  endDate,
  setSelectedAppointments,
}) {
  return (
    <>
      {show && (
        <Row>
          <Col>
            <Button variant="secondary" onClick={reset}>
              Back to search
            </Button>
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
                    <tr
                      key={f.practitionerId}
                      onClick={() =>
                        setSelectedAppointments(
                          findAppointments(appointments, f.practitionerId, {
                            startDate: formatISO(startDate, { representation: 'date' }),
                            endDate: formatISO(endDate, { representation: 'date' }),
                          })
                        )
                      }
                    >
                      <td>{f.practitionerName}</td>
                      <td>{f.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                      <td>{f.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                      <td>{(f.revenue - f.cost).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <hr />
          </Col>
        </Row>
      )}
    </>
  )
}
