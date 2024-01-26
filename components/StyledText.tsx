import { Text as OriginalText, TextProps } from "react-native";

export function Text(props: TextProps) {
  return (
    <OriginalText {...props} style={[props.style, { fontFamily: "Lato" }]} />
  );
}
