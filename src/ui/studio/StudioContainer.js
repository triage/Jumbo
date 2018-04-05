import { connect } from 'react-redux'
import Studio from './Studio'
import { studioLoad } from 'user/model/StudioActions'
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
  const {
    match
  } = ownProps

  if (state.studio.address !== match.params.address || state.studio.loading) {
    return {
      address: match.params.address,
      loading: state.studio.loading,
      loaded: state.studio.loaded
    }
  }

  return {
    loaded: true,
    loading: false,
    studio: state.studio,
    events: state.studio.schedules ? state.studio.schedules.map(schedule => {
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
    }) : [],
  }
}

const mapDispatchToProps = ({
  studioLoad,
})

const StudioContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Studio))

export default StudioContainer
