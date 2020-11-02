import React, { useState } from 'react'
import { Container, ListGroup, Button, Table, Row, Col, Navbar } from 'react-bootstrap'
// import practitioners from './../data/practitioners.json'
// import appointments from './../data/appointments.json'
import { formatISO, isValid, format as dateFormat, parse as dateParse } from 'date-fns'
import { summariseFinancials, findPracitioner, findAppointments } from './../lib'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

export default function App({ practitioners, appointments }) {
  const [selected, setSelected] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [financials, setFinancials] = useState([])
  const [selectedAppointments, setSelectedAppointments] = useState([])
  const [isError, setIsError] = useState(false)

  function reset() {
    setSelected([])
    setStartDate(null)
    setEndDate(null)
    setFinancials([])
    setSelectedAppointments([])
    setIsError(false)
  }

  function validate() {
    const valid = isValid(startDate) && isValid(endDate)

    valid ? generateFinancials() : setIsError(true)
  }

  function generateFinancials() {
    const financials = selected.map((practitionerId) => {
      const summary = summariseFinancials(appointments, practitionerId, {
        startDate: formatISO(startDate, { representation: 'date' }),
        endDate: formatISO(endDate, { representation: 'date' }),
      })

      return {
        practitionerId,
        practitionerName: findPracitioner(practitionerId, practitioners).name,
        ...summary,
      }
    })

    setFinancials(financials)
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <Navbar.Brand>CP Admin</Navbar.Brand>
        </Navbar.Brand>
      </Navbar>

      <Container className="mt-3">
        {financials.length === 0 && (
          <Row>
            <Col>
              <h5>Select one or more practitioners</h5>
              <ListGroup as="ul">
                {practitioners.map((p) => (
                  <ListGroup.Item
                    key={p.id}
                    as="li"
                    onClick={() => setSelected([...new Set([...selected, p.id])])}
                    active={selected.includes(p.id)}
                  >
                    {p.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <Row>
                <Col>
                  <p>Start date</p>
                  <DayPickerInput
                    onDayChange={(day) => setStartDate(day)}
                    dayPickerProps={{
                      initialMonth: new Date(2017, 12),
                    }}
                    format={'MM/dd/yyyy'}
                    parseDate={(date, format) => {
                      const parsed = dateParse(date, 'MM/dd/yyyy', new Date())
                      return isValid(parsed) ? parsed : null
                    }}
                    formatDate={(date, format) => dateFormat(date, format)}
                    placeholder={'Enter start date'}
                  />
                  <p>End date</p>
                  <DayPickerInput
                    onDayChange={(day) => setEndDate(day)}
                    dayPickerProps={{
                      initialMonth: new Date(2017, 12),
                    }}
                    parseDate={(date, format) => {
                      const parsed = dateParse(date, 'MM/dd/yyyy', new Date())
                      return isValid(parsed) ? parsed : null
                    }}
                    format={'MM/dd/yyyy'}
                    formatDate={(date, format) => dateFormat(date, format)}
                    placeholder={'Enter end date'}
                  />
                  {isError && <div>Select a valid start and end date</div>}
                </Col>
              </Row>
              <Row className="py-3">
                <Col>
                  <Button variant="primary" onClick={validate}>
                    Generate Report
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
        {financials.length > 0 && (
          <>
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
                          <td>
                            {(f.revenue - f.cost).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <hr />
              </Col>
            </Row>
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
      </Container>
    </>
  )
}
