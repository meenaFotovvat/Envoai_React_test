import './LayoutChallenge.css';
import DataEntryTable from '../components/DataEntryTable';
import SystemMonitorTable from '../components/SystemMonitorTable';

function LayoutChallenge() {
  return (
    <div className="page-container">
      <h2 className="page-title">Challenge 1: Layout & Functionality Fix</h2>

      <div className="instructions">
        <h3>Your Task:</h3>
        <ul>
          <li>Fix the layout of the two tables below so they are properly arranged on the page</li>
          <li>The tables should be responsive and well-positioned</li>
          <li>Ensure both tables function correctly</li>
          <li>Improve the overall visual presentation</li>
          <li>Make sure the data entry table saves data to localStorage</li>
          <li>Verify the system monitor displays real-time data</li>
        </ul>
      </div>

      <div className="repaired-layout">
        <DataEntryTable />
        <SystemMonitorTable />
      </div>
    </div>
  );
}

export default LayoutChallenge;
