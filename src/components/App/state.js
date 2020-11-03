import { formatISO } from 'date-fns'
import { summariseFinancials, findPracitioner, findAppointments } from '../../lib'

export function initReportState({ appointments, practitioners }) {
  return {
    financials: [],
    appointmentsForReview: [],
    appointments,
    practitioners,
  }
}

function buildFinancials(practitionerIds, practitioners, appointments, startDate, endDate) {
  return practitionerIds.map((practitionerId) => {
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
}

function buildAppointmentsForReview(practitionerId, appointments, startDate, endDate) {
  return findAppointments(appointments, practitionerId, {
    startDate: formatISO(startDate, { representation: 'date' }),
    endDate: formatISO(endDate, { representation: 'date' }),
  })
}

export function reportReducer(state, action) {
  switch (action.type) {
    case 'financials':
      return {
        ...state,
        financials: buildFinancials(
          action.practitionerIds,
          state.practitioners,
          state.appointments,
          action.startDate,
          action.endDate
        ),
      }
    case 'appointments':
      return {
        ...state,
        practitionerNameUnderReview: findPracitioner(action.practitionerId, state.practitioners).name,
        appointmentsForReview: buildAppointmentsForReview(
          action.practitionerId,
          state.appointments,
          action.startDate,
          action.endDate
        ),
      }
    case 'reset':
      return initReportState({ appointments: state.appointments, practitioners: state.practitioners })
    default:
      return state
  }
}

export const initFilterState = {
  practitioners: [],
  dateRange: {
    startDate: null,
    end: null,
  },
  error: false,
}

export function filterReducer(state, action) {
  switch (action.type) {
    case 'selectPractitioner':
      return {
        ...state,
        practitioners: [...state.practitioners, action.practitionerId],
      }
    case 'date':
      return {
        ...state,
        dateRange: {
          ...state.dateRange,
          [action.property]: action.value,
        },
      }
    case 'error':
      return {
        ...state,
        error: true,
      }
    case 'reset':
      return initFilterState
    default:
      return state
  }
}
