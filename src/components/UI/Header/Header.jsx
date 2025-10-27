import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Logout from "@mui/icons-material/Logout";
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import FestivalIcon from '@mui/icons-material/Festival';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppBar } from '@mui/material';
import styles from './styles.module.css';
import { useSelector } from '../../../store/userStore';
import { handleNavigate } from '../../../Utils/Utils';
import { Roles } from '../../../constants/Roles';

export default function Header() {
  const location = useLocation ();
  const ocultarMenu = location.pathname == "/login";
  const navigate = useNavigate();
  const userRol = useSelector((state) => state.userRol)
  const userAutenticated = useSelector((state) => state.username)

  return (
    <AppBar elevation={8} sx={{display:"flex", flexDirection: "row", justifyContent: "space-between", 
    alignItems: "center", backgroundColor: "rgb(5, 53, 101)", color: "white", padding: "0px 20px 0px 20px"}}>
          <div className={styles.imgContainer} onClick={(!ocultarMenu && !location.pathname.includes("/donations")) ? ()=>{handleNavigate(userRol, navigate)} : location.pathname.includes("/donations") ? ()=>{navigate("/donations")}  : ()=>{}}>
            <img src="/IconoPagina.png" alt="" />
            {!ocultarMenu && (
              <h3>{userAutenticated} - {userRol}</h3>
            )}
          </div>
          {((!ocultarMenu && !location.pathname.includes("/donations") && !location.pathname.includes("/offersDonations") && !location.pathname.includes("/transfers"))) && (
          <>
            <div className={styles.buttonsContainer}>
              {userRol == Roles [0] && (
                <Button color='white' startIcon={<GroupIcon />} size={location.pathname.includes("/users") ? "large" : "medium"} variant={location.pathname.includes("/users") ? "outlined" : "text"} 
                sx={{fontWeight: location.pathname.includes("/users")  ? "bold" : "normal"}} onClick={()=> {navigate("/users")}} className={styles.button}>
                  <Typography variant="" color="">Gestión de usuarios</Typography>
                </Button>
              )}
              {(userRol == Roles [0] || userRol == Roles [1]) && (
                <Button color='white' startIcon={<InventoryIcon />} size={location.pathname.includes("/inventories") ? "large" : "medium"} variant={location.pathname.includes("/inventories") ? "outlined" : "text"} 
                sx={{fontWeight: location.pathname.includes("/inventories") ? "bold" : "normal"}} onClick={()=> {navigate("/inventories")}} className={styles.button}>
                  <Typography variant="" color="">Inventario</Typography>
                </Button>
              )}
              {(userRol == Roles [0] || userRol == Roles [2] || userRol == Roles [3]) && (
                <Button color='white' startIcon={<FestivalIcon />} size={["/solidarityEvents", "/donations", "/externalSolidarityEvents"].some(path => location.pathname.startsWith(path)) ? "large" : "medium"} variant={["/solidarityEvents", "/donations", "/externalSolidarityEvents"].some(path => location.pathname.startsWith(path)) ? "outlined" : "text"} 
                sx={{fontWeight: ["/solidarityEvents", "/externalSolidarityEvents"].some(path => location.pathname.startsWith(path)) ? "bold" : "normal"}} onClick={()=> {navigate("/solidarityEvents")}} className={styles.button}>
                  <Typography variant="" color='white'>Eventos solidarios</Typography>
                </Button>
              )}
              {(userRol == Roles [0]) && (
                <Button color='white' startIcon={<Diversity2Icon />} size={["/ongs"].some(path => location.pathname.startsWith(path)) ? "large" : "medium"} variant={["/ongs"].some(path => location.pathname.startsWith(path)) ? "outlined" : "text"} 
                sx={{fontWeight: ["/ongs"].some(path => location.pathname.startsWith(path)) ? "bold" : "normal"}} onClick={()=> {navigate("/ongs")}} className={styles.button}>
                  <Typography variant="" color='white'>ONGs</Typography>
                </Button>
              )}
              {(userRol == Roles [0]) && (
                <Button color='white' startIcon={<AssignmentIndIcon />} size={["/presidents"].some(path => location.pathname.startsWith(path)) ? "large" : "medium"} variant={["/presidents"].some(path => location.pathname.startsWith(path)) ? "outlined" : "text"} 
                sx={{fontWeight: ["/presidents"].some(path => location.pathname.startsWith(path)) ? "bold" : "normal"}} onClick={()=> {navigate("/presidents")}} className={styles.button}>
                  <Typography variant="" color='white'>Presidentes</Typography>
                </Button>
              )}
            </div>
            <div>
              <Tooltip 
                title="Logout" 
                arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: 'offset',
                        options: {
                          offset: [0, -10],
                        },
                      },
                    ],
                  },
                }}>
                <IconButton aria-label="" onClick={()=>{navigate("/login")}}>  
                  <Logout 
                    sx={{
                      fontSize:"40px",
                      cursor:"pointer",
                      color:"white"
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </>
          )}
          {(location.pathname.includes("/donations") || (location.pathname.includes("/offersDonations")) || location.pathname.includes("transfers")) && (
            <>
              <div className={styles.buttonsContainer}>
                 {(userRol == Roles [0] || userRol == Roles [1]) && (
                  <Button color='white' startIcon={<KeyboardBackspaceIcon />} variant="text" 
                  sx={{fontWeight: "normal"}} onClick={()=> {navigate("/inventories")}} className={styles.button}>
                    <Typography variant="" color="">Volver al inventario</Typography>
                  </Button>
                )}
                {(userRol == Roles [0] || userRol == Roles [1]) && (
                  <Button color='white' startIcon={<VolunteerActivismIcon />} size={["/donations", "/donationsExt"].some(path => location.pathname.startsWith(path)) ? "large" : "medium"} variant={["/donations", "/donationsExt"].some(path => location.pathname.startsWith(path)) ? "outlined" : "text"} 
                  sx={{fontWeight: ["/donations", "/donationsExt"].some(path => location.pathname.startsWith(path))  ? "bold" : "normal"}} onClick={()=> {navigate("/donations")}} className={styles.button}>
                    <Typography variant="" color="">Solicitudes</Typography>
                  </Button>
                )}
                {(userRol == Roles [0] || userRol == Roles [1]) && (
                  <Button color='white' startIcon={<VolunteerActivismIcon />} size={["/offersDonations", "/offersDonationsExt"].some(path => location.pathname.startsWith(path)) ? "large" : "medium"} variant={["/offersDonations", "/offersDonationsExt"].some(path => location.pathname.startsWith(path)) ? "outlined" : "text"} 
                  sx={{fontWeight: ["/offersDonations", "/offersDonationsExt"].some(path => location.pathname.startsWith(path))  ? "bold" : "normal"}} onClick={()=> {navigate("/offersDonations")}} className={styles.button}>
                    <Typography variant="" color="">Ofrecimientos</Typography>
                  </Button>
                )}
                {(userRol == Roles [0] || userRol == Roles [1]) && (
                  <Button color='white' startIcon={<ImportExportIcon />} size={["/transfersOutcoming", "/transfersIncoming"].some(path => location.pathname.startsWith(path)) ? "large" : "medium"} variant={["/transfersOutcoming", "/transfersIncoming"].some(path => location.pathname.startsWith(path)) ? "outlined" : "text"} 
                  sx={{fontWeight: ["/transfersOutcoming", "/transfersIncoming"].some(path => location.pathname.startsWith(path))  ? "bold" : "normal"}} onClick={()=> {navigate("/transfersOutcoming")}} className={styles.button}>
                    <Typography variant="" color="">Transferencias</Typography>
                  </Button>
                )}
              </div>
              <div>
                <Tooltip 
                  title="Logout" 
                  arrow
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, -10],
                          },
                        },
                      ],
                    },
                  }}>
                  <IconButton aria-label="" onClick={()=>{navigate("/login")}}>  
                    <Logout 
                      sx={{
                        fontSize:"40px",
                        cursor:"pointer",
                        color:"white"
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
    </AppBar>
  )
}
