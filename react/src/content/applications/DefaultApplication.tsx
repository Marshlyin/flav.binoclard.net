import { type FunctionComponent } from "react";
import OsWindow from "../../components/window/OsWindow";

interface DefaultApplicationProps {
  visible: boolean;
  title: string;
}

const DefaultApplication: FunctionComponent<DefaultApplicationProps> = (
  props
) => {
  const { visible, title } = props;
  return (
    <>
      <OsWindow title={title} withToolbar={true}>
        <>
          Nulla elit dolor consectetur minim est sunt sint
          <br />
          minim sint tempor dolor amet. <br />
          Anim aute elit mollit anim mollit Lorem duis enim laboris. <br />
          Magna do et aliquip magna.
        </>
      </OsWindow>
    </>
  );
};

export default DefaultApplication;
