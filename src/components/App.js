import React, { Component, useState } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import practitioners from './../data/practitioners.json'
import { formatISO } from 'date-fns'

import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

export default function App() {
  const [selected, setSelected] = useState([])
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

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
      <DayPickerInput onDayChange={(day) => setStartDate(formatISO(day, { representation: 'date' }))} />
      <p>End date</p>
      <DayPickerInput onDayChange={(day) => setEndDate(formatISO(day, { representation: 'date' }))} />
    </Container>
  )
}
