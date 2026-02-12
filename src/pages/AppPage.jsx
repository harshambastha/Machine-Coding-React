import { useParams } from 'react-router-dom'
import GenerateTable from '@components/GenerateTable/GenerateTable'
import Autocomplete from '@components/Autocomplete/Autocomplete'
import AutocompleteDemo from '@components/Autocomplete/AutocompleteDemo'

export default function AppPage() {
  const { appId } = useParams()

  const renderComponent = () => {
    switch (appId) {
      case 'generate-table':
        return <GenerateTable />
      case 'autocomplete':
        return <AutocompleteDemo />
      default:
        return (
          <div style={{ padding: 20 }}>
            <h2>{appId}</h2>
            <p>Render {appId} component here</p>
          </div>
        )
    }
  }

  return renderComponent()
}
