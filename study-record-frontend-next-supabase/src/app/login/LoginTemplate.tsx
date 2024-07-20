"use client";

import { useState } from "react";
import { Box, Flex, Heading, Input, Spinner, Stack } from "@chakra-ui/react";
import { login } from "../../util/supabaseFunctions";
import { PrimaryButton } from "../../_components/PrimaryButton";
import { useRouter } from "next/navigation";

export default function LoginTemplate() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onClickLogin = async () => {
    setIsLoading(true);
    try {
      const isError = await login(email, password);

      if (!isError) {
        router.push("/learning-record");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="gray.50">
      <Box
        p={8}
        maxWidth="600px"
        width="100%"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Box textAlign="center">
          <Heading>ログイン</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <Stack spacing={4}>
            <Input
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton onClick={onClickLogin} loading={isLoading}>
              ログイン実行
            </PrimaryButton>
            {isLoading && (
              <Flex justify="center" mt={4}>
                <Spinner size="lg" />
              </Flex>
            )}
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
}
