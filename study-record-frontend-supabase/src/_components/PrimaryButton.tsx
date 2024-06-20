import { Button } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: FC<Props> = (props) => {
  const { children, disabled = false, loading = false, onClick } = props;

  return (
    <Button
      onClick={onClick}
      bg="teal.400"
      color="white"
      isDisabled={disabled || loading}
      isLoading={loading}
      _hover={{ opacity: 0.6 }}
    >
      {children}
    </Button>
  );
};
