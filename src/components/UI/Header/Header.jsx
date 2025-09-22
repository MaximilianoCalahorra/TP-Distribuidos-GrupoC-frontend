import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Logout from "@mui/icons-material/Logout";
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import GroupIcon from '@mui/icons-material/Group';
import FestivalIcon from '@mui/icons-material/Festival';
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
          <div className={styles.imgContainer} onClick={!ocultarMenu ? ()=>{handleNavigate(userRol, navigate)} : ()=>{}}>
            <img src="/IconoPagina.png" alt="" />
            {!ocultarMenu && (
              <h3>{userAutenticated} - {userRol}</h3>
            )}
          </div>
          {!ocultarMenu && (
          <>
            <div className={styles.buttonsContainer}>
              {userRol == Roles [0] && (
                <Button color='white' startIcon={<GroupIcon />} size={location.pathname.includes("/users") ? "large" : "medium"} variant={location.pathname.includes("/users") ? "outlined" : "text"} 
                sx={{fontWeight: location.pathname.includes("/users")  ? "bold" : "normal"}} onClick={()=> {navigate("/users")}} className={styles.button}>
                  <Typography variant="" color="">Gestión de usuarios</Typography>
                </Button>
              )}
              {(userRol == Roles [0] || userRol == Roles [1]) && (
                <Button color='white' startIcon={<GroupIcon />} size={location.pathname.includes("/inventories") ? "large" : "medium"} variant={location.pathname.includes("/inventories") ? "outlined" : "text"} 
                sx={{fontWeight: location.pathname.includes("/inventories") ? "bold" : "normal"}} onClick={()=> {navigate("/inventories")}} className={styles.button}>
                  <Typography variant="" color="">Inventario</Typography>
                </Button>
              )}
              {(userRol == Roles [0] || userRol == Roles [2] || userRol == Roles [3]) && (
                <Button color='white' startIcon={<FestivalIcon />} size={["/solidarityEvents", "/donations"].some(path => location.pathname.startsWith(path)) ? "large" : "medium"} variant={["/solidarityEvents", "/donations"].some(path => location.pathname.startsWith(path)) ? "outlined" : "text"} 
                sx={{fontWeight: ["/solidarityEvents", "/donations"].some(path => location.pathname.startsWith(path)) ? "bold" : "normal"}} onClick={()=> {navigate("/solidarityEvents")}} className={styles.button}>
                  <Typography variant="" color='white'>Eventos solidarios</Typography>
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
