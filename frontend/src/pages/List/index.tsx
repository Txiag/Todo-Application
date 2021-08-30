import api from "../../services/api";
import Layout from "../../styles/components/Layout";
import TodoCard from "./components/TodoCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { Todo } from "./types";
import { Container, Column } from "./styles";
import ReactInfiniteScroll from "react-infinite-scroll-component";
import useDivDimensions from "../../hooks/useDivDimensions";
import CreateCard from "./components/CreateCard";
import { useLocation } from "react-router-dom";

const List = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(
    undefined
  );
  const [refresh, setRefresh] = useState<boolean>(false);
  const query = new URLSearchParams(useLocation().search);
  const search = query.get("q") || "";
  const showDone = query.get("showDone") || null;
  const [todos, setTodos] = useState<Todo[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const { width } = useDivDimensions(divRef);
  const loadContent = useCallback(async () => {
    const nextPage = 1;
    const {
      data: { items, itemsPerPage, itemCount },
    } = await api.get("todos", {
      params: { page: nextPage, itemsPerPage: 50, q: search, showDone },
    });
    setTodos(items);
    setCurrentPage(nextPage);
    setHasNextPage(itemCount > itemsPerPage * nextPage);
  }, [search, showDone]);
  const getNextPage = useCallback(async () => {
    const nextPage = currentPage + 1;
    const {
      data: { items, itemsPerPage, itemCount },
    } = await api.get("todos", {
      params: { page: nextPage, itemsPerPage: 50, q: search, showDone },
    });
    setTodos([...todos, ...items]);
    setCurrentPage(nextPage);
    setHasNextPage(itemCount > itemsPerPage * nextPage);
  }, [currentPage, search, showDone, todos]);
  useEffect(() => {
    loadContent();
  }, [loadContent, search, showDone, refresh]);

  const onUpdate = useCallback(
    (data: Todo) => {
      if (showDone === "true")
        setTodos(todos.map((t) => (data.id === t.id ? data : t)));
      else setRefresh(!refresh);
    },
    [showDone, todos, refresh]
  );

  const addToList = useCallback(
    (todo: Todo) => {
      const newArray = [...todos, todo];
      setTodos(newArray);
    },
    [todos, setTodos]
  );
  const GetTodos = useCallback(() => {
    const maxColumns = 5;
    const columnCount = Math.min(Math.floor(width / 400), maxColumns);
    const columns: { [k: number]: JSX.Element[] } = {};
    columns[0] = [<CreateCard addToList={addToList} />];
    todos.forEach((t, idx) => {
      const column = idx % columnCount;
      const elm = <TodoCard onUpdate={onUpdate} todo={t} />;
      column in columns ? columns[column].push(elm) : (columns[column] = [elm]);
    });
    return Object.entries(columns);
  }, [width, addToList, todos, onUpdate]);
  return (
    <Layout>
      <ReactInfiniteScroll
        next={getNextPage}
        hasMore={hasNextPage !== false}
        loader={<></>}
        dataLength={todos.length}
        style={{ minHeight: "100vh" }} //To put endMessage and loader to the top.
      >
        <Container ref={divRef}>
          {GetTodos().map(([key, value]) => (
            <Column key={key}>{value}</Column>
          ))}
        </Container>
      </ReactInfiniteScroll>
    </Layout>
  );
};

export default List;
