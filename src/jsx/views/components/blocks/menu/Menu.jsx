import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuData from '../menu/MenuData';


function Menu() {
  // メニューデータからメニュー情報を受け取る。
  return (
    <SidebarContainer>
      <SidebarLists>
        {MenuData.map((value, key) => {
          return (
            <SidebarList key={key}>
              <Link to={value.link}>
                <ListIcon>{value.icon}</ListIcon>
                <ListTitle>{value.title}</ListTitle>
              </Link>
            </SidebarList>
          );
        })}
      </SidebarLists>
    </SidebarContainer>
  );
};


const SidebarContainer = styled.div`
  height: 100%;
  width: 20%;
  min-width: 300px;
  background-color: #3b627a;
`;

const SidebarLists = styled.ul`
  height: auto;
  width: 100%
  list-style: none;
`;

const SidebarList = styled.li`
  width: 100%;
  &:hover {
    cursor: pointer;
    background-color: lightgreen;
  }
`;

const ListIcon = styled.div`
  height: 60px;
  color: white;
`;

const ListTitle = styled.div`
  height: 60px;
  color: white;
`;


export default Menu;