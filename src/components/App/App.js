import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { formatISO, isValid } from 'date-fns'
import { summariseFinancials, findPracitioner } from '../../lib'

import { AppointmentsSummary, NavigationBar, FinancialReport, FinancialReportFilter } from './components'

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
      <NavigationBar />

      <Container className="mt-3">
        <FinancialReportFilter
          show={financials.length === 0}
          practitioners={practitioners}
          selected={selected}
          setSelected={setSelected}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          isError={isError}
          validate={validate}
        />

        <FinancialReport
          show={financials.length > 0}
          reset={reset}
          financials={financials}
          appointments={appointments}
          startDate={startDate}
          endDate={endDate}
          setSelectedAppointments={setSelectedAppointments}
        />

        <AppointmentsSummary show={financials.length > 0} selectedAppointments={selectedAppointments} />
      </Container>
    </>
  )
}
