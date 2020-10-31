import React, { Component, useState } from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import practitioners from './../data/practitioners.json'

//

export default function App() {
  const [selected, setSelected] = useState([])

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
    </Container>
  )
}
