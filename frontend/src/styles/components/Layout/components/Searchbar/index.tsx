import { Container } from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
const Searchbar = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location]
  );
  const { register, watch } = useForm<{ search: string; showDone: boolean }>({
    defaultValues: {
      search: queryParams.get("q") || "",
      showDone: (queryParams.get("showDone") || "") === "true",
    },
  });
  const watcher = watch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      queryParams.set("q", watcher.search.trim());
      queryParams.set("showDone", watcher.showDone.toString());
      history.replace({
        search: queryParams.toString(),
      });
    }, 1000); // atualiza parametros de busca 1 segundo após terminar de digitar
    return () => {
      clearTimeout(timeout);
    };
  }, [history, location, queryParams, watcher]);
  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        defaultValue=""
        {...register("search")}
        placeholder="Filter list"
      />
      <label>
        Show done
        <input type="checkbox" {...register("showDone")} />
      </label>
    </Container>
  );
};

export default Searchbar;
