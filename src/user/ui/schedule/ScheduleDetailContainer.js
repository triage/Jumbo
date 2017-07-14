import { connect } from 'react-redux'
import ScheduleDetail from './ScheduleDetail'
import { scheduleLoad } from '../../model/ScheduleActions'
import { scheduleCancel } from './ScheduleDetailActions'
import { spotPurchase, spotCancel } from './ScheduleDetailActions'
import UserType from 'src/user/model/UserType'

const mapStateToProps = (state, ownProps) => ({
  user: state.user.data,
  address: ownProps.match.params.address,
  schedule: state.schedules.find(found => {
    if (found.address === ownProps.match.params.address) {
      return found
    }
  })
})

const mapDispatchToProps = {
  scheduleLoad,
  scheduleCancel,
  spotPurchase,
  spotCancel
}

const ScheduleDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleDetail)

export default ScheduleDetailContainer
