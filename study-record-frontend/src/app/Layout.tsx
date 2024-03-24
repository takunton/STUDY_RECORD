import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";

export const Layout = () => {
  const navigate = useNavigate();

  // 学習記録アプリ選択
  function onClickHome() {
    navigate("/home");
  }

  // 学習内容メンテナンス選択
  function onClickLearningContent() {
    navigate("learning-content");
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
        <Heading onClick={onClickHome}>学習記録アプリ</Heading>
        <Box pl={4}>
          <Link onClick={onClickLearningContent}>メンテナンス</Link>
        </Box>
      </Flex>
      <Outlet />
    </>
  );
};
