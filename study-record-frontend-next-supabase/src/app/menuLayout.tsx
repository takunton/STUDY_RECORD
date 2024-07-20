"use client";

import { ReactNode, useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { getLoginInfo } from "../_hooks/useLoginInfo";
import { logout } from "../util/supabaseFunctions";

interface MenuLayoutProps {
  children: ReactNode;
}

const MenuLayout = ({ children }: MenuLayoutProps) => {
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);
  const [isMaintenanceMenuOpen, setMaintenanceMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loginInfo = getLoginInfo();
    setIsLoggedIn(!!loginInfo?.email);
  }, []);

  // 学習記録アプリ選択
  function onClickHome() {
    router.push("/learning-record");
  }

  // 学習内容メンテナンス選択
  function onClickLearningContent() {
    router.push("/learning-content");
  }

  // ログアウト選択
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {isLoggedIn && (
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
          </Box>
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
          </Box>
        </Flex>
      )}
      {children}
    </>
  );
};

export default MenuLayout;
