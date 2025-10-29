import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Login, ManageUsers, Page, Users, Inventories, ManageInventories, 
  SolidarityEvents, ManageSolidarityEvents, ManageDonations, ExternalSolidarityEvents, 
  Donations, RequestDonation, ExternalDonations, DonationsOffers, ManageDonationOffer,
  ExternalDonationsOffers, OutcomingTransfers, IncomingTransfers, ONGs , Presidents, MySolidarityEvents
} from './components';
const USERS_BASE_PATH = "/users";
const INVENTORIES_BASE_PATH = "/inventories";
const SOLIDARITY_EVENTS_BASE_PATH = "/solidarityEvents";
const EXTERNAL_SOLIDARITY_EVENTS_BASE_PATH = "/ExternalSolidarityEvents";
const DONATIONS_BASE_PATH = "/donations";
const DONATIONS_OFFERS_BASE_PATH = "/offersDonations"
const DONATIONS_TRANSFERS_BASE_PATH = "/transfers"
const ONGS_INFORMATION_BASE_PATH = "/ongs"
const PRESIDENTS_INFORMATION_BASE_PATH = "/presidents"
const MY_SOLIDARITY_EVENTS_BASE_PATH = "/mySolidarityEvents";

function App() {
  return (
    <Router>
      <Page>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path={`${USERS_BASE_PATH}`} element={<Users />} />
          <Route path={`${USERS_BASE_PATH}/newUser`} element={<ManageUsers action={"addUser"} />} />
          <Route path={`${USERS_BASE_PATH}/modifyUser/:id`} element={<ManageUsers action={"modifyUser"} />} />
          <Route path={`${INVENTORIES_BASE_PATH}`} element={<Inventories />} />
          <Route path={`${INVENTORIES_BASE_PATH}/newInventory`} element={<ManageInventories action={"addInventory"} />} />
          <Route path={`${INVENTORIES_BASE_PATH}/modifyInventory/:id`} element={<ManageInventories action={"modifyInventory"} />} />
          <Route path={`${SOLIDARITY_EVENTS_BASE_PATH}`} element={<SolidarityEvents />} />
          <Route path={`${SOLIDARITY_EVENTS_BASE_PATH}/newSolidarityEvent`} element={<ManageSolidarityEvents action={"addSolidarityEvent"} />} />
          <Route path={`${SOLIDARITY_EVENTS_BASE_PATH}/modifySolidarityEvent/:id`} element={<ManageSolidarityEvents action={"modifySolidarityEvent"} />} />
          <Route path={`${SOLIDARITY_EVENTS_BASE_PATH}/newDonation/:id`} element={<ManageDonations />} />
          <Route path={`${EXTERNAL_SOLIDARITY_EVENTS_BASE_PATH}`} element={<ExternalSolidarityEvents />} />
          <Route path={`${DONATIONS_BASE_PATH}`} element={<Donations />} />
          <Route path={`${DONATIONS_BASE_PATH}Ext`} element={<ExternalDonations />} />
          <Route path={`${DONATIONS_BASE_PATH}/requestDonation`} element={<RequestDonation />} />
          <Route path={`${DONATIONS_OFFERS_BASE_PATH}`} element={<DonationsOffers />} />
          <Route path={`${DONATIONS_OFFERS_BASE_PATH}/requestDonationOffer`} element={<ManageDonationOffer />} />
          <Route path={`${DONATIONS_OFFERS_BASE_PATH}Ext`} element={<ExternalDonationsOffers />} />
          <Route path={`${DONATIONS_TRANSFERS_BASE_PATH}Outcoming`} element={<OutcomingTransfers />} />
          <Route path={`${ONGS_INFORMATION_BASE_PATH}`} element={<ONGs />} />
          <Route path={`${PRESIDENTS_INFORMATION_BASE_PATH}`} element={<Presidents />} />
          <Route path={`${MY_SOLIDARITY_EVENTS_BASE_PATH}`} element={<MySolidarityEvents />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Page>
    </Router>
  )
}

export default App
