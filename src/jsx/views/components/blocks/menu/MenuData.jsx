import PersonIcon from '@mui/icons-material/Person';
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";


const MenuData = [
  {
    title: "アカウント設定",
    icon: <PersonIcon />,
    link: "/accountsetup"
  },
  {
    title: "パスワードリセット",
    icon: <RestartAltIcon />,
    link: "/pwreset"
  },
  {
    title: "退会",
    icon: <DirectionsWalkIcon />,
    link: "/withdrawalconfirmation"
  }
];


export default MenuData;