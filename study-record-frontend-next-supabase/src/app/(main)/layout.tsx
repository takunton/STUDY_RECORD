// app/(main)/layout.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "@/util/supabaseFunctions";
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { useLoginInfo } from "@/_hooks/useLoginInfo";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);
  const [isMaintenanceMenuOpen, setMaintenanceMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { loginInfo, deleteLoginInfo } = useLoginInfo();

  useEffect(() => {
    setIsLoggedIn(loginInfo?.id !== "");
    console.log(`ログイン情報：${loginInfo}`);
  }, []);

  useEffect(() => {
    console.log(`ログイン有無${isLoggedIn}`);

    if (isLoggedIn === false) {
      router.replace("/login");
    }
  }, [isLoggedIn, router]);

  // 学習記録アプリ選択
  function onClickHome() {
    router.push("/learning-record");
  }

  // 学習内容メンテナンス選択
  function onClickLearningContent() {
    router.push("/learning-content");
  }

  // ログアウト選択
  const handleLogout = async () => {
    const isError = await logout();
    if (isError) {
      // TODO: ログアウトエラー処理記載
    }
    // セッションストレージからユーザ情報を削除
    deleteLoginInfo();

    router.push("/login");
  };

  // ログイン状態出ない場合、スピナー表示
  if (isLoggedIn !== true) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  }

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
              {loginInfo?.email}
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
      {children}
    </>
  );
}
