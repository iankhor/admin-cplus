import React, { useReducer } from 'react'
import { Container } from 'react-bootstrap'
import { isValid } from 'date-fns'

import { AppointmentsSummary, NavigationBar, FinancialReport, FinancialReportFilter } from './components'
import { initFilterState, filterReducer, initReportState, reportReducer } from './state'

export default function App({ practitioners, appointments }) {
  const [filterState, filterDispatch] = useReducer(filterReducer, initFilterState)
  const [reportState, reportDispatch] = useReducer(reportReducer, { appointments, practitioners }, initReportState)

  const hasFinancialReport = reportState.financials.length > 0

  function validate() {
    const valid = isValid(filterState.dateRange.startDate) && isValid(filterState.dateRange.endDate)

    if (valid) {
      reportDispatch({
        type: 'financials',
        practitionerIds: filterState.practitioners,
        startDate: filterState.dateRange.startDate,
        endDate: filterState.dateRange.endDate,
      })
    } else {
      filterDispatch({ type: 'error' })
    }
  }

  function reviewAppointments(practitionerId) {
    return () =>
      reportDispatch({
        type: 'appointments',
        practitionerId: practitionerId,
        startDate: filterState.dateRange.startDate,
        endDate: filterState.dateRange.endDate,
      })
  }

  function isPractitionerSelected(practitionerId) {
    return filterState.practitioners.includes(practitionerId)
  }

  function reset() {
    filterDispatch({ type: 'reset' })
    reportDispatch({ type: 'reset' })
  }

  return (
    <>
      <NavigationBar />

      <Container className="mt-3">
        <FinancialReportFilter
          show={!hasFinancialReport}
          practitioners={reportState.practitioners}
          isPractitionerSelected={isPractitionerSelected}
          isError={filterState.error}
          validate={validate}
          dispatch={filterDispatch}
        />

        <FinancialReport
          show={hasFinancialReport}
          reset={reset}
          financials={reportState.financials}
          period={filterState.dateRange}
          review={reviewAppointments}
        />

        <AppointmentsSummary
          show={hasFinancialReport}
          practitionerNameUnderReview={reportState.practitionerNameUnderReview}
          selectedAppointments={reportState.appointmentsForReview}
        />
      </Container>
    </>
  )
}
