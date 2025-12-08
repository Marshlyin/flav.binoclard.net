import type { FunctionComponent, MouseEventHandler } from "react";
import { Button } from "react95";

interface CloseButtonProps {
  onClick: MouseEventHandler;
}

const CloseButton: FunctionComponent<CloseButtonProps> = (
  props: CloseButtonProps
) => {
  const { onClick } = props;

  return (
    <>
      <Button onClick={onClick}>
        <span className="close-icon" />
      </Button>
    </>
  );
};

export default CloseButton;
