import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Panel from "~/components/Layout/Panel";
import Skeleton from "react-loading-skeleton";
import BlockLink from "~/components/UI/BlockLink";

import { useQuery } from "urql";
import { GetEntry } from "~/features/journals/queries.graphql";

const StyledPanel = styled(Panel)`
  /* height: 440px; */
  display: flex;
  flex-direction: column;

  & h2 {
    font-size: 32px;
  }

  & time {
    font-size: 13px;
    display: block;
    margin-bottom: 16px;
    color: var(--color-secondary);
  }

  & p {
    /* stylelint-disable */
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    /* stylelint-enable */
    overflow: hidden;
    margin-bottom: 16px;
    height: 110px;
  }

  & a {
    margin-top: auto;
  }
`;

const Picture = styled.div`
  overflow: hidden;
  border-radius: 4px;
  width: 100%;
  height: 0;
  min-height: 0;
  box-sizing: content-box;
  padding-top: 70%;
  background: var(--color-skeleton);
  margin-bottom: 16px;
  position: relative;

  & > * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* global require */
const examples = require.context("#/img/examples", false, /\.webm|jpg$/);
const opts = [];
for (const file of examples.keys()) {
  opts.push(examples(file).default);
}

// let available = [...opts];
// function getRandomImage() {
//   if (!available.length) {
//     available = [...opts];
//   }
//   const index = Math.floor(Math.random() * available.length);
//   const [media] = available.splice(index, 1);
//   return media;
// }

const Preview = ({ id }) => {
  const [{ fetching, data, ...rest }] = useQuery({
    query: GetEntry,
    variables: { id },
  });
  // title, summary, date,
  const [img] = useState(null);
  const { title, summary, insertedAt: date } = (data || {}).entryById || {};
  const isVideo = /\.webm/.test(img);
  // useEffect(() => setImage(getRandomImage), []);
  console.log(fetching, data.entryById.summary, rest);
  return (
    <StyledPanel>
      <Picture>
        {isVideo ? (
          <video
            src={img}
            loop={true}
            autoPlay={true}
            muted={true}
            controls={false}
          />
        ) : (
          <img src={img} />
        )}
      </Picture>
      <h2>{!fetching ? title : <Skeleton width="50%" />}</h2>
      <time>
        {!fetching ? (
          new Intl.DateTimeFormat("default").format(new Date(date))
        ) : (
          <Skeleton width="30%" />
        )}
      </time>
      <p>{!fetching ? summary : <Skeleton count={5} />}</p>
      <BlockLink to="/settings">
        {!fetching ? "Read More" : <Skeleton width={"15%"} />}
      </BlockLink>
    </StyledPanel>
  );
};

Preview.propTypes = {
  id: PropTypes.number,
};

export default Preview;
