import React from 'react'
import { Table, Row, Col } from 'react-bootstrap'
import { formatCurrency } from '../../../lib'

export default function AppointmentsSummary({ show, practitionerNameUnderReview, selectedAppointments }) {
  return (
    <>
      {show && (
        <>
          <Row>
            <Col>
              {selectedAppointments.length > 0 && (
                <>
                  <h4>Appointment summary</h4>
                  <h5>{`for ${practitionerNameUnderReview}`}</h5>
                  <Table striped bordered hover title="appointments">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Client name</th>
                        <th>Appointment type</th>
                        <th>Duration</th>
                        <th>Cost</th>
                        <th>Revenue</th>
                        <th>Gross Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedAppointments.length === 0 && <div>No appointments found</div>}
                      {selectedAppointments.map((a) => {
                        return (
                          <tr key={a.appointment_type}>
                            <td>{a.date}</td>
                            <td>{a.client_name}</td>
                            <td>{a.appointment_type}</td>
                            <td>{a.duration}</td>
                            <td>{formatCurrency(a.revenue)}</td>
                            <td>{formatCurrency(a.cost)}</td>
                            <td>{formatCurrency(a.revenue - a.cost)}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
