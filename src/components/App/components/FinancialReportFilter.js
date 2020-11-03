import React from 'react'
import { ListGroup, Button, Row, Col } from 'react-bootstrap'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import { isValid, format as dateFormat, parse as dateParse } from 'date-fns'

function DatePick({ title, onDayChange, placeholder }) {
  return (
    <>
      <Row>
        <Col md={3}>
          <label>{title}</label>
        </Col>
        <Col>
          <DayPickerInput
            onDayChange={onDayChange}
            dayPickerProps={{
              initialMonth: new Date(2017, 12),
            }}
            format={'MM/dd/yyyy'}
            parseDate={(date, format) => {
              const parsed = dateParse(date, 'MM/dd/yyyy', new Date())
              return isValid(parsed) ? parsed : null
            }}
            formatDate={(date, format) => dateFormat(date, format)}
            placeholder={placeholder}
          />
        </Col>
      </Row>
    </>
  )
}

export default function FinancialReportFilter({
  show,
  isPractitionerSelected,
  practitioners,
  validate,
  dispatch,
  isError,
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
                  onClick={() => dispatch({ type: 'selectPractitioner', practitionerId: p.id })}
                  active={isPractitionerSelected(p.id)}
                >
                  {p.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col>
            <Row>
              <Col>
                <DatePick
                  title="Start date"
                  placeholder="Enter start date"
                  onDayChange={(day) => dispatch({ type: 'date', property: 'startDate', value: day })}
                />
                <DatePick
                  title="End date"
                  placeholder="Enter end date"
                  onDayChange={(day) => dispatch({ type: 'date', property: 'endDate', value: day })}
                />
              </Col>
            </Row>
            <Row className="py-2">
              <Col md={3} />
              <Col>
                {isError && (
                  <div className="text-danger">Select a valid start/end date and at least one practitioner</div>
                )}
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
