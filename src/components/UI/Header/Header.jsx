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

export default function Header() {
  const location = useLocation ();
  const ocultarMenu = location.pathname == "/login";
  const navigate = useNavigate();

  return (
    <AppBar elevation={8} sx={{display:"flex", flexDirection: "row", justifyContent: "space-between", 
    alignItems: "center", backgroundColor: "rgb(5, 53, 101)", color: "white", padding: "0px 20px 0px 20px"}}>
          <div className={styles.imgContainer} onClick={()=>{navigate("/users")}}>
            <img src="/IconoPagina.png" alt="" />
          </div>
          {!ocultarMenu && (
          <>
            <div className={styles.buttonsContainer}>
              <Button color='white' startIcon={<GroupIcon />} size={location.pathname.includes("/users") ? "large" : "medium"} variant={location.pathname.includes("/users") ? "outlined" : "text"} 
              sx={{fontWeight: location.pathname.includes("/users")  ? "bold" : "normal"}} onClick={()=> {navigate("/users")}}>
                <Typography variant="" color="">Gestión de usuarios</Typography>
              </Button>
              <Button color='white' startIcon={<GroupIcon />} size={location.pathname.includes("/inventories") ? "large" : "medium"} variant={location.pathname.includes("/inventories") ? "outlined" : "text"} 
              sx={{fontWeight: location.pathname.includes("/inventories") ? "bold" : "normal"}} onClick={()=> {navigate("/inventories")}}>
                <Typography variant="" color="">Inventario</Typography>
              </Button>
              <Button color='white' startIcon={<FestivalIcon />} size={["/solidarityEvents", "/donations"].some(path => location.pathname.startsWith(path)) ? "large" : "medium"} variant={["/solidarityEvents", "/donations"].some(path => location.pathname.startsWith(path)) ? "outlined" : "text"} 
              sx={{fontWeight: ["/solidarityEvents", "/donations"].some(path => location.pathname.startsWith(path)) ? "bold" : "normal"}} onClick={()=> {navigate("/solidarityEvents")}}>
                <Typography variant="" color='white'>Eventos solidarios</Typography>
              </Button>
            </div>
            <div className={styles.buttonsContainer}>
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
