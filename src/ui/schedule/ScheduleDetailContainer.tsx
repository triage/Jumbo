import React from 'react'
import { connect } from 'react-redux'
import { Schedule, ScheduleJSON } from 'data/schedule/Schedule'
import { match } from 'react-router'
import { User, UserJSON } from 'data/user/User'
import { scheduleLoad } from 'data/schedule/ScheduleActions'
import ScheduleDetail, { ScheduleDetailProps } from './ScheduleDetail'
import { spotPurchase, spotCancel, scheduleCancel, scheduleComplete } from './ScheduleDetailActions'

interface State {
  schedules: [ScheduleJSON]
  user: {
    data: UserJSON
    date: Date
  }
}

const mapStateToProps = (
  state: State,
  ownProps: { match: match<{ address: string}> }): Partial<ScheduleDetailProps> => {
    
  const schedule = state.schedules.find((found: {address: string}) => found.address === ownProps.match.params.address)
  const reserved = schedule ? schedule.reserved : false
  return {
    user: new User(state.user.data),
    address: ownProps.match.params.address,
    schedule: schedule ? new Schedule(schedule) : undefined,
    reserved,
    date: state.user.date, // this is shitty
  }
}

/* tslint:disable-next-line */ 
const DummyFormContainer: React.SFC<any> = props => {  
  return (
    <ScheduleDetail {...props} />
  )
}

const mapDispatchToProps = {
  scheduleLoad,
  scheduleCancel,
  scheduleComplete,
  spotPurchase,
  spotCancel,
}

const ScheduleDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DummyFormContainer)

export default ScheduleDetailContainer
