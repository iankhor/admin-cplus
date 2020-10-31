import { parse } from 'date-fns'
import Fuse from 'fuse.js'

export function findPracitioner(practitionerId, practitioners) {
  return practitioners.find((p) => p.id === practitionerId)
}

export function findPracitionerAppointments(practitionerId, appointments) {
  return appointments.filter((appt) => appt.practitioner_id === practitionerId)
}

export function findAppointmentsBetween(start, end, appointments) {
  const startDate = parse(start, 'yyyy-mm-dd', new Date())
  const endDate = parse(end, 'yyyy-mm-dd', new Date())

  return appointments.filter((appt) => {
    const currDate = parse(appt.date, 'mm/dd/yyyy', new Date())

    return startDate <= currDate && currDate <= endDate
  })
}

export function summarise(appointments) {
  const init = {
    cost: 0,
    revenue: 0,
  }

  return appointments.reduce((acc, curr) => {
    return {
      cost: acc.cost + curr.cost,
      revenue: acc.revenue + curr.revenue,
    }
  }, init)
}

export function findAppointments(appointments, practitionerId, options) {
  const practitionerAppointments = findPracitionerAppointments(practitionerId, appointments)
  const appointmentsDateRange = findAppointmentsBetween(options.startDate, options.endDate, practitionerAppointments)

  return appointmentsDateRange
}

export function summariseFinancials(appointments, practitionerId, options) {
  const practitionerAppointments = findPracitionerAppointments(practitionerId, appointments)
  const appointmentsDateRange = findAppointmentsBetween(options.startDate, options.endDate, practitionerAppointments)

  return summarise(appointmentsDateRange)
}

export function searchPractitioner(practitioners, searchString) {
  const fuse = new Fuse(practitioners, { keys: ['name'] })

  return fuse.search(searchString).map((p) => p.item)
}
