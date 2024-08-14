type GeneralButtonProps = {
  title: string;
  classes?: string;
  onClick?: () => void;
};

const GeneralButton = (props: GeneralButtonProps) => {
  const { title, classes } = props;
  return (
    <button className={classes ?? ""} onClick={props.onClick}>
      {title}
    </button>
  );
};

export default GeneralButton;
