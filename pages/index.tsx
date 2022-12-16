import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import debounce from "lodash.debounce";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWRInfinite from "swr/infinite";

import { MAIN_API } from "../constants";
import fetcher from "../helpers/fetcher";
import styles from "../styles/index.module.css";
import { ListResponse } from "../types";

const Home = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState("");

  const getKey = (pageIndex: number) => {
    return `${MAIN_API}?page=${pageIndex + 1}&limit=15&q=${input}`;
  };

  const { data, size, setSize, isLoading, isValidating } =
    useSWRInfinite<ListResponse>(getKey, fetcher);
  const hasNextPage = data?.at(-1)?.pagination.has_next_page || false;

  const handleInput = debounce((value: string) => {
    setInput(value);
  }, 600);

  return (
    <main className={styles.main}>
      <Space>
        <Typography.Title>Amartha Anime App</Typography.Title>
        {session ? (
          <>
            <Typography.Text>
              Welcome back, {session?.user?.name}
            </Typography.Text>
            <Button onClick={() => signOut()}>Sign out</Button>
          </>
        ) : (
          <Button onClick={() => signIn()}>Sign in</Button>
        )}
      </Space>
      <Input
        onChange={(e) => {
          handleInput(e.target.value);
        }}
        placeholder="Search for"
      />
      <Divider />
      <div className={styles.itemList}>
        {data?.map((list) =>
          list.data.map((item) => (
            <div className={styles.item} key={item.mal_id}>
              <Link href={session ? `/detail/${item.mal_id}` : "/forbidden"}>
                <Image
                  style={{ borderRadius: 16 }}
                  height={325}
                  width={225}
                  alt="anime-poster"
                  src={item.images.webp.image_url}
                />
              </Link>
              <div className={styles.itemDescription}>
                <Typography.Text strong>
                  {item.title} ({item.year || "-"})
                </Typography.Text>
              </div>
            </div>
          ))
        )}
      </div>
      {(isLoading || isValidating) && (
        <Skeleton style={{ marginBlockEnd: 10 }} data-testid="loading" />
      )}
      {hasNextPage && (
        <Row justify="center">
          <Col>
            <Button
              onClick={() => {
                setSize(size + 1);
              }}
              type="primary"
            >
              Load More
            </Button>
          </Col>
        </Row>
      )}
    </main>
  );
};

export default Home;
