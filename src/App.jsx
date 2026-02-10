// import Accordion from './Accordion';
// import DataTable from './Data_Table';
// import Tic_Tac_Toe from './Tic_Tac_Toe';
// import TicTacToe2 from './Tic_Tac_Toe_2';
// import users from './Data_Table/users';
// import Tabs from './Tabs';
// import Histogram from './Histogram';
// import ProgressBars2 from './Progress_Bars_2';
// import JobBoard from './Job_Board';
// import TransferList from './Transfer_List';
// import UndoableCounter from './Undoable_Counter';
// import MemoryGame from './Memory_Game';
// import PrepareData from './Memory_Game/prepareData';
// import FileExplorer from './File_Explorer';
// import { data } from "./File_Explorer/data";
// import MultiSelectComponent from './Multi_Select_Component';
// import GenerateTable from './Generate_Table';
// import TrafficLights from './Traffic_Lights';
// import Stopwatch from './Stopwatch';
// import WhackAMole from './Whack_A_Mole';
// import BirthYearHistogram from './Birth_Year_Histogram';
// import InfiniteScroll from './Infinite_Scroll';
// import MemoryGame2 from './Memory_Game2';
// import Connect4 from './Connect4';
// import NestedCheckboxes from './Nested_Checkboxes';
// import Carousel from './Carousel';
// import Autocomplete from './Autocomplete/withChips';
// import AuthCodeInput from './Auth_Code_Input';

import './index.css'

function App() {
  // for histogram
  const START_YEAR = 1950;
  const END_YEAR = 2019;

  // data fetched from api
  const accordionData = [
    { id: 'html', title: 'HTML', content: 'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.' },
    { id: 'css', title: 'CSS', content: 'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.' },
    { id: 'js', title: 'JS', content: 'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.' },
  ];

  const tabData = [
    {
      value: 'html',
      label: 'HTML',
      panel:
        'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
    },
    {
      value: 'css',
      label: 'CSS',
      panel:
        'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
    },
    {
      value: 'javascript',
      label: 'JavaScript',
      panel:
        'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
    },
  ];

  const list1 = [{ id: 'HTML', label: 'HTML' }, { id: 'JavaScript', label: 'JavaScript' }, { id: 'CSS', label: 'CSS' }, { id: 'TypeScript', label: 'TypeScript' }];
  const list2 = [{ id: 'React', label: 'React' }, { id: 'Angular', label: 'Angular' }, { id: 'Vue', label: 'Vue' }, { id: 'Svelte', label: 'Svelte' }];

  const emojis = [
  '🐵',
  '🐶',
  '🦊',
  '🐱',
  '🦁',
  '🐯',
  '🐴',
  '🦄',
  '🦓',
  '🦌',
  '🐮',
  '🐷',
  '🐭',
  '🐹',
  '🐻',
  '🐨',
  '🐼',
  '🐽',
  '🐸',
  '🐰',
  '🐙',
];
  const apps = [
    { id: 'accordion', title: 'Accordion' },
    { id: 'data-table', title: 'Data Table' },
    { id: 'tic-tac-toe', title: 'Tic Tac Toe' },
    { id: 'tabs', title: 'Tabs' },
    { id: 'histogram', title: 'Histogram' },
    { id: 'progress-bars', title: 'Progress Bars' },
    { id: 'job-board', title: 'Job Board' },
    { id: 'transfer-list', title: 'Transfer List' },
    { id: 'undoable-counter', title: 'Undoable Counter' },
    { id: 'memory-game', title: 'Memory Game' },
    { id: 'file-explorer', title: 'File Explorer' },
    { id: 'multi-select', title: 'Multi Select Component' },
    { id: 'generate-table', title: 'Generate Table' },
    { id: 'traffic-lights', title: 'Traffic Lights' },
    { id: 'stopwatch', title: 'Stopwatch' },
    { id: 'whack-a-mole', title: 'Whack A Mole' },
    { id: 'birth-year-histogram', title: 'Birth Year Histogram' },
    { id: 'infinite-scroll', title: 'Infinite Scroll' },
    { id: 'memory-game-2', title: 'Memory Game 2' },
    { id: 'connect4', title: 'Connect4' },
    { id: 'nested-checkboxes', title: 'Nested Checkboxes' },
    { id: 'carousel', title: 'Carousel' },
    { id: 'autocomplete', title: 'Autocomplete' },
    { id: 'auth-code-input', title: 'Auth Code Input' },
  ];

  const handleCardClick = (appId) => {
    // Logic to navigate to the corresponding app component based on appId
    console.log(`Navigate to ${appId} app`);
  }

  // const data = PrepareData(emojis,8);
  return (
    <div className='wrapper'>
      <h1>Small React web apps</h1>
      <div className='web-apps'>
        {apps.map(app => (
          <div key={app.id} className='card' onClick={() => handleCardClick(app.id)}>
            <h3>{app.title}</h3>
          </div>
        ))}
      </div>

      {/* <DataTable data={users}/> */}
      {/* <Tabs data={tabData}/> */}
      {/* <Histogram startYear={START_YEAR} endYear={END_YEAR}/> */}
      {/* <ProgressBars2/> */}
      {/* <JobBoard/> */}
      {/* <TransferList list1={list1} list2={list2}/> */}
      {/* <UndoableCounter/> */}
      {/* <MemoryGame emojis={data}/> */}
      {/* <FileExplorer data={data}/> */}
      {/* <MultiSelectComponent data={[...list1,...list2]}/> */}
      {/* <GenerateTable/> */}
      {/* <TrafficLights/> */}
      {/* <Stopwatch/> */}
      {/* <TicTacToe2 n={6} m={3}/> */}
      {/* <WhackAMole/> */}
      {/* <BirthYearHistogram/> */}
      {/* <InfiniteScroll/> */}
      {/* <MemoryGame2 emojis={emojis.slice(0,8)}/> */}
      {/* <Connect4 rows={6} cols={7}/> */}
      {/* <NestedCheckboxes/> */}
      {/* <Carousel items={["One", "Two", "Three", "Four"]} /> */}
      {/* <Autocomplete/> */}
      {/* <AuthCodeInput length={6}/> */}
    </div>
  )
}

export default App
