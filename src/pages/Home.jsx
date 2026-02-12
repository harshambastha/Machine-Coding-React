import { useNavigate } from 'react-router-dom'
import { apps } from '../data/appListData'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="wrapper">
      <h1>Small React web apps</h1>

      <div className="web-apps">
        {apps.map(app => (
          <div
            key={app.id}
            className="card"
            onClick={() => navigate(`/${app.id}`)}
          >
            <h3>{app.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
