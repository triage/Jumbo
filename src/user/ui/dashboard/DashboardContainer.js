import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { studioLoad } from '../../model/StudioActions'
import { individualLoad } from '../../model/IndividualActions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  studio: state.studio,
  reseller: state.reseller,
  events: state.schedules.map(schedule => {
    const obj = {
      address: schedule.address,
      start: new Date(schedule.dates.start),
      end: new Date(schedule.dates.end),
      name: schedule.class ? schedule.class.name : 'n/a',
      instructor: schedule.instructor,
      reserved: schedule.reserved,
      studio: schedule.class.studio || state.studio,
    }
    return obj
  })
})

const mapDispatchToProps = ({
  studioLoad,
  individualLoad
})

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard))

export default DashboardContainer
