type ExtraPropsType = {
  title?: string;
  style: { color: string; fontSize: string };
};

export const withYellowColor = <P,>(
  Component: React.ComponentType<P & ExtraPropsType>
) => {
  return (props: P) => {
    const style = {
      color: "red",
      fontSize: "1em",
      // Merge props
      // ...props.style,
    };
    return <Component style={style} {...props} />;
  };
};
