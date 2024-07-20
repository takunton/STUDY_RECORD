"use client";

import { PrimaryButton } from "@/_components/PrimaryButton";
import { Link } from "@chakra-ui/next-js";
import { Button } from "@chakra-ui/react";

export default function Page() {
  function onClickTest() {
    alert("ボタンが押されました");
  }
  return (
    <>
      <PrimaryButton onClick={onClickTest}>テスト</PrimaryButton>
    </>
  );
}
