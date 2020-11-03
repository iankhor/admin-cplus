import React, { useReducer } from 'react'
import { Container } from 'react-bootstrap'
import { isValid } from 'date-fns'

import { AppointmentsSummary, NavigationBar, FinancialReport, FinancialReportFilter } from './components'

import { initFilterState, filterReducer, initReportState, reportReducer } from './state'

export default function App({ practitioners, appointments }) {
  const [filterState, filterDispatch] = useReducer(filterReducer, initFilterState)
  const [reportState, reportDispatch] = useReducer(reportReducer, { appointments, practitioners }, initReportState)

  function reset() {
    filterDispatch({ type: 'reset' })
    reportDispatch({ type: 'reset' })
  }

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

  function onDateChange(type) {
    return (day) => reportDispatch({ type: 'date', property: type, value: day })
  }

  return (
    <>
      <NavigationBar />

      <Container className="mt-3">
        <FinancialReportFilter
          show={reportState.financials.length === 0}
          practitioners={practitioners}
          isError={filterState.error}
          validate={validate}
          dispatch={filterDispatch}
          state={filterState}
          onDateChange={onDateChange}
        />

        <FinancialReport
          show={reportState.financials.length > 0}
          reset={reset}
          financials={reportState.financials}
          startDate={filterState.dateRange.startDate}
          endDate={filterState.dateRange.endDate}
          dispatch={reportDispatch}
          state={reportState}
        />

        <AppointmentsSummary
          show={reportState.financials.length > 0}
          selectedAppointments={reportState.appointmentsForReview}
        />
      </Container>
    </>
  )
}
