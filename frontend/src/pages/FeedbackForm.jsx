import { Navigate, useParams } from 'react-router-dom'

function FeedbackForm() {
  const { teamId } = useParams()
  return <Navigate to={`/verify?team=${encodeURIComponent(teamId)}`} replace />
}

export default FeedbackForm
