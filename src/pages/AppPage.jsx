import { useParams } from 'react-router-dom'
import GenerateTable from '@components/GenerateTable/GenerateTable'
import AutocompleteDemo from '@components/Autocomplete/AutocompleteDemo'
import Accordion from '@components/Accordion/Accordion'
import Tabs from '@components/Tabs/Tabs'
import DataTable from '@components/DataTable/DataTable'
import AuthCodeInput from '@components/AuthCodeInput/AuthCodeInput'
import BirthYearHistogram from '@components/BirthYearHistogram/BirthYearHistogram'
import FileExplorer from '@components/FileExplorer/FileExplorer'
import Carousel from '@components/Carousel/Carousel'
import Connect4 from '@components/Connect4/Connect4'
import InfiniteScroll from '@components/InfiniteScroll/InfiniteScroll'
import JobBoard from '@components/JobBoard/JobBoard'
import MemoryGame from '@components/MemoryGame/MemoryGame'
import MultiSelectComponent from '@components/MultiSelectComponent/MultiSelectComponent'
import NestedCheckboxes from '@components/NestedCheckboxes/NestedCheckboxes'
import ProgressBars2 from '@components/ProgressBars2/ProgressBars2'
import Stopwatch from '@components/Stopwatch/Stopwatch'
import TicTacToe from '@components/TicTacToe/TicTacToe'
import TicTacToe2 from '@components/TicTacToe2/TicTacToe2'
import TrafficLights from '@components/TrafficLights/TrafficLights'
import TransferList from '@components/TransferList/TransferList'
import UndoableCounter from '@components/UndoableCounter/UndoableCounter'
import WhackAMole from '@components/WhackAMole/WhackAMole'

import { accordionData } from '@data/accordionData';
import DropdownDemo from '@components/Dropdown/DropdownDemo';
import { tabData } from '@data/tabData';
import { fileExplorerData } from '@data/fileExplorerData'
import { emojis } from '@data/memoryGameData'
import { list1, list2 } from '@data/transferListData'
import { START_YEAR, END_YEAR } from '@data/histogramData'
import { carouselItems } from '@data/carouselData'
import { checkboxesData } from '@data/nestedCheckboxesData'

export default function AppPage() {
  const { appId } = useParams()

  const renderComponent = () => {
    switch (appId) {
      case 'generate-table':
        return <GenerateTable />
      case 'dropdown':
        return <DropdownDemo />;
      case 'autocomplete':
        return <AutocompleteDemo />
      case 'accordion':
        return <Accordion data={accordionData} />
      case 'tabs':
        return <Tabs data={tabData} />
      case 'data-table':
        return <DataTable />
      case 'auth-code-input':
        return <AuthCodeInput length={6} />
      case 'birth-year-histogram':
        return <BirthYearHistogram />
      case 'file-explorer':
        return <FileExplorer data={fileExplorerData} />
      case 'tic-tac-toe':
        return <TicTacToe />
      case 'tic-tac-toe-2':
        return <TicTacToe2 />
      case 'progress-bars':
        return <ProgressBars2 />
      case 'job-board':
        return <JobBoard />
      case 'transfer-list':
        return <TransferList list1={list1} list2={list2} />
      case 'undoable-counter':
        return <UndoableCounter />
      case 'memory-game':
        return <MemoryGame emojis={emojis} />
      case 'multi-select':
        return <MultiSelectComponent />
      case 'traffic-lights':
        return <TrafficLights />
      case 'stopwatch':
        return <Stopwatch />
      case 'whack-a-mole':
        return <WhackAMole />
      case 'infinite-scroll':
        return <InfiniteScroll />
      case 'connect4':
        return <Connect4 rows={6} cols={7} />
      case 'nested-checkboxes':
        return <NestedCheckboxes checkboxesData= {checkboxesData}/>
      case 'carousel':
        return <Carousel items={carouselItems} />
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
