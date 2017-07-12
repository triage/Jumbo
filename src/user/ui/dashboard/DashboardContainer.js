import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { studioLoad } from '../../model/StudioActions'
import { withRouter } from 'react-router-dom'
import eth from 'src/util/eth'

console.log(`default: ${eth.defaultAccount()}`)

const mapStateToProps = (state, ownProps) => {  
  return {
    user: state.user,
    studio: state.studio,
    events: state.studio.schedules.map(schedule => {
      return {
        address: schedule.address,
        start: new Date(schedule.dates.start),
        end: new Date(schedule.dates.end),
        name: schedule.class ? schedule.class.name : 'n/a',
        instructor: schedule.instructor
      }
    })
  }
}

const mapDispatchToProps = ({
  studioLoad
})

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Dashboard))

export default DashboardContainer
