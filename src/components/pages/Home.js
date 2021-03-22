import React from "react";
import Title from "../Typography/Title";
import Preview from "~/features/journals/components/Preview";
import Grid from "~/components/Layout/Grid";
import GlobalAction from "~/components/UI/GlobalAction";

import { useQuery } from "urql";
import { GetEntryList } from "~/features/journals/queries.graphql";

const Home = () => {
  const [{ fetching, data }] = useQuery({
    query: GetEntryList,
  });

  return (
    <>
      <Title>I&apos;m home</Title>
      <Grid>
        {!fetching &&
          ((data || {}).entries || []).map((entry) => (
            <Preview key={entry.id} id={entry.id} />
          ))}
      </Grid>
      <GlobalAction icon="add" />
    </>
  );
};

export default Home;
