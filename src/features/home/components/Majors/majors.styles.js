import styled from 'styled-components';

export const ContentIntro = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  margin-top: 5rem;
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

export const ContentBox = styled.div`
  /* display: flex; */
  text-align: center;
  width: calc(100% / 3);
  margin-top: 2.5rem;
  .box-img {
    height: 150px;
  }
  .box-title {
    font-size: 1.7rem;
    line-height: 2.3rem;
  }
  .box-title:hover {
    color: var(--first-color);
  }
  & a {
    text-decoration: none;
    color: var(--second-color);
  }
`;
