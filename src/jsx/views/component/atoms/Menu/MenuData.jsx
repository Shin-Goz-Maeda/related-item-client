import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

const MenuData = [
  {
    title: "検索",
    icon: <SearchIcon />,
    link: "search",
  },
  {
    title: "パスワードリセット",
    icon: <RestartAltIcon/>,
    link: "pwreset",
  },
  {
    title: "退会",
    icon: <DirectionsWalkIcon/>,
    link: "withdrawalconfirmation",
  },
];

export default MenuData;