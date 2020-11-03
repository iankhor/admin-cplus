import React from 'react'
import { Table, Row, Col } from 'react-bootstrap'

export default function AppointmentsSummary({ show, selectedAppointments }) {
  return (
    <>
      {show && (
        <>
          <Row>
            <Col>
              {selectedAppointments.length > 0 && (
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
                          <td>{a.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                          <td>{a.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                          <td>
                            {(a.revenue - a.cost).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  )
}
