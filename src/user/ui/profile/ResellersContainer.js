import { connect } from 'react-redux'
import Resellers from './Resellers'
import { resellerAdd, resellerRemove } from './ResellerActions'

const mapStateToProps = state => ({
  name: state.user.data.name,
  resellers: state.resellers,
})

const mapDispatchToProps = ({
  resellerAdd,
  resellerRemove,
})

const ResellersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Resellers)

export default ResellersContainer
