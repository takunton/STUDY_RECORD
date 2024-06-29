import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import { getLoginInfo } from "../_hooks/useLoginInfo";
import { useState } from "react";
import { logout } from "../util/supabaseFunctions";

export const Layout = () => {
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);
  const [isMaintenanceMenuOpen, setMaintenanceMenuOpen] = useState(false);

  const navigate = useNavigate();

  // 学習記録アプリ選択
  function onClickHome() {
    navigate("/home");
  }

  // 学習内容メンテナンス選択
  function onClickLearningContent() {
    navigate("/home/learning-content");
  }

  // ログアウト選択
  const handleLogout = () => {
    alert("ログアウトします");
    logout();
    navigate("/login");
  };

  return (
    <>
      <Flex
        padding={{ base: 3 }}
        mb={30}
        height={70}
        bg="black"
        color="white"
        align="center"
        _hover={{ cursor: "pointer" }}
      >
        <Heading onClick={onClickHome}>学習記録</Heading>
        <Box pl={4}>
          <Menu
            isOpen={isMaintenanceMenuOpen}
            onClose={() => setMaintenanceMenuOpen(false)}
          >
            <MenuButton
              color="white"
              as={Button}
              variant="link"
              onMouseEnter={() => setMaintenanceMenuOpen(true)}
              onMouseLeave={() => setMaintenanceMenuOpen(false)}
              onClick={() => setMaintenanceMenuOpen(!isMaintenanceMenuOpen)}
            >
              メンテナンス
            </MenuButton>
            <MenuList
              bg="black"
              color="white"
              onMouseEnter={() => setMaintenanceMenuOpen(true)}
              onMouseLeave={() => setMaintenanceMenuOpen(false)}
            >
              <MenuItem bg="black" onClick={onClickLearningContent}>
                学習内容
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>{" "}
        <Box ml="auto">
          <Menu
            isOpen={isLoginMenuOpen}
            onClose={() => setLoginMenuOpen(false)}
          >
            <MenuButton
              color="white"
              as={Button}
              variant="link"
              onMouseEnter={() => setLoginMenuOpen(true)}
              onMouseLeave={() => setLoginMenuOpen(false)}
              onClick={() => setLoginMenuOpen(!isLoginMenuOpen)}
            >
              {getLoginInfo().email}
            </MenuButton>
            <MenuList
              bg="black"
              color="white"
              onMouseEnter={() => setLoginMenuOpen(true)}
              onMouseLeave={() => setLoginMenuOpen(false)}
            >
              <MenuItem bg="black" onClick={handleLogout}>
                ログアウト
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>{" "}
      </Flex>
      <Outlet />
    </>
  );
};
