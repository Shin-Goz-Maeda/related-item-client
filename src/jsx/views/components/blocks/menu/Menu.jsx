import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuData from "../menu/MenuData";
import { sp, tb, pc, lg } from "../../../../common/context/ResponsiveMedia";


function Menu() {
  // メニューデータからメニュー情報を受け取る。
  return (
    <SidebarContainerDiv>
      <MenuInfoDiv>
        <MenuInfoP>
          設定
        </MenuInfoP>
      </MenuInfoDiv>
      <SidebarListUl>
        {MenuData.map((value, key) => {
          return (
            <SidebarListLi key={key}>
              <Link
                to={value.link}
                style={{
                  textDecoration: "none",
                  display: "flex"
                }}
              >
                <ListTitleDiv>{value.title}</ListTitleDiv>
              </Link>
            </SidebarListLi>
          );
        })}
      </SidebarListUl>
    </SidebarContainerDiv>
  );
};


const SidebarContainerDiv = styled.div`
  height: 100%;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  ${lg`
    width: 40%;
    min-width: 350px;
  `}

  ${pc`
    width: 30%;
    min-width: 250px;
  `}

  ${tb`
    width: 30%;
    min-width: 250px;
  `}

  ${sp`
    width: 50%;
    min-width: 200px;
  `}
`;

const SidebarListUl = styled.ul`
  width: 100%;
  list-style: none;
`;

const MenuInfoDiv = styled.div`
  margin-left: 15px;
`;

const MenuInfoP = styled.p`
  color: #696969;
  font-size: 15px;
  line-height: 50px;

  ${lg`
    font-size: 20px;
    line-height: 60px;
  `}
`;

const SidebarListLi = styled.li`
  width: 90%;
  margin-left: 5px;
  border-radius: 15px;
  line-height: 50px;
  &:hover {
    cursor: pointer;
    background-color: #DCDCDC;
    border: solid 4px #87CEFA;
  };
`;

const ListTitleDiv = styled.div`
  padding-left: 10px;
  color: #000;
  font-weight: bold;

  ${sp`
    font-size: 13px;
  `}
`;


export default Menu;