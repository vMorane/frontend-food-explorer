import { Container } from "./styles";

export function Button({title,loading = false, icon, ...rest }){
  return (
    <Container 
      type="button"
      disabled={loading === true ? true : false}
      loading={loading === true ? true : false}
      {...rest}
      >
        { icon ? icon : null }
        <p>{loading ? "Carregando" : title}</p>
    </Container>
  );
}