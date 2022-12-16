import { Breadcrumb, Skeleton, Space, Tag, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { MAIN_API } from "../../constants";
import fetcher from "../../helpers/fetcher";
import styles from "../../styles/detail.module.css";
import { DetailResponse } from "../../types";

export async function getServerSideProps({
  params,
}: {
  params: { id: string };
}) {
  // Fetch data from external API
  console.log(params);
  const res = await fetch(`${MAIN_API}/${params.id}`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

const Detail = ({ data: serverData }: { data: DetailResponse }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!session) {
      router.push("/forbidden");
    }
  }, [router, session]);

  const { data, isLoading, isValidating } = useSWR<DetailResponse>(
    id && !serverData ? `${MAIN_API}/${id}` : null,
    fetcher
  );

  const detailData = serverData?.data || data?.data;

  return (
    <main className={styles.main}>
      {isLoading || isValidating ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <>
          <Space>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link href="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{detailData?.title}</Breadcrumb.Item>
            </Breadcrumb>
            | {session && session?.user?.name}
          </Space>
          <div className={styles.content}>
            <div>
              <Typography.Title>
                {detailData?.title} ({detailData?.year})
              </Typography.Title>
              <Typography.Title level={5}>
                {detailData?.title_japanese}
              </Typography.Title>
              <Image
                width={299}
                height={450}
                src={detailData?.images?.webp.large_image_url || ""}
                alt="anime-poster"
              />
            </div>
            <div>
              <Typography.Title level={2}>Overview</Typography.Title>
              <div className={styles.component}>
                <Typography.Text style={{ fontSize: "1.2em" }}>
                  {detailData?.episodes} episodes | {detailData?.duration}
                </Typography.Text>
              </div>
              <div className={styles.component}>
                <Typography.Title level={5}>Genres</Typography.Title>
                {detailData?.genres.map((genre) => (
                  <Tag color="lime" key={genre.mal_id}>
                    {genre.name}
                  </Tag>
                ))}
              </div>
              <div className={styles.component}>
                <Typography.Title level={5}>Synopsis</Typography.Title>
                <Typography.Text>{detailData?.synopsis}</Typography.Text>
              </div>
              <div className={styles.component}>
                <Typography.Title level={5}>Background</Typography.Title>
                <Typography.Text>
                  {detailData?.background || "-"}
                </Typography.Text>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Detail;
