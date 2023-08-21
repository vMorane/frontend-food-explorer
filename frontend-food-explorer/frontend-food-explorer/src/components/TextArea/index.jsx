import { Container } from "./syles";

export function TextArea({ value, ...rest}) {
  return(
    <Container {...rest}>
    { value }
    </Container>
  )
}