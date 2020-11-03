import React from 'react'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { isValid, format as dateFormat, parse as dateParse } from 'date-fns'

export default function FinancialReportFilter({
  show,
  practitioners,
  selected,
  setSelected,
  setStartDate,
  setEndDate,
  isError,
  validate,
}) {
  return (
    <>
      {show && (
        <Row>
          <Col>
            <h5>Select one or more practitioners</h5>
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
          </Col>
          <Col>
            <Row>
              <Col>
                <p>Start date</p>
                <DayPickerInput
                  onDayChange={(day) => setStartDate(day)}
                  dayPickerProps={{
                    initialMonth: new Date(2017, 12),
                  }}
                  format={'MM/dd/yyyy'}
                  parseDate={(date, format) => {
                    const parsed = dateParse(date, 'MM/dd/yyyy', new Date())
                    return isValid(parsed) ? parsed : null
                  }}
                  formatDate={(date, format) => dateFormat(date, format)}
                  placeholder={'Enter start date'}
                />
                <p>End date</p>
                <DayPickerInput
                  onDayChange={(day) => setEndDate(day)}
                  dayPickerProps={{
                    initialMonth: new Date(2017, 12),
                  }}
                  parseDate={(date, format) => {
                    const parsed = dateParse(date, 'MM/dd/yyyy', new Date())
                    return isValid(parsed) ? parsed : null
                  }}
                  format={'MM/dd/yyyy'}
                  formatDate={(date, format) => dateFormat(date, format)}
                  placeholder={'Enter end date'}
                />
                {isError && <div>Select a valid start and end date</div>}
              </Col>
            </Row>
            <Row className="py-3">
              <Col>
                <Button variant="primary" onClick={validate}>
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  )
}