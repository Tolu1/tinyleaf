import { Text as OriginalText, TextProps } from "react-native";
import {
  Text as PaperText,
  TextProps as PaperTextProps,
} from "react-native-paper";

export function Text(props: PaperTextProps<typeof PaperText>) {
  return <PaperText {...props} style={[props.style, { fontFamily: "Lato" }]} />;
}
