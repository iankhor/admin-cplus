import { findPracitionerAppointments, findAppointmentsBetween, summarise, summariseFinancials } from './'

describe('findPracitionerAppointments', () => {
  it('returns a practitioners appointments only', () => {
    const mockAppointsments = [
      { 
        id: 1, 
        practitioner_id: 2
      },
      { 
        id: 2, 
        practitioner_id: 2
      },
      { 
        id: 3, 
        practitioner_id: 3
      },
    ]

    expect(findPracitionerAppointments(3, mockAppointsments)).toEqual([{
      id: 3, 
      practitioner_id: 3
    }])
  })
})

describe('findAppointmentsBetween', () => {
  it('returns a practitioners appointments only', () => {
    const mockAppointsments = [
      { 
        id: 1, 
        date: '10/25/2020'
      },
      { 
        id: 2, 
        date: '10/26/2020'
      },
      { 
        id: 3, 
        date: '10/27/2020'
      },
    ]

    expect(findAppointmentsBetween('2020-10-25', '2020-10-26', mockAppointsments)).toEqual(
      expect.arrayContaining([      
        expect.objectContaining({ 
          id: 1, 
          date: '10/25/2020'
        }),
        expect.objectContaining({ 
          id: 2, 
          date: '10/26/2020'
        })
      ])
    )
  })
})

describe('summarise', () => {
  it('returns all cost and revenue', () => {
    const mockAppointsments = [
      { 
        revenue: 100,
        cost: 50,
      },
      { 
        revenue: 200,
        cost: 100,
      },
    ]

    expect(summarise(mockAppointsments)).toEqual({
      revenue: 300,
      cost: 150,
    })
  })
})

describe('summariseFinancials', () => {
  const mockAppointsments = [
    { 
      id: 1, 
      practitioner_id: 99, 
      date: '10/25/2020',
      revenue: 100,
      cost: 50,
    },
    { 
      id: 3, 
      practitioner_id: 99, 
      date: '10/26/2020',
      revenue: 200,
      cost: 100,
    },
    { 
      id: 4, 
      practitioner_id: 99, 
      date: '10/27/2020',
      revenue: 100,
      cost: 50,
    },
  ]

  it('return financials for a pracitioner within a date range', () => {
    expect(summariseFinancials(mockAppointsments, 99, { startDate: '2020-10-25', endDate: '2020-10-26'})).toEqual({
      revenue: 300,
      cost: 150
    })
  })
})
