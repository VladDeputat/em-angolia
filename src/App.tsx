import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import styled from 'styled-components';

const searchClient = algoliasearch(
  '00U4UXKBSS',
  '8738eab15d4efaa8445e1acebada41d2'
);

const CustomSearchBox = styled(SearchBox)`
  height: 300px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    21deg,
    rgba(43, 98, 236, 1) 0%,
    rgba(213, 79, 100, 1) 100%
  );

  input {
    height: 70px;
    width: 900px;
    border-radius: 15px;
    font-size: 30px;
    outline: none;
  }

  button {
    &:nth-child(2) {
      display: block;
      margin-right: 3px;
      width: 140px;
      height: 53px;
      background-color: #2968fa;
      border-radius: 15px;
      color: #ffffff;
      font-size: 30px;
      font-weight: 500;
      svg {
        display: none;
      }
      &:after {
        content: 'Search';
      }
    }
    &:nth-child(3) {
      display: none;
    }
    margin-left: auto;
  }
`;

const HitsWrapper = styled.div`
  display: flex;
  padding: 30px;

  article {
    div {
      display: flex;

      span {
        display: block;
        padding: 0px 5px;
        font-weight: 700;
      }
    }

    span:nth-child(2) {
      display: block;
      padding-top: 10px;
    }
    span:nth-child(3) {
      display: block;
      padding-top: 10px;
      text-align: center;
      font-size: 30px;
    }
  }
`;

const CustomPagination = styled(Pagination)`
  margin-bottom: 100px;
`;

const App: React.FC = () => (
  <InstantSearch searchClient={searchClient} indexName="TestIndex">
    <CustomSearchBox
      searchAsYouType={false}
      translations={{
        placeholder: 'Search for something...',
      }}
    />
    <HitsWrapper>
      <Hits hitComponent={Hit} />
    </HitsWrapper>

    <CustomPagination />
  </InstantSearch>
);

interface HitProps {
  image: string;
  name: string;
  price: string;
}

function Hit(props: { hit: HitProps }) {
  return (
    <article>
      <div>
        <img src={props.hit.image} alt={props.hit.name} />
        <Highlight attribute="name" hit={props.hit} />
      </div>
      <Highlight attribute="description" hit={props.hit} />
      <span>${props.hit.price}</span>
    </article>
  );
}

export default App;
