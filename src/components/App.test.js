import App from './App'
import { render, screen, within } from '@testing-library/react'
import user from '@testing-library/user-event'
import { buildAppointment } from '../testLib'

describe('<App />', () => {
  describe('searching a summary financial report of multiple practitioners', () => {
    it('shows a cost, revenue and gross profit for each practitioner', () => {
      const mockAppointments = [
        buildAppointment({ practitioner_id: 1, date: '10/21/2020', cost: 2, revenue: 1 }),
        buildAppointment({ practitioner_id: 2, date: '10/20/2020', cost: 10, revenue: 20 }),
        buildAppointment({ practitioner_id: 2, date: '10/21/2020', cost: 20, revenue: 30 }),
        buildAppointment({ practitioner_id: 3, date: '10/30/2020', cost: 5, revenue: 5 }),
      ]

      const mockPractitioners = [
        { id: 1, name: 'Mr Loss' },
        { id: 2, name: 'Mr Profit' },
      ]

      render(<App practitioners={mockPractitioners} appointments={mockAppointments} />)

      const practitionerList = within(screen.getByRole('list'))
      const startDateInput = screen.getByPlaceholderText(/enter start date/i)
      const endDateInput = screen.getByPlaceholderText(/enter end date/i)
      const generateReportBtn = screen.getByRole('button', { name: /generate report/i })

      user.click(practitionerList.getByText('Mr Loss'))
      user.click(practitionerList.getByText('Mr Profit'))

      user.type(startDateInput, '10/20/2020')
      user.type(endDateInput, '10/21/2020')

      user.click(generateReportBtn)

      const financialSummaryRows = within(screen.getByRole('table', { name: /financial summary/i })).getAllByRole('row')
      expect(financialSummaryRows).toHaveLength(3)

      const lossPractitionerSummary = Array.from(financialSummaryRows[1].cells).map((e) => e.textContent)
      const profitPractitionerSummary = Array.from(financialSummaryRows[2].cells).map((e) => e.textContent)

      expect(lossPractitionerSummary).toEqual(expect.arrayContaining(['Mr Loss', '$1.00', '$2.00', '-$1.00']))
      expect(profitPractitionerSummary).toEqual(expect.arrayContaining(['Mr Profit', '$50.00', '$20.00', '$30.00']))
    })

    describe('analysing appointments details for a specific practitioner', () => {
      const mockAppointments = [
        buildAppointment({
          practitioner_id: 1,
          client_name: 'Foo',
          date: '10/20/2020',
          appointment_type: 'Baz',
          cost: 10,
          revenue: 20,
          duration: 30,
        }),
      ]

      const mockPractitioners = [{ id: 1, name: 'Mr Foobaz' }]

      it('shows appointment details of the summarised financial report', () => {
        render(<App practitioners={mockPractitioners} appointments={mockAppointments} />)

        const practitionerList = within(screen.getByRole('list'))
        const startDateInput = screen.getByPlaceholderText(/enter start date/i)
        const endDateInput = screen.getByPlaceholderText(/enter end date/i)
        const generateReportBtn = screen.getByRole('button', { name: /generate report/i })

        user.click(practitionerList.getByText('Mr Foobaz'))

        user.type(startDateInput, '10/20/2020')
        user.type(endDateInput, '10/21/2020')

        user.click(generateReportBtn)

        user.click(screen.getByText('Mr Foobaz'))

        const appointmentsSummaryRows = within(screen.getByRole('table', { name: /appointments/i })).getAllByRole('row')
        expect(appointmentsSummaryRows).toHaveLength(2)

        const appointmentDetails = Array.from(appointmentsSummaryRows[1].cells).map((e) => e.textContent)

        expect(appointmentDetails).toEqual(
          expect.arrayContaining(['10/20/2020', 'Foo', 'Baz', '30', '$10.00', '$20.00', '$10.00'])
        )
      })
    })
  })
})
