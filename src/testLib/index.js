export function buildAppointment(config) {
  const fakeId = Math.random()

  return {
    id: fakeId,
    date: '11/15/2017',
    client_name: 'Mr client name',
    appointment_type: '0DC33ZZ',
    duration: 10,
    revenue: 20,
    cost: 30,
    practitioner_id: 1,
    ...config,
  }
}
