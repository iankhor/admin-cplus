import React, { useState } from 'react'
import { Container, ListGroup, Button, Table } from 'react-bootstrap'
import practitioners from './../data/practitioners.json'
import appointments from './../data/appointments.json'
import { formatISO } from 'date-fns'
import { summariseFinancials, findPracitioner } from './../lib'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

export default function App() {
  const [selected, setSelected] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [financials, setFinancials] = useState([])

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
    <Container>
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

      <p>Start date</p>
      <DayPickerInput onDayChange={(day) => setStartDate(day)} />
      <p>End date</p>
      <DayPickerInput onDayChange={(day) => setEndDate(day)} />

      <Button variant="primary" onClick={generateFinancials}>
        Generate Report
      </Button>

      <hr />
      <Table striped bordered hover>
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
              <tr>
                <td>{f.practitionerName}</td>
                <td>{f.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{f.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                <td>{(f.revenue - f.cost).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}
