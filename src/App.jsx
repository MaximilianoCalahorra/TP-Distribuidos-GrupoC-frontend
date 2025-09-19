import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login, ManageUsers, Page, Users, Inventories, ManageInventories, SolidarityEvents, ManageSolidarityEvents, ManageDonations } from './components';
const USERS_BASE_PATH = "/users";
const INVENTORIES_BASE_PATH = "/inventories";
const SOLIDARITY_EVENTS_BASE_PATH = "/solidarityEvents";
const DONATIONS_BASE_PATH = "/donations";

function App() {
  return (
    <Router>
      <Page>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path={`${USERS_BASE_PATH}`} element={<Users />} />
          <Route path={`${USERS_BASE_PATH}/newUser`} element={<ManageUsers action={"addUser"} />} />
          <Route path={`${USERS_BASE_PATH}/modifyUser`} element={<ManageUsers action={"modifyUser"} />} />
          <Route path={`${INVENTORIES_BASE_PATH}`} element={<Inventories />} />
          <Route path={`${INVENTORIES_BASE_PATH}/newInventory`} element={<ManageInventories action={"addInventory"} />} />
          <Route path={`${INVENTORIES_BASE_PATH}/modifyInventory/:id`} element={<ManageInventories action={"modifyInventory"} />} />
          <Route path={`${SOLIDARITY_EVENTS_BASE_PATH}`} element={<SolidarityEvents />} />
          <Route path={`${SOLIDARITY_EVENTS_BASE_PATH}/newSolidarityEvent`} element={<ManageSolidarityEvents action={"addSolidarityEvent"} />} />
          <Route path={`${SOLIDARITY_EVENTS_BASE_PATH}/modifySolidarityEvent`} element={<ManageSolidarityEvents action={"modifySolidarityEvent"} />} />
          <Route path={`${DONATIONS_BASE_PATH}/newDonation`} element={<ManageDonations />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Page>
    </Router>
  )
}

export default App
