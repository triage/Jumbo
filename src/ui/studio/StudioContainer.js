import { connect } from 'react-redux'
import Studio from './Studio'
// import { studioLoad } from '../../model/StudioActions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  if (!state.studios) {
    return {}
  }

  return {
    studio: state.studios[ownProps.address],
    events: state.studios[ownProps.address].schedules.map(schedule => {
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
  }
}

const mapDispatchToProps = ({
  // studioLoad,
})

const StudioContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Studio))

export default StudioContainer
