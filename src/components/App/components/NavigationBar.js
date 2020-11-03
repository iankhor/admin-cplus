import React from 'react'
import { Navbar } from 'react-bootstrap'

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <Navbar.Brand>CP Admin</Navbar.Brand>
      </Navbar.Brand>
    </Navbar>
  )
}
